import putResponseApi from './putResponseApi';
import catchErrors from '../catchErrors';

export default async function putApi(url, data, id) {
  let response = await putResponseApi(url, data, id).catch(async (error) => {
    if (catchErrors(error)) return [];
  });

  return response.data;
}
