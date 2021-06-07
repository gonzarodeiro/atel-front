import axios from 'axios';

const postResponseApi = async (url, data) => {
  const headers = { 'token-security': sessionStorage.getItem('token-security') };
  return await axios.post(url, data, { headers: headers });
};

export default postResponseApi;
