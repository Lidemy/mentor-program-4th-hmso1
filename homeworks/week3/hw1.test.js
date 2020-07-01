const star = require('./hw1.js');

const ans = '*\n**\n***\n****\n*****';
test('star', () => {
  expect(star(5)).toBe(ans);
});
