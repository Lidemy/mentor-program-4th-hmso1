/* eslint-disable import/prefer-default-export, prefer-destructuring, no-use-before-define, no-alert, no-plusplus, max-len */
import $ from 'jquery';
import { getComments, addComments } from './api';
import { appendCommentToDOM } from './utils';
import { cssTemplate, formTemplate } from './templates';

let id = Number.MAX_SAFE_INTEGER;
let siteKey = '';
let apiUrl = '';
let containerElement = null;
let commentsDOM = null;

export function init(options) {
  siteKey = options.siteKey;
  apiUrl = options.apiUrl;
  containerElement = $(options.containerSelector);
  containerElement.append(formTemplate);

  const styleElement = document.createElement('style');
  styleElement.type = 'text/css';
  styleElement.appendChild(document.createTextNode(cssTemplate));
  document.head.appendChild(styleElement);

  commentsDOM = $('.comments');

  getNewComments();

  $('.add-comment-form').submit((e) => {
    e.preventDefault();

    const newCommentData = {
      site_key: siteKey,
      nickname: $('input[name=nickname]').val(),
      content: $('textarea[name=content]').val(),
    };

    addComments(apiUrl, newCommentData, (data) => {
      if (!data.ok) {
        alert(data.message);
        return;
      }
      $('input[name=nickname]').val('');
      $('textarea[name=content]').val('');
      appendCommentToDOM(commentsDOM, newCommentData, true);
    });
  });

  $(document).on('click', 'button[name="loading"]', (() => {
    getNewComments();
  }));
}

function getNewComments() {
  let diff = 0;
  commentsDOM = $('.comments');
  getComments(apiUrl, siteKey, id, (data) => {
    if (!data.ok) {
      alert(data.message);
      return;
    }
    const comments = data.comments;

    if (comments.length > 5) {
      id = comments[comments.length - 2].id;
    }

    if (comments.length !== 6) {
      $('button[name="loading"]').hide();
    } else {
      diff = 1;
    }

    for (let i = 0; i < comments.length - diff; i++) {
      appendCommentToDOM(commentsDOM, comments[i]);
    }
  });
}
