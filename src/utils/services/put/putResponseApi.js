import axios from 'axios';

const putResponseApi = async (url, data, id) => {
  const headers = { 'token-security': sessionStorage.getItem('token-security') };
  return await axios.put(url + '/' + id, data, { headers: headers });
};

export default putResponseApi;
