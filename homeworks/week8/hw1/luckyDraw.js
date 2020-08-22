/* eslint-disable indent, no-alert */
function getPageResult(cb) {
  const request = new XMLHttpRequest();
  request.onload = () => {
      if (request.status >= 200 && request.status < 400) {
        try {
          const result = JSON.parse(request.responseText);
           return cb(false, result.prize);
        } catch (error) {
           return cb(true);
        }
      } else {
        return cb(true);
      }
    };

  request.onerror = () => {
    cb(true);
  };

  request.open('GET', 'https://dvwhnbka7d.execute-api.us-east-1.amazonaws.com/default/lottery', true);
  request.send();
}

document.querySelector('.lucky-draw-main').addEventListener('click', (e) => {
  if (e.target.className === 'lucky-draw-btn') {
    document.querySelector('.lucky-draw-main').className = 'lucky-draw-main';
    const errorMessager = '系統不穩定，請再試一次';
    getPageResult((err, drawResult) => {
      if (err) {
        alert(errorMessager);
        document.querySelector('.ld-outside-box').classList.remove('hide');
        document.querySelector('.result-page').classList.add('hide');
        return;
      }

      const prize = {
                      FIRST: 'first',
                      SECOND: 'second',
                      THIRD: 'third',
                      NONE: 'none',
                    };

      if (prize[drawResult]) {
        // swtich the background photo
        document.querySelector('.lucky-draw-main').classList.add(prize[drawResult]);
        // hide the info box
        document.querySelector('.ld-outside-box').classList.add('hide');
        // unhide the result page
        document.querySelector('.result-page').classList.remove('hide');
      } else {
        alert(errorMessager);
        document.querySelector('.ld-outside-box').classList.remove('hide');
        document.querySelector('.result-page').classList.add('hide');
      }
    });
  }
});
