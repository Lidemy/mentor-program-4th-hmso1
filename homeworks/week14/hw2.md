## 部署背景
主機：AWS - Ubuntu Server 20.04
Database ：DBeaver
FTP：FileZilla

## 部署心得

### 設置 EC2 主機
今次在 AWS 使用了 Ubuntu Server 20.04 去部署主機，發現和 Ubunte Server 18.04 有少少不同，所以希望記低等下次要部署主機都可以回顧，不需要再重覆卡闗。

一開始在 AWS 的 EC2 部署在：
Step 1：選擇 Ubuntu Server 20.04 LTS
Step 6：加入 HTTP（Port 80），HTTPS（Port 443），MYSQL（Port 3306，Source 要選擇 `Anywher`）

如果是第一次部署主機會要求你建立一個 `private key` 去在連接 EC2 使，也可以使用現有的 key。 待主機開始執行後就可以使用 `Git Bash` 來進行操作。


### 登入主機
使用 `private key` 去登入主機 
```git
ssh -i 私鑰的位置/私鑰的名稱.pem ubuntu@公有 IPv4 地址
```
輸入 `yes` 去確認連接
我是沒有遇到的，但如果出現 `Permission for 私鑰 are too open` 就要降低私鑰的權限
```git
chmode 0400 私鑰.pem
```

### 安裝 Tasksel，Lamp-Server，phpmyadmin
Step 1. 更新 Ubuntu 系統
```git
sudo apt update && sudo apt upgrade && sudo apt dist-upgrade
```
`sudo` 是代表以系统管理者的身份執行指令
`apt` 是 Ubuntu 內用作 package 的管理
更新的過程會向你確定是否更新，輸入 `y` 就可以。

Step 2. 安裝 Tasksel
```git
sudo apt install tasksel 
```
安裝的過程會向你確定是否安裝，輸入 `y` 就可以。

Step 3. 使用 Tasksel 去安裝 Lamp-Sever
```git
sudo tasksel install lamp-server
```
安裝的過程會向你確定是否安裝，輸入 `y` 就可以。安裝完成後在瀏覧器輸入公有 IPv4 地址（例子：1.1.1.1）就會有 Apache2 Ubuntu Default Page 出現。

Step 4. 安裝 phpMyAdmin
```git
sudo apt install phpmyadmin
```
安裝的過程會向你確定是否安裝，輸入 `y` 就可以。安裝其間需要
1. 設定 reconfigure 到 `apache2`（以安白鍵選擇）。
2. 在 dbconfig-common 選擇 `yes`
3. 設定一個密碼給 phpMyAdmin

安裝完成你可以在瀏覧器輸入公有 IPv4 地址/phpmyadmin （例子：1.1.1.1/phpmyadmin）就可以進入 phpMyAdmin 登入頁面。

### 設定 phpMyAdmin
在`1.1.1.1/phpmyadmin` 的頁面中你可以使用用戶名: phpmyadmin 和剛剛設定的密碼登入到 phpMyAdmin，但入到去會發現 phpmyadmin 是沒有全域的權限，所以我們需要為 root 設定密碼。當然給 phpmyadmin 全域的權限但應該好少會這樣做吧！

在 `Git Bash` 輸入 `mysql -u root mysql`就可以進入到 MySQL 進行指令，我們可以查看 mysql.user table 的 user 和 plugin設定，輸入 `SELECT User, plugin FROM mysql.user;`
`
![](https://i.imgur.com/UumHSU9.png)

用戶 root 如果需要使用密碼登入 phpMyAdmin 就要修改 plugin。在 Ubuntu 18.04 作業系統中，安裝的 MySQL version 是 5.X，默認的 plugin 是`'mysql_native_password`。將 root 的 plugin 改做 `caching_sha2_password` 或 `mysql_native_password` 都可以。我就用了`caching_sha2_password` 進行。

P.S. 可以在主機頁面打 `mysql -V` 去確認 MySQL 的 version。

輸入以下指令去修改 plugin 和更新設定：
```sql
 //; 是好重要，好重要，好重要。重要的事要說三次
UPDATE mysql.user SET plugin = 'caching_sha2_password' WHERE User = 'root';
FlUSH PRIVILEGES; //reload table 
exit //離開 MySQL 指令
```
之後就在 Git Bash 中輸入`sudo mysql_secure_installation`設定 root 登入 phpMyAdmin 的密碼。
1. 輸入 `y` 去確定 setup root 的密碼
2. 選擇密碼的強度
3. 輸入了密碼
輸入了密碼後系統會問你幾個問題，全部輸入 `y`就可以。

之後你就可以在 1.1.1.1/phpmyadmin 中以 root 登入。

### 設定 DBaever
在設定 DBeaver 前要確定以下事項：
1. EC2 的主機的 3306 Port 已開，可以在 window cmd 使用 `telnet 1.1.1.1 3306` 查詢
<br>
2. 修改 mysqld.cnf
輸入 `sudo vim /etc/mysql/mysql.conf.d/mysqld.cnf`
搜尋 bind-address，並將它加上 `#` 變成 comment
![](https://i.imgur.com/smOqWVS.png)
輸入 `sudo service mysql restart` 去重啟 MySQL
<br>
3. phpMyAdmin 使用者帳號中主機名稱的要設定為全域（%）

![](https://i.imgur.com/A2HO7ki.png)
經過多次嘗試發現其實新增一個使用者會最方便，但如果你想使用 root 也可以，選擇 root 的編輯權限
![](https://i.imgur.com/tm5VNTp.png)
將主機名稱設定為任何主機，一定要填寫一個新的密碼（Ubuntu 18.04 好似不需要一個新密碼的）。
最後就會有以下的使用者列表
![](https://i.imgur.com/GPmla6X.png)
現在你會有兩個 root 使用者和兩個密碼
```
acc: root@location
pw: root-local

acc: root@%
pw: root-%
```
在 1.1.1.1/phpmyadmin 會發現 `root@%` 的密碼是登入不到 phpMyadmin，只有 `root@location` 的密碼才可以登入，我相信係 conflict 的問題，所以最好的解決方法是將 `root@location` 刪除。

完成這三項的設定就可以在 DBeaver 連接我們的 DB。留意在 DBeaver 中要使用 MySQL 8+ 去連接因為我們 MySQL 的 version 是 8.0
![](https://i.imgur.com/eX8jCiG.png)
輸入 Server Host，Username 和 Password，例子：
```
Server Host: 1.1.1.1
Username: root
Password: root-%
```
### 複製 Database 到新主機
![](https://i.imgur.com/RuUKrY9.png)
1. Right Click 和複製需要的 DB
2. 在目標位置貼上
3. 再 Right click 剛剛複製的 DB 選擇 Export Data
4. 選擇以 Database 型式 export，按 Next
5. 選擇 Target container 為目標主機 1.1.1.1，按 Next（P.S. 要 click 一下 Target 才可以按 Next）
6. 一直按 Next 直到按到 Start
7. DBaever 會自動將 data 複製到新 database
![](https://i.imgur.com/8SpJX78.png)

其實如果沒有進行步驟 1 和 2 都可以成個 table 複製到 1.1.1.1 內，但一些 table 的設定會沒有被複製到新 table，例如 column 的 Default value, Primary key, Unique key。
 ![](https://i.imgur.com/pOoyNB0.png)
 左圖是沒有進行步驟 1 和 2 直接 Export Data，右圖是原生 table 的 DDL

### 設定 FileZilla
1. 以 SFTP 的型式去連接 1.1.1.1，使用者名稱是 `ubunut` 並帶上私鑰。
2. 前住 var/www/html，將之後的 php html 等文件放在這邊
3. 發現不可以 drag 檔案到該路徑因為我們沒有權限
4. 在 `Git Bash` 輸入 `sudo chown ubuntu /var/www/html` 使 ubuntu 使用者可以上傳檔案

### 設定 php.ini
原生的 php configuration 入面是不會在瀏覽器中顯示 error，這樣會好難進行 debug 所以會建議修改設定檔。同時都可以修改 short_open_tag 設定，但因為我在 Ubuntu 20.04 沒有遇到 short tag 引起的 error 所以我沒有設定。
```git 
sudo vim /etc/php/7.2/apache2/php.ini

//搜查 display_error，將 display_error = Off 改成
display_error = On

//搜查 short_open_tag，將 short_open_tag = Off 改成
short_open_tag = On

sudo systemctl restart apache2
```

![](https://i.imgur.com/OVd0FAk.png)

### 在部署其間的事項
因為以下的事件不知應該放在那部份，所以加了一個 section 去寫。

1. 在主機以 mysql 指令加 account
在完成安裝 phpMyAdmin 和設定了 root 的密碼後可以在 1.1.1.1 中打 `mysql -u root -p`，填寫密碼進入 mysql 指令畫面。可以在這裏直接下 MySQL 指令去加 account 和設定密碼，不一定進入 phpMyAdmin 處理。
```sql
//建立 iris@% 的 account
CREATE USER 'iris'@'%' IDENTIFIED BY 'iris-pw';

//給 iris@% 全域的權限
GRANT ALL PRIVILEGES ON *.* TO 'iris'@'%' WITH GRANT OPTION;

FLUSH PRIVILEGES;

exit
```
如果想收返 iris@% 的全域權限可以在 mysql 指令畫面輸入`REVOKE ALL PRIVILEGES ON *.* FROM 'iris'@'%'`

2. 如果一開始沒有刪除 root@% 會發生什麼問題
其實都沒有好大問題，只是會有一些衝突。假設你有以下 acc
```
acc: root@local
pw: root-local

acc: root@%
pw: root-% 
```

- 在 1.1.1.1/phpmyadming 中是不能以 root@% 登入
- DBaever 要以 root@% 登入（當然不可以以 root@local 登入因為沒有權域）
- 在上傳到主機的 conn.php 中的 `password` 一定使用 `root-local`，相信原因同第一點相同

所以最好都是建立了 root@% 後將 root@local 刪除。

### 結論
因為是看了影片和參考資料才開始部署，所以不會有太大的卡闗，反而會查看了部署過程中為什麼要做某些的設定而在網上搜尋。有關 gandi 的設定是參考了 Nicolakacha 同學的文章，謝謝~

參考資料:
[網站部署講解  - Lidemy ](https://lidemy.com/courses/932146/lectures/24344071)
[AWS EC2 部署網站：卡關記錄 & 心得 -By Nicolakacha](https://nicolakacha.coderbridge.io/2020/09/16/launch-website/)
[DNS 設定範例 - gandi](https://news.gandi.net/zh-hant/2020/07/how-not-to-break-your-dns/)

