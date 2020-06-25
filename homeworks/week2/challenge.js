/*
1. 設定陣開始變數等 0，結束變數等於陣列總數 - 1
2. while (當結束位置 - 開始位置 > 0)
3. 找出陣列的中位數位置，檢查該位置元素是否等於 n 
4. 是，return 中位數的位置
5. 不是，判斷 n 是否大過中位數
6. 是，陣列的開始變為中位數位置 +1，結束不變
7. 回到 step 2
8. 不，陣列的開始不變，結束變為中位數位置 -1
9. 回到 step 2
10. 完成 while loop, return -1
*/ 

function search(arr, n) {
  var start = 0
  var end = arr.length - 1

  while((end - start) > 0 ){
    var middle = Math.ceil(end - start)

    if (arr[middle] === n){
      return middle
    }

    (n > arr[middle]) ? start = middle + 1 :  end = middle - 1
  }
  return -1
}

console.log(search([1, 3, 10, 14, 39], 14))
console.log(search([1, 3, 10, 14, 39], 299))