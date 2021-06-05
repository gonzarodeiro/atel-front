import axios from 'axios';

const getResponseById = async (url, props) => {
  const headers = { 'token-security': sessionStorage.getItem('token-security') };
  return await axios({
    method: 'GET',
    url: url + '/' + props,
    headers: headers
  });
};

export default getResponseById;
