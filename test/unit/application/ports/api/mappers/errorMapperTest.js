const { assert } = require('chai');
const errorMapper = require('../../../../../../src/application/ports/api/mappers/errorMapper');

describe('error mapper', () => {
  it('when no error is passed to errorMapper it should return an unknown error', () => {
    const error = errorMapper.mapError();

    assert.isObject(error);
    assert.isDefined(error.timestamp);
    assert.strictEqual(error.message, 'Unknown error happened');
    assert.isEmpty(error.data);
  });

  it('when an error is passed to errorMapper it should return an error with its message', () => {
    const error = errorMapper.mapError(new Error('test'));

    assert.isObject(error);
    assert.isDefined(error.timestamp);
    assert.strictEqual(error.message, 'test');
    assert.isEmpty(error.data);
  });
});
