import { request } from './api';

export const getDocuments = async (id) => {
  const url = id ? `/${id}` : '';
  return await request(url, { method: 'GET' });
};

export const createDocument = async (document) => {
  return await request('', {
    method: 'POST',
    body: JSON.stringify(document),
  });
};

export const updateDocument = async (id, document) => {
  return await request(`/${id}`, {
    method: 'PUT',
    body: JSON.stringify(document),
  });
};

export const deleteDocument = async (id) => {
  return await request(`/${id}`, {
    method: 'DELETE',
  });
};
