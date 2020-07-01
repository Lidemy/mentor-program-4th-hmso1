/* eslint-disable no-plusplus, prefer-const, no-undef */
const readline = require('readline');

let lines = [];
let rl = readline.createInterface({
  input: process.stdin,
});

rl.on('line', (line) => {
  lines.push(line);
});

function solve(input) {
  const num = Number(input[0]);
  for (let i = 1; i <= num; i++) {
    let [a, b, m] = input[i].split(' ');
    a = BigInt(a);
    b = BigInt(b);
    m = Number(m);
    if (a === b) {
      console.log('DRAW');
    } else if (m === 1) {
      if (a > b) {
        console.log('A');
      } else {
        console.log('B');
      }
    } else if (m === -1) {
      if (a > b) {
        console.log('B');
      } else {
        console.log('A');
      }
    }
  }
}

rl.on('close', () => {
  solve(lines);
});
