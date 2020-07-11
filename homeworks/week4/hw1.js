/* eslint-disable no-plusplus, no-else-return */
const request = require('request');

request(
  'https://lidemy-book-store.herokuapp.com/books?_limit=10',
  (error, response, body) => {
    if (response.statusCode === 404) {
      console.log('網頁不存在');
      return;
    } else if (!(response.statusCode > 199 && response.statusCode < 300)) {
      console.log(`失敗，請查看以下 Status Code: ${response.statusCode}`);
      return;
    }

    let json;
    try {
      json = JSON.parse(body);
    } catch (err) {
      console.log(err);
      return;
    }

    for (let i = 0; i < 10; i++) {
      console.log(`${json[i].id} ${json[i].name}`);
    }
  },
);
