import {ApolloError} from 'apollo-server-fastify';
import {authenticationGuard} from '../../../utilities/guard';
import {emailValidator} from '../shared/shared.validators';
import {db} from '../../../data';
import {gql} from 'apollo-server-core';
import {mailer} from '../../../mailer';
import {EMAIL_FROM, EMPLOYER_CONFIRMATION_HTML, EMPLOYER_CONFIRMATION_SUBJECT} from '../../../constants/email';
import {imprint} from '../../../utilities/string';
import {environment} from '../../../environments';
import {randomBytes} from 'crypto';
import {
  queryEmployeeDataByEmail,
  queryEmploymentDeleteByConfirmationKey,
  queryEmploymentInsertRecord,
} from '../../../data/queries/employment';
import {AddEmployeeFailReason} from '../../../typings/employment.enums';
import {EmployeeCommonData} from '../../../typings/employment.interfaces';

export const employmentMutationTypeDefinitions = gql`
  type Mutation {
    addEmployee(email: String!): EmployeeData
  }
`;

const addEmployee = async (
  _: unknown,
  {email}: {email: string},
  {accessToken}: {accessToken: string},
): Promise<EmployeeCommonData | {reason: AddEmployeeFailReason} | null | ApolloError> => {
  const {error: authenticationError, tokenData} = authenticationGuard(accessToken);

  if (authenticationError) return authenticationError;

  const {error} = emailValidator.validate(email);

  if (error) return null;

  const employee = await db.query<EmployeeCommonData>(queryEmployeeDataByEmail(email));

  if (!employee.rowCount) return {reason: AddEmployeeFailReason.UserNotExist}; // User does not exist

  const confirmationKey = randomBytes(18).toString('hex'); // Produces 36 char length string

  const result = await db.query(
    queryEmploymentInsertRecord({
      businessId: tokenData.userId,
      entrepreneurId: employee.rows[0].id,
      confirmationKey,
    }),
  );

  if (!result.rowCount) return {reason: AddEmployeeFailReason.AlreadyAdded}; // Duplicate entry

  try {
    await mailer.sendMail({
      from: EMAIL_FROM,
      to: email,
      subject: EMPLOYER_CONFIRMATION_SUBJECT[tokenData.language],
      html: imprint(EMPLOYER_CONFIRMATION_HTML[tokenData.language], {
        confirmationKey,
        appOrigin: environment.APP_ORIGIN,
      }),
    });

    return employee.rows[0];
  } catch {
    await db.query(queryEmploymentDeleteByConfirmationKey(confirmationKey));

    return {reason: AddEmployeeFailReason.MailingFailure}; // Failed to mail
  }
};

export const employmentMutationResolvers = {
  Mutation: {
    addEmployee,
  },
};
