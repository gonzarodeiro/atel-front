const LOC = 'local';
const DEV = 'development';
const STG = 'staging';
const PRD = 'prduction';

const envs = {
  [LOC]: LOC,
  [DEV]: DEV,
  [STG]: STG,
  [PRD]: PRD
};

function validateEnv(env) {
  const validEnv = envs[env];
  if (!validEnv) throw Error('invalid environment');
  return [validEnv, process.env.REACT_APP_BASE_URL];
}

// log enviroment variables for debug
if (process.env.REACT_APP_LOG_ENV_VARS) {
  console.log(process.env);
}

const [ENV, BASE_URL] = validateEnv(process.env.REACT_APP_ENV);

export { ENV, BASE_URL };
