import patchResponseApi from './patchResponseApi';
import catchErrors from '../catchErrors';

export default async function patchApi(url, data, id) {
  let response = await patchResponseApi(url, data, id).catch(async (error) => {
    if (catchErrors(error)) return [];
  });

  return response.data.results;
}
