import {CustomHelpers, ErrorReport} from 'joi';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const urlValidator = (value: any, helper: CustomHelpers): any | ErrorReport => {
  try {
    new URL(value);
    return value;
  } catch {
    return helper.error('"website" value is not a valid URL');
  }
};
