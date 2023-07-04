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

/*
주어진 코드는 request라는 함수를 정의한 것으로, API 요청을 수행하는 역할을 합니다. 함수는 주어진 url과 options 매개변수를 사용하여 fetch 함수를 호출하고, 해당 URL에 대한 API 요청을 수행합니다.

함수 내부에서는 fetch 함수의 호출 결과를 받은 res 객체를 검사합니다. 
만약 res.ok 값이 true인 경우 (즉, HTTP 응답 상태 코드가 200-299 범위에 속하는 경우), 응답을 JSON 형태로 변환한 후 반환합니다. 
이는 API 요청이 성공한 경우에 해당하는 처리입니다.

그러나 res.ok 값이 false인 경우 (즉, HTTP 응답 상태 코드가 오류를 나타내는 범위에 속하는 경우), 에러를 발생시킵니다. 
이는 API 요청이 실패한 경우에 해당하는 처리입니다.

에러 처리 부분에서는 try-catch 구문을 사용하여 fetch 함수 호출 및 응답 처리 과정에서 발생하는 에러를 잡을 수 있습니다. 
catch 블록에서는 throw new Error를 사용하여 에러 객체를 생성하고, 에러 메시지에는 errorMessages.API_ERROR_MESSAGE 상수와 실제 발생한 에러 메시지를 함께 포함시킵니다.

이를 통해 API 요청을 수행하고, 성공한 경우 응답을 반환하고 실패한 경우에는 에러를 던지는 request 함수가 작성되었습니다.
 */
