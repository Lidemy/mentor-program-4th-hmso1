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

<img src="https://github.com/Lidemy/mentor-program-4th-hmso1/blob/week7/homeworks/week7/DOM.JPG?raw=true" width="400px" />

如果節點是同一層的是 Sibling， 例如: `<head>` 和 `<body>`，`<h1>`和`<div>`。

如果節點是上下層就是 Parent and Child，上面的是 Parent 下面的是 Child。例如: `<body>`和`<h1>`，`<body>`和`<div>`，`<div>` 和 `<p>`。

知道了節點和節點間的關係就可以用 JS 在 DOM 樹中找到我們需要的資料。原生 DOM 的 API 有以下的 method 來尋找節點。

1. document.getElementsByTagName: 尋找有相同 tag 元素的節點。例如，`document.getElementsByTagName("div")[0]` 就會找到 
```html
<div class="wrapper">
  <p> I am a paragraph</p>
</div>
``` 
2. document.getElementsByClassName:尋找有相同 class 名的元素節點。例如，`document.getElementsByClassName("wrapper")[0]` 就會找到 
```html
<div class="wrapper">
  <p> I am a paragraph</p>
</div>
``` 
3. document.getElementById:尋找有相同 id 名的元素節點。例如，document.getElementById("txt") 就會找到
```html
<h1 id="txt">Hello World</h1>
```

4. document.querySelector("css 選取器"): 例如，`document.querySelector("#txt")`就會找到
```html
<h1 id="txt">Hello World</h1>
```
`querySelector`只會選取到第一會合符條件的元素，如果是要選取所有合符條件的元素需要用到`document.querySelectorAll("css 選取器")`

注意: 
- `document.getElementsByTagName` 和 `document.getElementsByClassName` 是回傳一個 HTMLCollection，是一個 object 來的。
- getElemtById 中的的 element 是沒有 s 的，因為 id 在整個 HTML 中應該得一個。
- mehtod 不一定以 `document`作開頭，可以你想開始找尋的節點作開頭。

用以上的 method 再加上我們知道元素之間的關係，我們可以移動到想去的節點。例如，`document.querySelector("div").children` 會回傳一個陣列入面就是 `<div>` 內的元素節點。

以 `<div class="wrapper">` 為中心
- `.previousElementSibling`: 會找到 `<h1>`
- `.nextElementSibling`: 會找不到東西
- `.parentElement`: 會找到 <body>

因為有了 DOM，我們可以使用 JS 在節點間移動，拿到我們想要的 tag 內資料。

## 事件傳遞機制的順序是什麼；什麼是冒泡，什麼又是捕獲？
<img src="https://github.com/Lidemy/mentor-program-4th-hmso1/blob/week7/homeworks/week7/DOM.JPG?raw=true" width="400px" />

當我們點擊 `<p>` 的時候，程式並不是步到位去到 `<p>`元素，程式是經過 DOM 的結構一歩一歩由 Document 傳遞到 `<p>` 的位置，由 Document 行去 `<p>` 就是叫捕獲。當到了目標後，程式會返回到 Document，這部份叫做冒泡。在 `addEventListener` 時，我們可以傳入第三個參數，true 就是放在捕獲，false 就是放在冒泡。參數的預設值是 false，也是放在冒泡中。
當到達目標 `<p>` 的時候，它並不屬於捕獲或冒泡任何一方，所以在目標加入 `捕獲的addEventListener` 和 `冒泡的addEventListener` 時會根據先後次序執行，不一定要先捕獲後冒泡。

## 什麼是 event delegation，為什麼我們需要它？
在知道事件傳遞機制的運行，當處理動態網頁時，為了不需要將每個動態元素都加上 `addEventListener`，也不怕新增的元素沒有加上 `addEventListener`。我們會在動態元素的 ParentElement 加上 `addEventListener`，使每一個動態元素都會受到 Parent 的控制，包括新增的元素。我們經 JS 控制了 Parent 就可以控制到每一個動態元素。


## event.preventDefault() 跟 event.stopPropagation() 差在哪裡，可以舉個範例嗎？
`event.preventDefault()` 會使 event 之後所有瀏覧器預設的工作取消，例如在 form 中按下 submit button 不會跳去下一頁。這個效果會傳遞到 event 節點下的 ChildNodes。雖然預設工作取消，但事件傳遞機制是沒有停止的，所有在 event 後的 `eventListener` 都會繼續運行。
`event.stopPropagation()` 會將事件傳遞終止，不會傳遞到下一層也不會影響瀏覧器預設的工作。同一層的 `eventListener` 還是會被執行的，如果不想執行同一層的 `eventListener` 就需要用到`event.stopImmediatePropagation()。