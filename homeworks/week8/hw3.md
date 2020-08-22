## 什麼是 Ajax？
Ajax 全名是 Asynchronous JavaScript And XML。它可以使網頁內部份內容與伺服器進行非同步更新，而整個頁面是不會刷新。與伺服器進行非同步更新是指當我們發了一個 request 後，瀏覧器內的 JS 會繼續執行其他不關事的程式，不同停下來等待伺服器回傳 response。當收到 response 後，JS 可以用到 callback function 繼續處理有關 response。同伺服器交換的資料沒有格式上的限制，可以是 `JSON`, `XML` 等...

## 用 Ajax 與我們用表單送出資料的差別在哪？
用表單送出資料時，伺服器的資料會直接回傳到瀏覧器，由瀏覧器 render 回傳的 response。

用 Ajax 送出資料時，伺服器的資料會回傳到瀏覧器中的 JS 中，由 JS 根據程式去改寫網頁中的內容。

## JSONP 是什麼？
在 HTML 中有一些標籤是不受到同源政策的限制，例如: `<script>`, `<a>`, `<img>`，原因是為了方便嵌入有關資料到網頁中。因此，我們可以使用這個灰色地帶去向伺服器發出一些 request。大多數的時候，伺服器回傳的資料格式是一個 function 名，我們只要編寫同名的 function，就可以使用回傳的資料。


## 要如何存取跨網域的 API？
在瀏覧器發 request 時會將我們的 origin 放進 header 傳到伺服器。因為同源政策的規管下，伺服器回傳的 response 必須遵守 CORS，跨來源資源共享的規範，也就是必須在 response header 中包含 `Access-Control-Allow-Origin` 的資料。當收到 response 時，瀏覧器會檢查 response 中的`Access-Control-Allow-Origin` 有沒有給予權限我們的 domain，有的話才可以處理該 response。

## 為什麼我們在第四週時沒碰到跨網域的問題，這週卻碰到了？
因為我們的 runtime 不同了，在瀏覧器上進行 API 資料交換時，它會考慮到用家的安全性，防止惡意的網站未經用家同意下發 request 並獲取用家的個人資料。但在 Node.js 串 API 的話是由用家主動去發 request，所以風險將會由用家所承擔。 
