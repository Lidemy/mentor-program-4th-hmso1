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

在 ES6 發佈後，瀏覽器可以以 `import/export` 來引入 JS 模組，不一定要使用到 webpack。
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
gulp 是一個 task manager，它可以為不同的資源做處理，例如：將程式檔做 minify、將圖片做壓縮……。gulp 本身是沒有帶有模組化的概念（雖然 gulp 都有 webpack 做到模組化的效果），它只是將你已一早編寫好的 task 完成。 webpack 是一個打包資料成為模組化的工具，它出現的原因是處理原身瀏灠器不能做到 `requre/export` 的功能。在 webpack 中你可以安裝不同的 Plugin 使打包成模組前將程式好像 gulp 一樣進行預處理。但 webpack 的重點是資源模組化而不是預處理程式碼。


## CSS Selector 權重的計算方式為何？
CSS Selector 權重的大小是 `ID > Class > Element`。偽元素（例如：`:hover, :nth-child`）和屬性選擇器（例如：`[type:checkbox]`）的權重都和 `Class`一樣。

例子 1：
```html
<!-- index.html -->
<body>
  <h1 class="special" id="uniq">I am an H1</h1>
</body>
```
```css
/* index.css */
h1 {color: red}            /*權重值(0, 0, 1)*/
body h1 {color: green}     /*權重值(0, 0, 2)*/
h1.special { color: blue}  /*權重值(0, 1, 1)*/
#uniq{ color: orange}      /*權重值(1, 0, 0) 權重最大*/
```

例子 2：
```html
<!-- index.html -->
<main class="test fun">
  <div>
    <h1>I am an H1</h1>
    <h2>I am an H2</h2>
    <h2>I am an H2</h2>
  </div>
</main>
```
```css
/* index.css */
.test div > h2 { color: green;}   /*權重值(0, 1, 2)*/
.fun h1 ~ h2 { color: red;}     /*權重值(0, 1, 2) 以後面所宣告的 css 作渲染結果*/
```
相同的權重下，會以後面所宣告的 css 作渲染結果

有兩種 CSS 比 CSS Selector 的權重大分別是 `inline CSS` 和 `!important`。以這兩種 CSS 中 `!important` 的權重是最高，因為沒有方法去蓋掉所以都會避免使用。

credit: 
1. [例子出處](https://ithelp.ithome.com.tw/articles/10221486)
2. [Day20：小事之 CSS 權重 (css specificity)](https://ithelp.ithome.com.tw/articles/10196454)