/* eslint-disable no-plusplus, quotes, quote-props, no-unused-expressions */
const request = require('request');
const process = require('process');

const action = process.argv[2].toLowerCase();

function isStatusCodeFail(code) {
  if (!(code > 199 && code < 300)) {
    console.log(`失敗，請查看以下 Status Code: ${code}`);
    return false;
  }
  return true;
}

function isJsonBody(body) {
  try {
    return JSON.parse(body);
  } catch (err) {
    console.log(err);
    return false;
  }
}

function get20BookList() {
  request(
    'https://lidemy-book-store.herokuapp.com/books?_limit=20',
    (error, response, body) => {
      if (isStatusCodeFail(response.statusCode) === false) return;
      if (isJsonBody(body) === false) return;
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
      if (isStatusCodeFail(response.statusCode) === false) return;

      if (isJsonBody(body) === false) return;

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
  // 本身以為 post 一定要有 id 作為參數，所以寫了以下的 coding 決定傳入 id 的數字是什麼，但之後發現會自動派 id。
  /*
  request(
    'https://lidemy-book-store.herokuapp.com/books/',
    (error, response, body) => {
      // const json = JSON.parse(body)
      // const newID = json[json.length-1].id + 1
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
      if (isStatusCodeFail(response.statusCode) === false) return;
      console.log(body);
    },
  );
}

function deleteBookId(n) {
  request.del(`https://lidemy-book-store.herokuapp.com/books/${n}`, (error, response) => {
    if (isStatusCodeFail(response.statusCode) !== false) {
      console.log('Successful');
    }
  });
}

function patchBook(n, bkName) {
  request.patch(
    {
      url: `https://lidemy-book-store.herokuapp.com/books/${n}`,
      form: {
        name: bkName,
      },
    }, (error, response, body) => {
      if (isStatusCodeFail(response.statusCode) === false) return;
      console.log(body);
    },
  );
}

switch (action) {
  case 'list':
    get20BookList();
    break;
  case 'read':
    (process.argv[3] === undefined) ? console.log('Please provide ID.') : getBookId(process.argv[3]);
    break;
  case 'delete':
    (process.argv[3] === undefined) ? console.log('Please provide ID.') : deleteBookId(process.argv[3]);
    break;
  case 'create':
    (process.argv[3] === undefined) ? console.log('Please provide book name.') : createBook(process.argv[3]);
    break;
  case 'update':
    if (process.argv[3] === undefined) {
      console.log('Please provide ID.');
    } else if (process.argv[4] === undefined) {
      console.log('Please provide the new book name.');
    } else {
      patchBook(process.argv[3], process.argv[4]);
    }
    break;
  default:
    console.log('Wrong input');
}
