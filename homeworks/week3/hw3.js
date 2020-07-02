/* eslint-disable no-plusplus, prefer-const */
const readline = require('readline');

let lines = [];
let rl = readline.createInterface({
  input: process.stdin,
});

rl.on('line', (line) => {
  lines.push(line);
});

function isPrime(n) {
  if (n === 1) return false;

  for (let i = 2; i < n; i++) {
    if (n % i === 0) {
      return false;
    }
  }
  return true;
}

function solve(input) {
  const num = Number(input[0]);

  for (let i = 1; i <= num; i++) {
    if (isPrime(Number(input[i]))) {
      console.log('Prime');
    } else {
      console.log('Composite');
    }
  }
}

rl.on('close', () => {
  solve(lines);
});
