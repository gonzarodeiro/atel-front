import getResponseByFilters from './getResponseByFilters';
import catchErrors from '../../catchErrors';

export default async function getByFilters(url, props) {
  let response = await getResponseByFilters(url, props).catch(async (error) => {
    if (catchErrors(error)) return [];
  });

  return response.data;
}
