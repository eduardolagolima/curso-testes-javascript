const queryString = (obj) => (
  Object.entries(obj)
    .map((param) => param.join('='))
    .join('&')
);

module.exports = { queryString };
