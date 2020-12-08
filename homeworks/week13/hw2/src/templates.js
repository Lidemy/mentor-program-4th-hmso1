export const cssTemplate = '.card, .loading { margin-top: 20px;}';

export function getForm(formClassName, commentsClassName, buttonClassName) {
  return `
  <div>
      <form class="${formClassName}">
          <div class="form-group">
              <label>暱稱</label>
              <input name="nickname" type="text" class="form-control" >
          </div>
          <div class="form-group">
              <label>留言內容</label>
              <textarea name="content" class="form-control" rows="3"></textarea>
          </div>
          <button type="submit" class="btn btn-primary">送出</button>
      </form>

      <div class="${commentsClassName}"></div>

      <button class="btn btn-primary ${buttonClassName}" type="button" name="loading">載入更多</button>
  </div>`;
}
