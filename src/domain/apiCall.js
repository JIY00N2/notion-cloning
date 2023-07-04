import { request } from './api';
import { push } from './router';

export const getDocument = async (id) => {
  return await request(`/documents/${id}`, {
    method: 'GET',
  });
};

export const createDocument = async (document) => {
  return await request(`/documents`, {
    method: 'POST',
    body: JSON.stringify(document),
  });
};

export const updateDocument = async (id, document) => {
  return await request(`/documents/${id}`, {
    method: 'PUT',
    body: JSON.stringify(document),
  });
};

export const deleteDocument = async (id) => {
  await request(`/documents/${id}`, {
    method: 'DELETE',
  });
  push('/');
};

/*
getDocument: 지정된 ID를 사용하여 특정 문서의 정보를 가져옵니다. 
HTTP GET 요청을 사용하여 /documents/{id} 엔드포인트에 요청을 보내고, 해당 문서의 정보를 반환합니다.

createDocument: 새로운 문서를 생성합니다. 주어진 문서 객체를 사용하여 HTTP POST 요청을 보냅니다. 
요청은 /documents 엔드포인트에 보내지고, 생성된 문서의 정보가 반환됩니다.

updateDocument: 기존 문서를 업데이트합니다. 지정된 ID와 문서 객체를 사용하여 HTTP PUT 요청을 보냅니다. 
요청은 /documents/{id} 엔드포인트에 보내지고, 업데이트된 문서의 정보가 반환됩니다.

deleteDocument: 지정된 ID의 문서를 삭제합니다. 
HTTP DELETE 요청을 사용하여 /documents/{id} 엔드포인트에 요청을 보냅니다. 
요청이 성공하면 / (루트) 경로로 이동합니다.
*/
