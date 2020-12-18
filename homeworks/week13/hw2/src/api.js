import $ from 'jquery';

export function getComments(apiUrl, siteKey, id, cb) {
  $.ajax({
    type: 'GET',
    url: `${apiUrl}/api_comments.php`,
    data: {
      site_key: siteKey,
      id,
    },
  }).done((data) => {
    cb(data);
  });
}

export function addComments(apiUrl, input, cb) {
  $.ajax({
    type: 'POST',
    url: `${apiUrl}/api_add_comments.php`,
    data: input,
  }).done((data) => {
    cb(data);
  });
}
