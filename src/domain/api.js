import { errorMessages } from '../constants/ErrorMessages';
export const API_END_POINT = 'https://kdt-frontend.programmers.co.kr';
export const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'x-username': 'jiyoon',
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
