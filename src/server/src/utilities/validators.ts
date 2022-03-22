import {CustomHelpers, ErrorReport} from 'joi';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const urlValidator = (value: any, helper: CustomHelpers): boolean | ErrorReport => {
  try {
    new URL(value);
    return true;
  } catch {
    return helper.error('"website" got invalid value');
  }
};
