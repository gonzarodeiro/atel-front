import axios from 'axios';

const getResponseByFilters = async (url, props) => {
  const headers = { 'token-security': sessionStorage.getItem('token-security') };
  return await axios({
    method: 'GET',
    url: url,
    params: props,
    headers: headers
  });
};

export default getResponseByFilters;
