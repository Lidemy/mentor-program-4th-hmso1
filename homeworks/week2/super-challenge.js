// 請實作以上函式，回傳 a+b 的結果
// 但是函式裡面不能出現 +-*/ 任何一個符號

/*
1. 檢查 a/b 大，計算較大數值 binary 字串的長度並設定為 maxLen 變數
2. 設一個空陣列 answer 和 addOne 變數為 false
3. 設定變數 i 是 0，檢查 i 是否 < maxLen
4. 將 a, b, addOne 於入一個 result 的 function
    a. 判斷 a&1 和 b&1 是什麼
    b. 如果 a&1 和 b&1 都等於 1, 回傳 {ele:0, bool: true}
    c. 如果 a&1 和 b&1 都等於 0, 回傳 {ele:0, bool: false}
    d. 回傳 {ele:1, bool: addOne}
5. 如果 addOne = false, 將回傳的 ele 加到 answer 陣列的最前
6. 如果 addOne = true,  
    a. 如果回傳的 ele 是 1，將 0 加到 answer 陣列的最前
    b. 如果回傳的 ele 是 0，將 1 加到 answer 陣列的最前
7. addOne 改為 回傳的 bool
8. 將 a = a << 1 和 b = b << 1
9. 檢查 i++ 是否大過 maxLen
10. 否，執行第 4 行
11. 是，檢查 addOne 是否等如 false
12. 否，將 1 加到 answer 陣列的最前
13. 將 answer 陣列串為一個字串並轉回十進位的數字
14. 回傳該數字
*/

function add(a, b) {
    var maxLen = (a > b) ? (a.toString(2).length) : (b.toString(2).length)
    var answer = []
    var addOne = false

    for(var i=0; i<maxLen; i++){
        var result = results(a, b, addOne)

        if(!addOne){
            answer.unshift(result.ele)
        } else {
            (result.ele === 0) ? answer.unshift(1) : answer.unshift(0)
        }

        addOne = result.bool

        a = a >> 1
        b = b >> 1
    }

    if (addOne){
        answer.unshift(1)
    }
    
    return parseInt(answer.join(''), 2)

}

function results(i, j, addOne){

    if ((i&1) === 1 && (j&1) ===1){
        return {'ele': 0, 'bool':true}
    } else if ((i&1) === 0 && (j&1) ===0) {
        return {'ele': 0, 'bool':false}
    } else {
        return {'ele': 1, 'bool':addOne}
    }

}


console.log((add(99, 88)))
console.log(add(200, 999))