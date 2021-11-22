const { queryString } = require('./queryString');

describe('Object to query string', () => {
  it('should create a valid query string when a object is provided', () => {
    const obj = {
      name: 'Eduardo',
      profession: 'Developer',
    };

    expect(queryString(obj)).toBe(
      'name=Eduardo&profession=Developer',
    );
  });
});

// describe('Query string to object', () => {

// });
