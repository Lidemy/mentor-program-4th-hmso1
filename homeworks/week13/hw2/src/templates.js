export const cssTemplate = '.card, .loading { margin-top: 20px;}';

export const formTemplate = `
<div>
    <form class="add-comment-form">
    <div class="form-group">
        <label for="form-nickname">暱稱</label>
        <input name="nickname" type="text" class="form-control" id="form-nickname">
    </div>
    <div class="form-group">
        <label for="content-textarea">留言內容</label>
        <textarea name="content" class="form-control" id="content-textarea" rows="3"></textarea>
    </div>
    <button type="submit" class="btn btn-primary">送出</button>
    </form>

    <div class="comments"></div>

    <button class="btn btn-primary loading" type="button" name="loading">載入更多</button>
</div>`;
