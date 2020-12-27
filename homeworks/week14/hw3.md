## 什麼是 DNS？Google 有提供的公開的 DNS，對 Google 的好處以及對一般大眾的好處是什麼？
DNS 全名是 Domain Name System，域名系統。它是將我們平時在瀏覧器打的網址對應到代表的 IP address 去傳送 request。因為有太多網址。將所有不同結尾網址（.tw, .com, .us）放在一部 DNS Server 是沒有效率和凌亂，所以 DNS Sever 是以一個樹狀的結構所組成。當我們向 DNS Server 發出要求前，

1. 首先會看我們主機內有沒有之前搜尋過的記錄，如果有就到 Step 6，沒有就向 DNS Server 找
2. 如果 DNS Server 找到就到 Step 6，
3. 如果 DNS Server 找不到就向上一層的 DNS 找
4. 上一層的 DNS 不知道網址就去 Step 3。如果知道在它旗下的某部 DNS 主機有該記錄並導向我們去找該主機
5. 向該主機查詢網址的 IP address
6. 向 IP address 發出 request

##### Google 提供的公開的 DNS 對 Google 的好處
- 收集使用者的數據

##### Google 提供的公開的 DNS 對 一般大眾的好處
-更快可以找到到的 IP address 因為 Google 會在 TTL 過期前重新快取一次，所以等待的時間會減少
- 在不同地方都有 DNS Server 應付因為大量使用者向 DNS 查詢時出現的 overload 問題
- 能防止 DoS 攻擊，避免因為 DoS 引起的 DNS Server overload 的問題

## 什麼是資料庫的 lock？為什麼我們需要 lock？
lock 的意思是在完成 query 前不可以對 row/table 作出其他的 query，lock 的重要性是防止 race condition 的出現，race condition 代表有二個 query 以一個好接近的時間到達 server，server 個同時處理這 2 個 query，引起 server 的衝突。最常的地方會是搶購，如果沒有 lock 就會發生超賣的情況。
lock 因為防止了同時對某條記錄作出修改，所以會減低 Server 效能。

## NoSQL 跟 SQL 的差別在哪裡？
SQL 中 table 和 table 是會有關連的。例如我們想記錄購買記錄，我們會有 2 個 table：客戶資料，購買記錄

客戶資料
| id | 帳號  | 密碼        | 創號日期        |
| -- |:-----:|:----------:|:---------: |
| 1  | hello | ssakler123 | 2020-01-01 |
| 2  | world | 1qertdzs46 | 2020-02-01 |
| 3  | abcde | asdfer8972 | 2020-03-01 |

購買記錄
| id | 客戶 id | 購買項目        |購買日期     |
| -- |:-------:|:--------------:|-----------:|
| 1  | 1       | GTAV           | 2020-01-01 |
| 2  | 1       | Cyberpunk 2077 | 2020-08-25 |
| 3  | 3       | Witcher 3      | 2020-03-01 |

購買記錄的客戶 id 是同客戶資料中的 id 有關連的，可以透過 JOIN table 的方式去它們串起來。NoSQL 每一個 table 都是獨立的，不同 SQL 一樣有闗連性。 NoSQL 中資料是以 key-value 的格式存入資料庫，例如：
```
{id: '1', action='UPDATE', success='true'}
```
NoSQL 適合用來儲存結構不固定的資料。

## 資料庫的 ACID 是什麼？
Transaction 是為了確保當牽扯到多個 Query 的操作時 Query 一定會是全部成功或者全部失敗，這一部份的應用會識用到轉帳，購買多個產品。Transaction 雖然確保了 query 組合的結果是一致成功或失敗，但我們需要用 ACID 來確保 Query 組合的正確性。
```
Atomicaity 原子性：全部成功或是全部失敗，Transaction 的特性
Consistency 一致性：維持資料的一致性，如果是錢的話就是 in 的錢 = out 的錢
Isolation 隔離性：Query 期間除了 Query 組合外，資料不應該使到其他 Query 影響，可以在 Transaction 中使用 Lock 
Durability 持久性：Query 完成後資料不會消失
```
