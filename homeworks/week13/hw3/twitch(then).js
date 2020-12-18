/* eslint-disable indent, no-alert, no-restricted-syntax, no-plusplus, max-len */
function escapeHtml(unsafe) {
  return unsafe
       .replace(/&/g, '&amp;')
       .replace(/</g, '&lt;')
       .replace(/>/g, '&gt;')
       .replace(/"/g, '&quot;')
       .replace(/'/g, '&#039;');
}

const apiUrl = 'https://api.twitch.tv/kraken/';
const clientId = '70sm1kq2alcac1zmwrr54hxg1znxs3';
const acceptToken = 'application/vnd.twitchtv.v5+json';

function getGameList() {
  const url = `${apiUrl}games/top?limit=5`;

  return fetch(url, {
    method: 'GET',
    headers: {
      'Client-ID': clientId,
      Accept: acceptToken,
    },
  }).then(res => res.json());
}

function getStreamingList(gameName) {
  const url = `${apiUrl}streams/?game=${encodeURIComponent(gameName)}&limit=20`;

  return fetch(url, {
    method: 'GET',
    headers: {
      'Client-ID': clientId,
      Accept: acceptToken,
    },
  }).then(res => res.json());
}

function appendStreamingList(gameName, streams) {
  document.querySelector('.streaming-list').innerHTML = '';
  document.querySelector('.content-game-title').innerText = gameName;

  for (const stream of streams.streams) {
    const streamObj = {
      preview: stream.preview.medium,
      logo: stream.channel.logo,
      status: escapeHtml(stream.channel.status),
      displayName: escapeHtml(stream.channel.display_name),
      url: stream.channel.url,
    };

    const div = document.createElement('div');
    div.classList.add('streaming-box');
    div.innerHTML = `
      <div class="profile-pic">
        <a href="${streamObj.url}" target="popup">
          <img src="${streamObj.preview}" alt="">
        </a>
      </div>
      <div class="desc-box">
        <img src="${streamObj.logo}" alt="" class="desc-logo">
        <div class="desc-info">
          <a href="${streamObj.url}" target="popup"><p class="info-status">${streamObj.status}</p></a>
          <a href="${streamObj.url}" target="popup"><p class="info-display-name">${streamObj.displayName}</p></a>
        </div>
      </div>`;
    document.querySelector('.streaming-list').appendChild(div);
  }
}

function handleGetStreamingList(gameName) {
  getStreamingList(gameName).then(result => appendStreamingList(gameName, result)).catch(err => alert(err));
}

getGameList().then((result) => {
  const gameName = [];
  for (const game of result.top) {
    gameName.push(game.game.name);
  }
  for (let i = 0; i < 5; i++) {
    document.querySelector(`#popular-${i}`).innerHTML = gameName[i];
  }

  // get the most popular game streaming list
  handleGetStreamingList(gameName[0]);
}).catch(err => alert(err));

document.querySelector('.nav-game-name').addEventListener('click', (e) => {
  e.preventDefault();
  if (e.target.tagName === 'A') {
    handleGetStreamingList(e.target.innerText);
  }
});
