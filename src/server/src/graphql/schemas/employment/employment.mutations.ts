import {ApolloError} from 'apollo-server-fastify';
import {authenticationGuard} from '../../../utilities/guard';
import {emailValidator} from '../shared/shared.validators';
import {db} from '../../../data';
import {gql} from 'apollo-server-core';
import {mailer} from '../../../mailer';
import {EMAIL_FROM, EMPLOYER_CONFIRMATION_HTML, EMPLOYER_CONFIRMATION_SUBJECT} from '../../../constants/email';
import {imprint} from '../../../utilities/string';
import {environment} from '../../../environments';
import {randomUUID} from 'crypto';
import {
  queryEmployeeDataByEmail,
  queryEmploymentDeleteByConfirmationKey,
  queryEmploymentInsertRecord,
} from '../../../data/queries/employment';
import {AddEmployeeFailReason} from '../../../typings/employment.enums';
import {EmployeeCommonData} from '../../../typings/employment.interfaces';
import {queryBusinessName} from '../../../data/queries/business-account';

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

  const employeeData = await db.query<EmployeeCommonData>(queryEmployeeDataByEmail(email));

  if (!employeeData.rowCount) return {reason: AddEmployeeFailReason.UserNotExist}; // User does not exist

  const confirmationKey = randomUUID(); // Produces 36 char length string

  const insertion = await db.query(
    queryEmploymentInsertRecord({
      businessId: tokenData.userId,
      entrepreneurId: employeeData.rows[0].id,
      confirmationKey,
    }),
  );

  if (!insertion.rowCount) return {reason: AddEmployeeFailReason.AlreadyAdded}; // Duplicate entry

  const businessName = await db.query<{name: string}>(queryBusinessName(tokenData.userId));

  try {
    await mailer.sendMail({
      from: EMAIL_FROM,
      to: email,
      subject: EMPLOYER_CONFIRMATION_SUBJECT[tokenData.language],
      html: imprint(EMPLOYER_CONFIRMATION_HTML[tokenData.language], {
        businessName: businessName.rows[0].name,
        confirmationKey,
        appOrigin: environment.APP_ORIGIN,
      }),
    });

    return employeeData.rows[0];
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
