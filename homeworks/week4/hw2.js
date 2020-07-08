/* eslint-disable no-plusplus, quotes, quote-props */
const request = require('request');
const process = require('process');

const action = process.argv[2].toLowerCase();

function get20BookList() {
  request(
    'https://lidemy-book-store.herokuapp.com/books?_limit=20',
    (error, response, body) => {
      const json = JSON.parse(body);
      for (let i = 0; i < json.length; i++) {
        console.log(`${json[i].id} ${json[i].name}`);
      }
    },
  );
}

function getBookId(n) {
  request(
    `https://lidemy-book-store.herokuapp.com/books/${n}`,
    (error, response, body) => {
      const json = JSON.parse(body);
      if (json.name === undefined) {
        console.log('No this book in the API, please try another ID');
      } else {
        console.log(json.name);
      }
    },
  );
}

function createBook(n) {
  /*
  request(
    'https://lidemy-book-store.herokuapp.com/books/',
    (error, response, body) => {
      // const json = JSON.parse(body)
      // const objLen = json.length;
      // const lastID = json[objLen-1].id
      // const newID = (lastID >= objLen) ? lastID + 1 : objLen + 1
      request.post({
        url: 'https://lidemy-book-store.herokuapp.com/books/',
        json: true,
        body: {"id": newID, "name": n },
      });
    },
  );
  */
  request.post(
    {
      url: 'https://lidemy-book-store.herokuapp.com/books/',
      form: {
        name: n,
      },
    }, (error, response, body) => {
      console.log(body);
    },
  );
}

function deleteBookId(n) {
  request.del(`https://lidemy-book-store.herokuapp.com/books/${n}`);
}

function patchBook(n, bkName) {
  request.patch(
    {
      url: `https://lidemy-book-store.herokuapp.com/books/${n}`,
      form: {
        name: bkName,
      },
    }, (error, response, body) => {
      console.log(body);
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
    deleteBookId(process.argv[3]);
    break;
  case 'create':
    createBook(process.argv[3]);
    break;
  case 'update':
    patchBook(process.argv[3], process.argv[4]);
    break;
  default:
    console.log('Wrong input');
}
