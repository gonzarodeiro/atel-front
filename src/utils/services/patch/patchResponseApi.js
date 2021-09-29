import axios from 'axios';

const patchResponseApi = async (url, id, data) => {
  const headers = { 'token-security': sessionStorage.getItem('token-security') };
  return await axios.patch(url + '/' + id, data, { headers: headers });
};

export default patchResponseApi;
