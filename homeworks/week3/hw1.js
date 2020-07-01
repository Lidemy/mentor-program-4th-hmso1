/* eslint-disable no-plusplus */
function repeat(n) {
  let ouput = '';
  for (let i = 0; i < n; i++) {
    ouput += '*';
  }
  return ouput;
}

function star(n) {
  let result = '';
  for (let i = 1; i <= n; i++) {
    result += repeat(i);

    if (i !== n) {
      result += '\n';
    }
  }
  return result;
}
module.exports = star;

console.log(star(5));
