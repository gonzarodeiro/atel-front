import axios from 'axios';
let FormData = require('form-data');

const postFileApi = async (url, values) => {
  // FormData agrega enctype=multipart/form-data a la petición
  const formData = new FormData();
  Object.keys(values).forEach((key) => {
    formData.append(key, values[key]);
  });
  const headers = { 'token-security': sessionStorage.getItem('token-security') };
  return axios.post(url, formData, { headers: headers });
};

export default postFileApi;
