/* eslint-disable import/prefer-default-export, prefer-destructuring, no-use-before-define, no-alert, no-plusplus, max-len */
import $ from 'jquery';
import { getComments, addComments } from './api';
import { appendCommentToDOM, appendStyle } from './utils';
import { cssTemplate, getForm } from './templates';

export function init(options) {
  let id = Number.MAX_SAFE_INTEGER;
  let siteKey = '';
  let apiUrl = '';
  let containerElement = null;
  let commentsDOM = null;

  siteKey = options.siteKey;
  apiUrl = options.apiUrl;

  const loadMoreClassName = `${siteKey}-loading`;
  const loadMoreSelector = `.${loadMoreClassName}`;
  const commentsClassName = `${siteKey}-comments`;
  const commentsSelector = `.${commentsClassName}`;
  const formClassName = `${siteKey}-add-comment-form`;
  const formSelector = `.${formClassName}`;

  containerElement = $(options.containerSelector);
  containerElement.append(getForm(formClassName, commentsClassName, loadMoreClassName));

  appendStyle(cssTemplate);

  commentsDOM = $(commentsSelector);

  getNewComments();

  $(formSelector).submit((e) => {
    e.preventDefault();
    const nicknameDom = $(`${formSelector} input[name=nickname]`);
    const contentDom = $(`${formSelector} textarea[name=content]`);
    const newCommentData = {
      site_key: siteKey,
      nickname: nicknameDom.val(),
      content: contentDom.val(),
    };

    addComments(apiUrl, newCommentData, (data) => {
      if (!data.ok) {
        alert(data.message);
        return;
      }
      nicknameDom.val('');
      contentDom.val('');
      appendCommentToDOM(commentsDOM, newCommentData, true);
    });
  });

  $(document).on('click', loadMoreSelector, (() => {
    getNewComments();
  }));

  function getNewComments() {
    let diff = 0;
    commentsDOM = $(commentsSelector);
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
        $(loadMoreSelector).hide();
      } else {
        diff = 1;
      }

      for (let i = 0; i < comments.length - diff; i++) {
        appendCommentToDOM(commentsDOM, comments[i]);
      }
    });
  }
}
