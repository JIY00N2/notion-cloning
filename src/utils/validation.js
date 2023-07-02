import { errorMessages } from '../constants';

export const validateComponent = (target) => {
  if (!target) {
    throw new Error(errorMessages.NEED_NEW_KEYWORD);
  }
};
