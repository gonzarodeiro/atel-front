import patchResponseApi from './patchResponseApi';
import catchErrors from '../catchErrors';

export default async function patchApi(url, id, data) {
  let response = await patchResponseApi(url, id, data).catch(async (error) => {
    if (catchErrors(error)) return [];
  });

  return response.data.results;
}
