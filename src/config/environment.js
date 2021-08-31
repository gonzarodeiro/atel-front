const DEV = 'develop';
const STG = 'staging';
const PRD = 'prduction';

const envs = {
  [DEV]: DEV,
  [STG]: STG,
  [PRD]: PRD
};

const urls = {
  [DEV]: 'http://localhost:3005',
  [STG]: 'https://atel-back-stg.herokuapp.com',
  [PRD]: 'https://atel-back-prd.herokuapp.com'
};

const [ENV, BASE_URL] = (function (opt) {
  const validEnv = envs[opt];
  if (!validEnv) throw Error('invalid environment');
  return [validEnv, urls[validEnv]];
})(
  /**
   * Setear [DEV | STG | PRD]
   * manualmente por ahora
   * */
  DEV
);

export { ENV, BASE_URL };
