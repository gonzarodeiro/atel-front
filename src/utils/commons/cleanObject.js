export default function cleanObject(obj) {
  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    if (value && typeof value === 'object' && Object.keys(value).length) cleanObject(value);
    else if (value === null || value === undefined || ((typeof value === 'string' || typeof value === 'object') && !Object.keys(value).length) || value === '') delete obj[key];
  });
}
