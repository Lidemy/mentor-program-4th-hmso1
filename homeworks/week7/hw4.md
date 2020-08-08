## 什麼是 DOM？

DOM 的全名是 Document Object Model, 是一個 API 可以使 JavaScript 經過它來控制 HTML 內的元素。DOM 會將 HTML 的檔案解讀成樹狀結構的 Object。每一個節點就是 HTML 檔案內的 tag 元素，節點中會儲存元素內的資料，例如 class, id, type 等等。

```html
<html>
  <head>
    <title>example</title>
  </head>
  <body>
    <h1 id="txt">Hello World</h1>
    <div class="wrapper">
        <p> I am a paragraph</p>
    </div>
  </body>
</html>
```
以上的 HTML 會產生以下的 DOM 結構

如果節點是同一層的是 Sibling， 例如: `<head>` 和 `<body>`，`<h1>`和`<div>`。

如果節點是上下層就是 Parent and Child，上面的是 Parent 下面的是 Child。例如: `<body>`和`<h1>`，`<body>`和`<div>`，`<div>` 和 `<p>`。





## 事件傳遞機制的順序是什麼；什麼是冒泡，什麼又是捕獲？


## 什麼是 event delegation，為什麼我們需要它？


## event.preventDefault() 跟 event.stopPropagation() 差在哪裡，可以舉個範例嗎？
