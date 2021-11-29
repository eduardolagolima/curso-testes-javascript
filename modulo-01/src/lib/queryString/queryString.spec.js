import { queryString, parse } from './queryString';

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

  it('should create a valid query string even when an array is passed as value', () => {
    const obj = {
      name: 'Eduardo',
      abilities: ['React', 'Vue'],
    };

    expect(queryString(obj)).toBe(
      'name=Eduardo&abilities=React,Vue',
    );
  });

  it('should throw an error when an object is passed as value', () => {
    const obj = {
      name: 'Eduardo',
      abilities: {
        first: 'React',
        second: 'Vue',
      },
    };

    expect(() => {
      queryString(obj);
    }).toThrowError();
  });
});

describe('Query string to object', () => {
  it('should convert a query string to object', () => {
    const qs = 'name=Eduardo&profession=Developer';

    expect(parse(qs)).toEqual({
      name: 'Eduardo',
      profession: 'Developer',
    });
  });

  it('should convert a query string of a single key-value pair to object', () => {
    const qs = 'name=Eduardo';

    expect(parse(qs)).toEqual({ name: 'Eduardo' });
  });

  it('should convert a query string to an object taking care of comma separated values', () => {
    const qs = 'name=Eduardo&abilities=React,Vue';

    expect(parse(qs)).toEqual({
      name: 'Eduardo',
      abilities: ['React', 'Vue'],
    });
  });
});
