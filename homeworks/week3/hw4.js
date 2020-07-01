/* eslint-disable no-plusplus, prefer-const */
const readline = require('readline');

let lines = [];
let rl = readline.createInterface({
  input: process.stdin,
});

rl.on('line', (line) => {
  lines.push(line);
});

function isPalindrome(n) {
  let result = '';

  for (let i = n.length - 1; i >= 0; i--) {
    result += n[i];
  }

  return result === n;
}

function solve(input) {
  const str = input[0];

  if (isPalindrome(str)) {
    console.log('True');
  } else {
    console.log('False');
  }
}

rl.on('close', () => {
  solve(lines);
});
