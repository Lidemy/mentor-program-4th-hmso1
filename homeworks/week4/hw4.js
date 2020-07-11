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
  let json;
  try {
    json = JSON.parse(body);
  } catch (err) {
    console.log(err);
    return;
  }

  if (json.status !== undefined) {
    console.log(`Status Code: ${json.status} ${json.error}`);
    return;
  }
  for (let i = 0; i < json.top.length; i++) {
    console.log(`${json.top[i].viewers} ${json.top[i].game.name}`);
  }

  /*
  const {top: [first]} = json
  const {game: {name}} = first
  console.log(name)
  */
}

request(option, callback);
