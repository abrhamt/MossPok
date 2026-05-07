const { test, describe } = require('node:test');
const assert = require('node:assert');
const generateUUID = require('./generateUUID');

describe('generateUUID', () => {
  test('should return a string', () => {
    const uuid = generateUUID();
    assert.strictEqual(typeof uuid, 'string');
  });

  test('should return a non-empty string', () => {
    const uuid = generateUUID();
    assert.ok(uuid.length > 0);
  });

  test('should generate unique values', () => {
    const uuids = new Set();
    const count = 1000;
    for (let i = 0; i < count; i++) {
      uuids.add(generateUUID());
    }
    assert.strictEqual(uuids.size, count);
  });

  test('should contain only alphanumeric characters', () => {
    const uuid = generateUUID();
    assert.match(uuid, /^[a-z0-9]+$/i);
  });
});
