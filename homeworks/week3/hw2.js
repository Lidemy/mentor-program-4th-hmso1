/* eslint-disable no-plusplus, prefer-const */
const readline = require('readline');

let lines = [];
let rl = readline.createInterface({
  input: process.stdin,
});

rl.on('line', (line) => {
  lines.push(line);
});

function digit(n) {
  let nCopy = n;
  let result = 0;
  while (nCopy > 0) {
    result++;
    nCopy = Math.floor(nCopy / 10);
  }
  return result;
}

function isNar(n) {
  const nLen = digit(n);
  let nCopy = n;
  let result = 0;

  for (let i = 0; i < nLen; i++) {
    result += (nCopy % 10) ** nLen;
    nCopy = Math.floor(nCopy / 10);
  }

  return result === n;
}

function solve(input) {
  const temp = input[0].split(' ');

  for (let i = Number(temp[0]); i <= Number(temp[1]); i++) {
    if (isNar(i)) {
      console.log(i);
    }
  }
}

rl.on('close', () => {
  solve(lines);
});
