import postResponseApi from './postResponseApi';
import catchErrors from '../catchErrors';

export default async function postApi(url, data) {
  let response = await postResponseApi(url, data).catch(async (error) => {
    if (catchErrors(error)) return [];
  });

  return response.data;
}
