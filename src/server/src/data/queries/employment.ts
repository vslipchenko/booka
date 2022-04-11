import {QueryConfig} from 'pg';

export const queryEmploymentInsertRecord = ({
  businessId,
  entrepreneurId,
  confirmationKey,
}: {
  businessId: string;
  entrepreneurId: string;
  confirmationKey: string;
}): QueryConfig => ({
  text: `
    INSERT INTO employment (business_id, entrepreneur_id, confirmation_key)
    VALUES ($1, $2, $3)
  `,
  values: [businessId, entrepreneurId, confirmationKey],
});

export const queryEmploymentDeleteByConfirmationKey = (confirmationKey: string): QueryConfig => ({
  text: `
    DELETE FROM employment WHERE confirmation_key = $1
  `,
  values: [confirmationKey],
});
