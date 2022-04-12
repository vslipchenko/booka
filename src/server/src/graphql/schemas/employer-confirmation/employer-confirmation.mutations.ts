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
import {queryEmployerConfirmationAddRecord} from '../../../data/queries/employer-confirmation';
import {AddEmployerConfirmationFailReason} from '../../../typings/employer-confirmation.enums';
import {queryBusinessName} from '../../../data/queries/business-account';
import {queryEntrepreneurEmployerByEmail} from '../../../data/queries/user';

export const employerConfirmationMutationTypeDefinitions = gql`
  type Mutation {
    addEmployerConfirmation(email: String!): Status
  }
`;

const addEmployerConfirmation = async (
  _: unknown,
  {email}: {email: string},
  {accessToken}: {accessToken: string},
): Promise<{success: boolean} | {reason: AddEmployerConfirmationFailReason} | null | ApolloError> => {
  const {error: authenticationError, tokenData} = authenticationGuard(accessToken);

  if (authenticationError) return authenticationError;

  const {error} = emailValidator.validate(email);

  if (error) return null;

  const entrepreneur = await db.query<{user_id: string; employer_id: string}>(queryEntrepreneurEmployerByEmail(email));

  if (!entrepreneur.rowCount) return {reason: AddEmployerConfirmationFailReason.UserNotExist}; // User does not exist

  if (entrepreneur.rows[0].employer_id === tokenData.userId)
    return {reason: AddEmployerConfirmationFailReason.AlreadyAdded};

  const confirmationKey = randomUUID(); // Produces 36 char length string

  await db.query(
    queryEmployerConfirmationAddRecord({
      businessId: tokenData.userId,
      entrepreneurId: entrepreneur.rows[0].user_id,
      confirmationKey,
    }),
  );

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

    return {success: true};
  } catch {
    // No need to delete employer confirmation record, as it's going to be swept due to confirmation overdue

    return {reason: AddEmployerConfirmationFailReason.MailingFailure}; // Failed to mail
  }
};

export const employerConfirmationMutationResolvers = {
  Mutation: {
    addEmployerConfirmation,
  },
};
