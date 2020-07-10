/* eslint-disable no-plusplus, indent, no-unused-expressions */
const request = require('request');
const process = require('process');

function printInfo(s) {
  for (let i = 0; i < s.length; i++) {
    console.log(
`============
國家：${(s[i].name)}
首都：${(s[i].capital)}
貨幣：${(s[i].currencies[0].code)}
國碼：${(s[i].callingCodes[0])}`,
    );
  }
}

request(
  `https://restcountries.eu/rest/v2/name/${process.argv[2]}`,
  (error, response, body) => {
    let json;

    try {
      json = JSON.parse(body);
    } catch (err) {
      console.log(err);
      return;
    }

    if (json.status === undefined) {
      printInfo(json);
    } else if (json.status === 404) {
      console.log('找不到國家資訊');
    } else {
      console.log(`失敗，請查看以下 Status Code: ${json.status}`);
    }
  },
);
