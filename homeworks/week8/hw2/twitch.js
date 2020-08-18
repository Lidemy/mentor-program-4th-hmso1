/* eslint-disable indent, no-alert, no-restricted-syntax, no-plusplus */
function escapeHtml(unsafe) {
  return unsafe
       .replace(/&/g, '&amp;')
       .replace(/</g, '&lt;')
       .replace(/>/g, '&gt;')
       .replace(/"/g, '&quot;')
       .replace(/'/g, '&#039;');
}

function getGameList(cb) {
  const request = new XMLHttpRequest();

  request.onload = () => {
    if (request.status >= 200 && request.status < 400) {
      try {
        const gameList = JSON.parse(request.responseText);
        return cb(false, gameList);
      } catch (err) {
        return cb(true, err);
      }
    } else {
      return cb(true, request.status);
    }
  };

  request.onerror = () => {
    cb(true, 'Request On Error');
  };
  request.open('GET', 'https://api.twitch.tv/kraken/games/top?limit=5', true);
  request.setRequestHeader('Client-ID', '70sm1kq2alcac1zmwrr54hxg1znxs3');
  request.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
  request.send();
}

function getStreamingList(gameName, cb) {
  const request = new XMLHttpRequest();

  request.onload = () => {
    if (request.status >= 200 && request.status < 400) {
      try {
        const streamingList = JSON.parse(request.responseText);
        return cb(false, streamingList, gameName);
      } catch (err) {
        return cb(true, err);
      }
    } else {
      return cb(true, request.status);
    }
  };

  request.onerror = () => {
    cb(true, 'Request On Error');
  };
  request.open('GET', `https://api.twitch.tv/kraken/streams/?game=${encodeURIComponent(gameName)}&limit=20`, true);
  request.setRequestHeader('Client-ID', '70sm1kq2alcac1zmwrr54hxg1znxs3');
  request.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
  request.send();
}
function callback(iserr, result, game) {
  if (iserr) {
    alert(result);
    return;
  }
  document.querySelector('.streaming-list').innerHTML = '';
  document.querySelector('.content-game-title').innerText = game;

  for (const stream of result.streams) {
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

getGameList((iserr, result) => {
  if (iserr) {
    alert(result);
    return;
  }

  const gameName = [];
  for (const game of result.top) {
    gameName.push(game.game.name);
  }
  for (let i = 0; i < 5; i++) {
    document.querySelector(`#popular-${i}`).innerHTML = gameName[i];
  }
  // get the most popular game streaming list
  getStreamingList(gameName[0], callback);
});

document.querySelector('.nav-game-name').addEventListener('click', (e) => {
  e.preventDefault();
  if (e.target.tagName === 'A') {
    getStreamingList(e.target.innerText, callback);
  }
});
