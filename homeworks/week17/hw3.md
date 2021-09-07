## 什麼是 MVC？
MVC 是一種編寫程式時的架構，分為 Model, View, Controller 三類。
1. Model 負責有關資料的操作
2. View 是一些網頁的模板，將由 Model 回傳的資料放入模板中
3. Controller 是負責連接 Model 和 View，它會呼叫 Model 去拿資料，Model 回傳的資料會由 Controller 傳去 View 進行渲染
MVC 的結構會使程式的職責分得明確，會較容易維護。

## 請寫下這週部署的心得
使用 Heroku 去部署十分方便，雖然需要做環境變數的設定，但在 [BE201] 都說明的好清晰。但在部署其間發現有以下問題：

1. 如果在 XAMPP 的 MySQL 開晵的情況下 git push 去 Heroku 會開不到 Table
應該當時設定有問題，之後開住 MySQL 再部署多次到 Heroku 都沒有問題，Table 都成功建立。

2. 在 ClearDB 的 timezone 同身處的時區不同
要新增 heroku Timezone config：
`heroku config:add TZ="Asia/Hong_Kong"`

更改或刪除：
`heroku config:add TZ="America/Argentina/Buenos_Aires"`
`heroku config:add TZ=""`

檢查 heroku config
`heroku config:get TZ`

因為今次是在 Heroku 上部署，下次有時間試試租主機。在 Heroku 上 ClearDB 自動設定了環境變數，如果自己租主機是不是會要將 database 的 config 都設定在主機上?

## 寫 Node.js 的後端跟之前寫 PHP 差滿多的，有什麼心得嗎？
課程期間有用過幾種不同的方法編寫後端：
1. 以 PHP 實作 Server side render
結構比較亂，記得當時一邊寫都覺得自己迷失在 PHP 中，主要原因是 HTML 同 PHP 的 code 溝在一齊。嘗試過部署 Ubuntu 主機覺得部署主機是一件好煩但會令人不斷想試到成功的業作。

2. 以 PHP 寫出 API 實作 Client side render
暫時覺得 API 是同後端溝通最整齊的方法，後端可以將組織後資料傳遞到前端，缺點是 SEO 問題，要寫 JS 程式寫傳回來的資料放到網頁中。

3. 以 Node.js 同 MVC 架構實作 Server side render
MVC 架構真是幫程式碼的整潔度大大提高，而且使用 JS 去寫後端比較簡單沒有 PHP 那麼多規則。
因為有了 MVC ，雖然使用 Server side render 的形式去寫使 ejs 同 html 都溝在一起，但閱讀度都應可以接受
今次沒有部署到主機，但因為不需要 APACHE 作為 server，應該會更容易吧~ 
部署到 Heroku 真是好方便，雖然載入速度好像較主機慢但部署同 debug 都好簡單，懶人必學!!!