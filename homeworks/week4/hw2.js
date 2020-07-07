/* eslint-disable no-plusplus */
const request = require('request');
const process = require('process');

const action = process.argv[2].toLowerCase();

function get20BookList() {
  request(
    'https://lidemy-book-store.herokuapp.com/books?_limit=20',
    (error, response, body) => {
      const json = JSON.parse(body);
      for (let i = 0; i < 20; i++) {
        console.log(`${json[i].id} ${json[i].name}`);
      }
    },
  );
}

function getBookId(n) {
  request(
    `https://lidemy-book-store.herokuapp.com/books/ ${n}`,
    (error, response, body) => {
      const json = JSON.parse(body);
      console.log(json.name);
    },
  );
}

switch (action) {
  case 'list':
    get20BookList();
    break;
  case 'read':
    getBookId(process.argv[3]);
    break;
  case 'delete':
    // deleteBookId(process.argv[3])
    break;
  case 'create':
    // createBook(process.argv[3])
    break;
  case 'update':
    // patchBook(process.argv[3], process.argv[4])
    break;
  default:
    console.log('Wrong input');
}
