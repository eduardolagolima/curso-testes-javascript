const keyValueToString = ([key, value]) => {
  if (typeof value === 'object' && !Array.isArray(value)) {
    throw new Error('Please check your params');
  }

  return `${key}=${value}`;
};

const queryString = (obj) => Object.entries(obj).map(keyValueToString).join('&');

const parse = (str) => Object.fromEntries(str.split('&').map((param) => {
  const [key, value] = param.split('=');

  if (value.includes(',')) {
    return [key, value.split(',')];
  }

  return [key, value];
}));

module.exports = { queryString, parse };
