import postResponseApi from './postResponseApi';
import { HttpStatusErrorCode } from '../../enums/httpConstants';

export default async function postApi(url, data) {
  let response = await postResponseApi(url, data).catch(async (error) => {
    if ((error.response.status === HttpStatusErrorCode.BadRequest || error.response.status) === HttpStatusErrorCode.NotFound) return [];
  });

  return response.data;
}
