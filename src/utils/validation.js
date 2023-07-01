import { errorMessages } from '../constants/ErrorMessages';

export const validationComponent = (target) => {
  if (!target) {
    throw new Error(errorMessages.NEED_NEW_KEYWORD);
  }
};
