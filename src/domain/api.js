export const API_END_POINT = 'https://kdt-frontend.programmers.co.kr';
export const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.ok) {
      return await res.json();
    }
    throw new Error('API 처리 중 뭔가 이상합니다!');
  } catch (e) {
    throw new Error(`무엇인가 이상합니다 ${e.message}`);
  }
};

/*
API 호출시 header에 항상 x-username을 넣어야함
const API_END_POINT = 'https://kdt.roto.codes'
const res = await fetch(`${API_END_POINT}/documents`,{
  headers:{
    'x-username': 'roto',
  }
})
console.log(await res.json())
*/
