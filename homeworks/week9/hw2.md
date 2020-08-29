## 資料庫欄位型態 VARCHAR 跟 TEXT 的差別是什麼
VARCHAR 和 TEXT 都是用來儲存文字的型態，最多都可以儲存 65,653 bytes 的資料。VARCHAR 和 TEXT 最大的分別是 VARCHAR 需要輸入最多可儲存的文字數量。因為在 query 的時候，query VARCHAR 會較 TEXT 有效率，所以在已知道輸入的長度範圍是什麼時就應該使用 VARCHAR。不同編碼會有不同最大的 VARCHAR，例如 : utf8 每個字只需要 3 bytes ，所以最大的輸入字數個是 21,884。

TEXT 只可以加上全文檢索，VARCHAR 就沒有該限制索引種類。但當 VARCHAR 的 bytes 太大超過索引的限制，我們只可以對部份 VARCHAR 定制索引。我們也可以對太大的 VARCHAR 進行加密到較少的字串並儲存到一個新的 column，並對新 column 加上索引。 

## Cookie 是什麼？在 HTTP 這一層要怎麼設定 Cookie，瀏覽器又是怎麼把 Cookie 帶去 Server 的？
Cookie 是資料儲存到瀏覽器並由瀏覽網頁時幾 request 傳送到 server。Cookie 會記錄要傳送的資料，那一個網域可以傳取有關資料，資料會幾時到期。Cookie 可分為第一方 Cookie 和第三方 Cookie，當在瀏覽 A 網頁時，以 A 網頁為網域的是第一方 Cookie。但因為 A 網頁有機會嵌入 B 網頁的內容，所以 Cookie 中有機會包含不是 A 網頁為網域的資料，這些就稱之為第三方 Cookie。大多數的第三方 Cookie 都會是廣告網頁，因為不同的網頁都會嵌入 B 網頁(廣告商)，所以它可以用 Cookie 來追蹤不同電腦使用者的網頁瀏覽記錄，再向使用者推薦不同的商品廣告。
大多數的時候， Cookie 會連同 Session 一齊使用，Session 可以在 Cookie 中記錄底使用者在網頁中資料，例如登入狀態、瀏覽過什麼的頁面等等...。這些資料會以 `Set-cookie` 的方法傳遞到瀏覽器中。每當瀏覽器發一次 request 時，一樣網域而又未過期的 Cookie 資料會經 request header 傳遞到 server 中，再由 server 內的程式去解讀和處理。 

## 我們本週實作的會員系統，你能夠想到什麼潛在的問題嗎？
1. 沒有對留言作出處理。留言一包含 js html 的語法就會跑版、如果以 " 或 ' 作為留言開頭會因為 SQL 語法而出錯誤。
2. database 內的密碼沒有加密
