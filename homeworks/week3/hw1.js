/* eslint-disable no-plusplus, prefer-const */

const readline = require('readline');

let lines = [];
let rl = readline.createInterface({
  input: process.stdin,
});

rl.on('line', (line) => {
  lines.push(line);
});

function repeat(n) {
  let ouput = '';
  for (let i = 0; i < n; i++) {
    ouput += '*';
  }
  return ouput;
}

function solve(input) {
  let result = '';
  for (let i = 1; i <= input[0]; i++) {
    result += repeat(i);

    if (i !== Number(input[0])) {
      result += '\n';
    }
  }
  console.log(result);
}

rl.on('close', () => {
  solve(lines);
});
