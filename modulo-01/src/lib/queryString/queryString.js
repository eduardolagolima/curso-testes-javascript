const queryString = (obj) => {
  const entries = Object.entries(obj);
  const params = entries.map((param) => param.join('='));
  return params.join('&');
};

module.exports = { queryString };
