const keyValueToString = ([key, value]) => {
  if (typeof value === 'object' && !Array.isArray(value)) {
    throw new Error('Please check your params');
  }

  return `${key}=${value}`;
};

const queryString = (obj) => Object.entries(obj).map(keyValueToString).join('&');

module.exports = { queryString };
