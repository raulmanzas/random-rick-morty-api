const { assert } = require('chai');

const responseMapper = require('../../../../../../src/application/ports/api/mappers/responseMapper');

describe('ResponseMapper', () => {
  const fakeMessage = 'The object is empty';

  it('when mapping an empty object it should return response with empty data', () => {
    const response = responseMapper.mapResponse({}, fakeMessage);

    assert.isEmpty(response.data);
    assert.strictEqual(response.message, fakeMessage);
    assert.isNumber(response.timestamp);
  });

  it('when mapping an array it should return a response with the array in data property', () => {
    const fakeArray = ['a', 'b', 'c'];
    const response = responseMapper.mapResponse(fakeArray, fakeMessage);

    assert.isArray(response.data);
    assert.strictEqual(response.data.length, fakeArray.length);
    response.data.forEach((value, index) => {
      assert.strictEqual(value, fakeArray[index]);
    });
    assert.strictEqual(response.message, fakeMessage);
    assert.isNumber(response.timestamp);
  });

  it('when mapping an object without a message it should return response with empty message', () => {
    const fakeObject = {
      name: 'test'
    };
    const response = responseMapper.mapResponse(fakeObject);

    assert.isObject(response.data);
    assert.strictEqual(response.data.name, 'test');
    assert.isEmpty(response.message);
    assert.isNumber(response.timestamp);
  });
});
