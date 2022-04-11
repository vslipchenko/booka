import {AddEmployeeFailReason} from '~app/typings/employment.enums';

export interface AddEmployeeMutationResult {
  addEmployee: EmployeeCommonData & {
    reason: AddEmployeeFailReason;
  };
}

export interface EmployeeCommonData {
  id: string;
  email: string;
  thumbnail: string;
  first_name: string;
  middle_name: string;
  last_name: string;
}
