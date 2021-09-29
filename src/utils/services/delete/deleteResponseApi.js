import axios from 'axios';

const deleteResponseApi = async (url, data) => {
  const headers = { 'token-security': sessionStorage.getItem('token-security') };
  return await axios.delete(url, data, { headers: headers });
};

export default deleteResponseApi;
