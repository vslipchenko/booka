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

export const queryEmployeeDataByEmail = (email: string): QueryConfig => ({
  text: `
    SELECT t2.id, t2.email, t1.thumbnail, t1.first_name, t1.middle_name, t1.last_name
    FROM entrepreneur_accounts t1
    INNER JOIN users t2
        ON t2.id = t1.user_id
    WHERE t2.email = $1
  `,
  values: [email],
});
