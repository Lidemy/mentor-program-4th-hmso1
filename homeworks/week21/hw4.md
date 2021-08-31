## 為什麼我們需要 React？可以不用嗎？

1. React 將畫面的切成不同細小的 component，易於管理維護，也方便重覆使用。
2. 網頁的變數都被 React 控制，當有改變時會以資料 update 畫面，可以保持一致性。

React 只是一個 JavaScript 的 library，就好似其他 library 一樣，我們不一定要使用也可以寫出網頁。

## React 的思考模式跟以前的思考模式有什麼不一樣？

以前會將檔案分為 HTML, CSS, JS 去管理，但在 React component 入面，因為有 Babel 做轉換，HTML, CSS, JS 可以寫在一齊，覺得這個設計很方便，不需要在維護或更改時四處尋回程式碼。

在以前用純 JS 或 jQuery 寫程式時，思考模式會是較直覺一歩一步去處理畫面與資料，例如：刪除 todo list 入面的 todo 事項時：
在使用純 JS 或 jQuery 時：

1. 向上層直到找到 `<li>`
2. 將 `<li>` 刪除
3. 如果資料是儲存在 localStorage 就將 localStorage 更新

React 的宗旨是以資料 render 畫面，所以所有 todo 資料會受到 React 所管理。當想刪除 todo 事項，只要在 todo 資料中 filter 走不要的事項， React 就會根據新的 todo 資料重新 render 畫面。對比純 JS 或 jQuery 分開處理資料與畫面的改變，在 React 中我們要考慮的會是資料如何改變以及資料與畫面的聯繫。
在 React 建議所有資料（會改變畫面的）都應該被控制包括 `<input>`，以保持資料畫面一致性。

## state 跟 props 的差別在哪裡？

在 React component 中使用 state 去建立一個由 React 所控制的變數，建立後的變數要使用 setState function 才可以改變。大部份 state 都應該放在母層以方便管理。
如果子層 component 有變數需要 React 去控制時，會由母層建立 state 再用 props 將 state 傳遞到子層去。
例子：

```js
function Input(props) {
  return <input type="text" value={props.value} />;
}

function App() {
  const [value, setValue] = useState("");

  return <Input value={value} />;
}
```

子層不應該直接改 props.value 的值，如果子層要改變 props.value, 將 function 寫在母層上再經 props 傳遞下去
例子：

```js
function Input(props) {
  return <input type="text" value={props.value} onChange={handleChange} />;
}

function App() {
  const [value, setValue] = useState("");

  const handleChange = (e) => setValue(e.target.value);
  return <Input value={value} handleChange={handleChange} />;
}
```

所以 props 就是一個母層和子層的溝通途徑，將 state 或 function 傳遞到子層中。
