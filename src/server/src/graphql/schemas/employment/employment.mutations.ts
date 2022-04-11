import {ApolloError} from 'apollo-server-fastify';
import {authenticationGuard} from '../../../utilities/guard';
import {emailValidator} from '../shared/shared.validators';
import {db} from '../../../data';
import {queryEntrepreneurIdByEmail} from '../../../data/queries/user';
import {gql} from 'apollo-server-core';
import {mailer} from '../../../mailer';
import {EMAIL_FROM, EMPLOYER_CONFIRMATION_HTML, EMPLOYER_CONFIRMATION_SUBJECT} from '../../../constants/email';
import {imprint} from '../../../utilities/string';
import {environment} from '../../../environments';
import {randomBytes} from 'crypto';
import {queryEmploymentDeleteByConfirmationKey, queryEmploymentInsertRecord} from '../../../data/queries/employment';
import {AddEmployeeFailReason} from '../../../typings/employment.enums';

export const employmentMutationTypeDefinitions = gql`
  type Mutation {
    addEmployee(email: String!): Status
  }
`;

const addEmployee = async (
  _: unknown,
  {email}: {email: string},
  {accessToken}: {accessToken: string},
): Promise<{success: boolean} | {reason: AddEmployeeFailReason} | null | ApolloError> => {
  const {error: authenticationError, tokenData} = authenticationGuard(accessToken);

  if (authenticationError) return authenticationError;

  const {error} = emailValidator.validate(email);

  if (error) return null;

  let result = await db.query<{id: string}>(queryEntrepreneurIdByEmail(email));

  if (!result.rowCount) return {reason: AddEmployeeFailReason.UserNotExist}; // User does not exist

  const confirmationKey = randomBytes(18).toString('hex'); // Produces 36 char length string

  result = await db.query(
    queryEmploymentInsertRecord({
      businessId: tokenData.userId,
      entrepreneurId: result.rows[0].id,
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

    return {success: true};
  } catch {
    await db.query(queryEmploymentDeleteByConfirmationKey(confirmationKey));

    return {reason: AddEmployeeFailReason.MailingFailure}; // Failed email
  }
};

export const employmentMutationResolvers = {
  Mutation: {
    addEmployee,
  },
};
