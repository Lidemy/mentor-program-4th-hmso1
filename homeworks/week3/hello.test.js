const hello = require('./hello.js');

test('say hello to iris', () => {
  expect(hello('Iris')).toBe('hello Iris');
});
