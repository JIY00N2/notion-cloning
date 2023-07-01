import { errorMessages } from '../constants';

export const validationComponent = (target) => {
  if (!target) {
    throw new Error(errorMessages.NEED_NEW_KEYWORD);
  }
};
