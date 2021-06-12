import getResponseById from './getResponseById';
import catchErrors from '../../catchErrors';

export default async function getById(url, props) {
  let response = await getResponseById(url, props).catch(async (error) => {
    if (catchErrors(error)) return [];
  });

  return [response.data];
}
