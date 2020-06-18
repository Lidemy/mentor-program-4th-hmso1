## 請解釋後端與前端的差異。
前端是負責使用者在電腦螢幕看到的一切，例如瀏覽器中網頁內容、外表、顏色、排版等。前端的編程有負責網頁框架的 HTML、負責網頁外觀的 CSS 和 前端和使用者作出互動的 JavaScript等等。

後端是負責處理前端所發出的要求，這一部份是使用者不會看到的。後端會需要和資料庫溝通，並根據使用者要求輸出資料給前端去顯示。

## 假設我今天去 Google 首頁搜尋框打上：JavaScript 並且按下 Enter，請說出從這一刻開始到我看到搜尋結果為止發生在背後的事情。
1. 瀏覽器會問 DNS 伺服器 google.com/search 應該怎樣走
2. DNS 伺服器會輸出一個 IP 地址給瀏覽器
3. 瀏覽器會發一個 request 到該 IP 址中，request 內會有使用者想搜尋的 `JavaScript` 內容
4. 位放 IP 地址的 Server 收到 request
5. Server 會問有關的資料庫，查找 `JavaScript` 的關鍵字
6. 資料庫找到後，回傳資料給 Server
7. Server 會曾過處理（例如：排序）後回傳 reponse 給瀏覽器
8. 瀏覽器解析回傳的資訊並顯示出來

## 請列舉出 3 個「課程沒有提到」的 command line 指令並且說明功用
1. `sort 文字檔.txt`：根據英文字母去排序

```
sort 前
Cat
Apple
Bob

sort 後
Apple 
Bob
Cat
```
2. `uniq 文字檔.txt`：刪除重複的內容
```
uniq 前
Bob
Bob
App
Cat
Bob

uniq 後
Bob
App
Cat
```

3. `sed s/找尋的字串/代替的字串`
例如輸入 `sed s/morning/afternoon test.txt`
```
sed 前
Good morning
We will eat bread in the morning

sed 後
Good afternoon
We will eat bread in the afternoon
```