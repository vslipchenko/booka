import {StatusResponse} from '~app/typings/response.interfaces';
import {AddEmployeeFailReason} from '~app/typings/employment.enums';

export interface AddEmployeeMutationResult {
  addEmployee: StatusResponse<AddEmployeeFailReason>;
}
