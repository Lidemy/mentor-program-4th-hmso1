/*
1. 找出陣列的中位數，檢查是否等於 n
2. 是，回傳 n 的位置
3. 
4. 判斷 n 是否 > 中位數 && 右陣列數值是否不等於空陣列
5. 是，將右陣列和目標數值傳到 step 1
6. 否，判斷 n 是否 < 中位數 && 左陣列數值是否不等於空陣列
7. 是，將左陣列和目標數值傳到 step 1
8. 否，return -1
*/

console.time('process');

function search(arr, n) {
    for(var i=0; i<arr.length; i++) {
      if (arr[i] === n) return i
    }
    return -1
}

// var location = 0
// var notFound = false
// function splitArray(oldArr, k){
//   var arr1 = oldArr.slice(0, k)
//   var arr2 = oldArr.slice(k+1)
//   return {'leftArr': arr1,  'rightArr': arr2}
// }

// function search(arr, n){
//   var arrMiddle = Math.floor(arr.length / 2)
  
//   if (arr[arrMiddle] === n) {
//     return arrMiddle
//   }

//   newArr = splitArray(arr, arrMiddle)
//   if (n > arr[arrMiddle] && newArr.rightArr !== []) {
//     location = arrMiddle + 1 + search(newArr.rightArr, n)
//   } else if (n < arr[arrMiddle] && newArr.leftArr !== []) {
//     location = search(newArr.leftArr, n)
//   } else {
//     notFound = true
//   }

//   return(notFound === true ? -1 : location)
// }

console.log(search([1,2,3,4,5],6))
// notFound = false
console.log(search([1,2,3,4,5],5))
// notFound = false
console.log(search([1,2,3,4,5],1))
console.timeEnd('process');



// var readline = require('readline');

// var lines = []
// var rl = readline.createInterface({
//   input: process.stdin
// });

// rl.on('line', function (line) {
//   lines.push(line)
// });

// rl.on('close', function() {
//   solve(lines)
// })

// function search(arr, n) {
//     for(var i=0; i<arr.length; i++) {
//       if (arr[i] === n) return i
//     }
//     return -1
// }

// var location = 0
// var notFound = false
// function splitArray(oldArr, k){
//   var arr1 = oldArr.slice(0, k)
//   var arr2 = oldArr.slice(k+1)
//   return {'leftArr': arr1,  'rightArr': arr2}
// }

// function search(arr, n){
//   var arrMiddle = Math.floor(arr.length / 2)
  
//   if (arr[arrMiddle] === n) {
//     return arrMiddle
//   }

//   newArr = splitArray(arr, arrMiddle)
//   if (n > arr[arrMiddle] && newArr.rightArr !== []) {
//     location = arrMiddle + 1 + search(newArr.rightArr, n)
//   } else if (n < arr[arrMiddle] && newArr.leftArr !== []) {
//     location = search(newArr.leftArr, n)
//   } else {
//     notFound = true
//   }

//   return(notFound === true ? -1 : location)
// }

// function solve(lines) {
//     var temp = lines[0].split(' ')
//     var originArr = []
//     var target = []

//     for(i=1; i<=temp[0]; i++){
//       originArr.push(Number(lines[i]))
//     }
    
//     for(i=Number(temp[0])+1; i<lines.length; i++){
//       target.push(Number(lines[i]))
//     }

//     for(var i=0; i<target.length; i++){
//       notFound = false
//       console.log(search(originArr, target[i]))
//     }
// }