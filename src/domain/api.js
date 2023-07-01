import { errorMessages, API_END_POINT, USERNAME } from '../constants';

export const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'x-username': `${USERNAME}`,
      },
    });

    if (res.ok) {
      return await res.json();
    }
    throw new Error(errorMessages.API_FAILURE_MESSAGE);
  } catch (e) {
    throw new Error(`${errorMessages.API_ERROR_MESSAGE} ${e.message}`);
  }
};
