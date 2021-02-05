在瀏覽器中 JaveScript 程式碼會由 main thread 處理，程式碼會放到 main thread 上 call stack 執行。對於一些由 runtime 所提供而不是 JavaScript 原生的程式例如 setTimeout, ajax 等的 WebAPI 就會在 runtime 中處理。當 runtime 完成執行後會把結果放到 callback queue 直到 call stack 是空為至。Event Loop 會不停檢查 call stack 是否空，當 call stack 是空是就負責將 callback queue 的程式碼一個個放到 call stack 上執行。

1. 一開始未執行程式碼時 call stack 和 WebAPI 都是空
<table>
  <tr>
    <td>Call Stack</td>
    <td>WebAPI</td>
  </tr>
  <tr>
    <td style="color:white">空白行</td>
    <td style="color:white">空白行</td>
  </tr>
  <tr>
    <td colspan="2">Callback Queue</td>
  </tr>
   <tr>
    <td colspan="2" style="color:white;">空白行</td>
  </tr>
</table>

2. 執行 console.log(1) 
<table>
  <tr>
    <td>Call Stack</td>
    <td>WebAPI</td>
  </tr>
  <tr>
    <td>console.log(1)</td>
    <td style="color:white">空白行</td>
  </tr>
  <tr>
    <td colspan="2">Callback Queue</td>
  </tr>
   <tr>
    <td colspan="2" style="color:white;">空白行</td>
  </tr>
</table>

畫面
```
1
```
3. 執行 setTimeout，因為 setTimeout 不是 JS 原生，會由 WebAPI 執行。
 <table>
  <tr>
    <td>Call Stack</td>
    <td>WebAPI</td>
  </tr>
  <tr>
    <td></td>
    <td>
      setTimeout(() => {
        console.log(2)
      }, 0)
    </td>
  </tr>
  <tr>
    <td colspan="2">Callback Queue</td>
  </tr>
   <tr>
    <td colspan="2" style="color:white">空白行</td>
  </tr>
</table>

畫面
```
1
```

4. 執行 console.log(3)，WebAPI 的 setTimeout 執行完成放到 callback queue
  <table>
  <tr>
    <td>Call Stack</td>
    <td>WebAPI</td>
  </tr>
  <tr>
    <td>console.log(3)</td>
    <td></td>
  </tr>
  <tr>
    <td colspan="2">Callback Queue</td>
  </tr>
   <tr>
    <td colspan="2">() => {console.log(2)}</td>
  </tr>
</table>

畫面
```
1
3
```

5. 執行 setTimeout，因為 setTimeout 不是 JS 原生，會由 WebAPI 執行。
 <table>
  <tr>
    <td>Call Stack</td>
    <td>WebAPI</td>
  </tr>
  <tr>
    <td></td>
    <td>
      setTimeout(() => {
        console.log(4)
      }, 0)
    </td>
  </tr>
  <tr>
    <td colspan="2">Callback Queue</td>
  </tr>
   <tr>
    <td colspan="2">() => {console.log(2)}</td>
  </tr>
</table>

畫面
```
1
3
```

6. 執行 console.log(3)，WebAPI 的 setTimeout 執行完成放到 callback queue。因為 Step 5 和 Step 6 相距的時間好短，call stack 不算是空。
<table>
  <tr>
    <td>Call Stack</td>
    <td>WebAPI</td>
  </tr>
  <tr>
    <td>console.log(5)</td>
    <td></td>
  </tr>
  <tr>
    <td colspan="2">Callback Queue</td>
  </tr>
    <tr>
    <td colspan="2">() => {console.log(2)} <br> () => {console.log(4)}</td>
  </tr>
</table>

畫面
```
1
3
5
```

7. Call stack 空，將 callback queue 的程式碼交由 main thread 處理
<table>
  <tr>
    <td>Call Stack</td>
    <td>WebAPI</td>
  </tr>
  <tr>
    <td>() => {console.log(2)}</td>
    <td></td>
  </tr>
  <tr>
    <td colspan="2">Callback Queue</td>
  </tr>
    <tr>
    <td colspan="2">() => {console.log(4)}</td>
  </tr>
</table>

<table>
  <tr>
    <td>Call Stack</td>
    <td>WebAPI</td>
  </tr>
  <tr>
    <td>() => {console.log(4)}</td>
    <td></td>
  </tr>
  <tr>
    <td colspan="2">Callback Queue</td>
  </tr>
    <tr>
      <td colspan="2" style="color:white;">空白行</td>
    </tr>
</table>

畫面
```
1
3
5
2
4
```


