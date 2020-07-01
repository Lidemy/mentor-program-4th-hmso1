## hw1：好多星星
因為是上週 printstar 的加強版，所以只需要加多一個 function 去決定每行要印多才粒星星，用了函式填空法來避過了雙層回圈

## hw2：水仙花數
這個因為看過幾遍 ALG101 的 video 所以都沒有問題。
用了數字的方式去完成，發覺 eslint 不准許改寫 function 的輸入，需要 assign 輸入到一個新的變數。

## hw3：判斷質數
需要想到 edge case 要如何處理和小心要在 function 最後才 return true 不要在判斷式中 return true，否則檢測會有漏。

## hw4：判斷迴文
需要用到 for loop，很多時都係 i=0 開始跑，因為今次是由字串尾跑到字串頭，所以 for loop 的開始和結尾位置都試了幾次才成功。

## hw5：聯誼順序比大小
因為輸入的數字會大過 JS MAX_SAFE_INTEGER，所以用了 BigInt() 解決，但在 esline 中好似不知道什麼是 BigInt()，要求 define，最後用了 eslint-disable 去解決。但不明白為何 eslint 需要 define BigInt()