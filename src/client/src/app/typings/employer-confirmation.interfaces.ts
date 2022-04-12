import {AddEmployerConfirmationFailReason} from '~app/typings/employer-confirmation.enums';
import {StatusResponse} from '~app/typings/response.interfaces';

export interface AddEmployerConfirmationMutationResult {
  addEmployerConfirmation: StatusResponse<AddEmployerConfirmationFailReason>;
}

// Unused
// export interface EmployeeCommonData {
//   id: string;
//   email: string;
//   thumbnail: string;
//   first_name: string;
//   middle_name: string;
//   last_name: string;
// }
