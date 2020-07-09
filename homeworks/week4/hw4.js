/* eslint-disable no-plusplus */
const request = require('request');

const option = {
  url: 'https://api.twitch.tv/kraken/games/top?limit=100',
  headers: {
    Accept: 'application/vnd.twitchtv.v5+json',
    'Client-ID': '70sm1kq2alcac1zmwrr54hxg1znxs3',
  },
};

function callback(error, respones, body) {
  const json = JSON.parse(body);
  for (let i = 0; i < json.top.length; i++) {
    console.log(`${json.top[i].viewers} ${json.top[i].game.name}`);
  }
}

request(option, callback);
