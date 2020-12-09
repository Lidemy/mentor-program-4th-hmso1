## Webpack 是做什麼用的？可以不用它嗎？
Webpack 可以將不同種型的資源（JavaScript，CSS等）打包成一個模組來使用，我們需要它的原因是在 ES6 發佈前，瀏覽器是不能好似 Node.js 以 `export/require` 的方式來輸出和引入模組，而是要以 ` <script> .... </script>` 來引入第三方寫好的程式碼。

例子:
在 Node.js 中使用 `export/requre`
```js
example.js
const example = 'Hello World!'
module.exports = example

main.js
const hello = require('./example.js')
console.log(hello)) //會印出 Hello World!
```
使用者可以自行修改模組的名稱，防止同名 function 出現干擾的情況。

例子：在 html 內引入 jquery 
```html

<!DOCTYPE html>
<html lang="zh-Hans-HK">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>To-Do List</title>
  <script src="https://code.jquery.com/jquery-3.5.1.js"></script> <!-- 引入 jquery -->
</head>
```

以 `<script>....</script>` 來引入程式碼會把變數放在全域變數中，當使用者引用多個程式碼時就有機會發生互相干擾的情況，變得難以管理。因此 webpack 的作用就是將不同的 JS 打包成一個 main.js，在 main.js 內使用者可以用 `export/requre` 來引入模組使用。之後在 index.html 以 ` <script> .... </script>` 來引入 main.js。互相干擾的問題都會在 main.js 中解決，在 index.html 就不會出現問題。
webpack 都有不同的 plugin 去將不同的資料（例如：CSS、圖像）模組化並可以在 main.js 中引入。

在 ES6 發佈後，瀏覽器可以以 `import/export` 來引入模組，不一定要使用到 webpack。
例子:
```js
//example.js
export function sayHello(){
    console.log('Hello World!')
}

//main.js
import { sayHello } from './example.js'

sayHello()
```
```html 
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script type="module" src="./main.js"></script> <!-- 引入 main.js，在 console 中印出 Hello World! -->
</head>
<body>
    
</body>
</html>
```




## gulp 跟 webpack 有什麼不一樣？


## CSS Selector 權重的計算方式為何？

