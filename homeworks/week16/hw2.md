``` js
for(var i=0; i<5; i++) {
  console.log('i: ' + i)
  setTimeout(() => {
    console.log(i)
  }, i * 1000)
}
```
1. 第一個迴圈，開始時 i 的值是 0
<table>
  <tr>
    <td>Call Stack</td>
    <td>WebAPI</td>
  </tr>
  <tr>
    <td>console.log('i: ' +  i)</td>
    <td>
      setTimeout(() => {
        console.log(i)
      }, i * 1000)
    </td>
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
i: 0
```
完成第一個迴圈後 i 的值是 1。setTimeout 會等待 0 秒才放到 callback queue 中。

2. 第二個迴圈，開始時 i 的值是 1
<table>
  <tr>
    <td>Call Stack</td>
    <td>WebAPI</td>
  </tr>
  <tr>
    <td>console.log('i: ' +  i)</td>
    <td>
      setTimeout(() => {
        console.log(i)
      }, 1000)
    </td>
  </tr>
  <tr>
    <td colspan="2">Callback Queue</td>
  </tr>
    <tr>
      <td colspan="2">console.log(i)</td>
    </tr>
</table>

畫面
```
i: 0
i: 1
```
完成第二個迴圈後 i 的值是 2。

3. 第三個迴圈，開始時 i 的值是 2
<table>
  <tr>
    <td>Call Stack</td>
    <td>WebAPI</td>
  </tr>
  <tr>
    <td>console.log('i: ' +  i)</td>
    <td>
      setTimeout(() => {
        console.log(i)
      }, 1000) <br>
      setTimeout(() => {
        console.log(i)
      }, 2000)
    </td>
  </tr>
  <tr>
    <td colspan="2">Callback Queue</td>
  </tr>
    <tr>
      <td colspan="2">console.log(i)</td>
    </tr>
</table>

畫面
```
i: 0
i: 1
i: 2
```
完成第三個迴圈後 i 的值是 3。

4. 第四個迴圈，開始時 i 的值是 3
<table>
  <tr>
    <td>Call Stack</td>
    <td>WebAPI</td>
  </tr>
  <tr>
    <td>console.log('i: ' +  i)</td>
    <td>
      setTimeout(() => {
        console.log(i)
      }, 1000) <br>
      setTimeout(() => {
        console.log(i)
      }, 2000) <br>
      setTimeout(() => {
        console.log(i)
      }, 3000)
    </td>
  </tr>
  <tr>
    <td colspan="2">Callback Queue</td>
  </tr>
    <tr>
      <td colspan="2">console.log(i)</td>
    </tr>
</table>

畫面
```
i: 0
i: 1
i: 2
i: 3
```
完成第四個迴圈後 i 的值是 4。

5. 第五個迴圈，開始時 i 的值是 4
<table>
  <tr>
    <td>Call Stack</td>
    <td>WebAPI</td>
  </tr>
  <tr>
    <td>console.log('i: ' +  i)</td>
    <td>
      setTimeout(() => {
        console.log(i)
      }, 1000) <br>
      setTimeout(() => {
        console.log(i)
      }, 2000) <br>
      setTimeout(() => {
        console.log(i)
      }, 3000) <br>
      setTimeout(() => {
        console.log(i)
      }, 4000)
    </td>
  </tr>
  <tr>
    <td colspan="2">Callback Queue</td>
  </tr>
    <tr>
      <td colspan="2">console.log(i)</td>
    </tr>
</table>

畫面
```
i: 0
i: 1
i: 2
i: 3
i: 4
```
完成第五個迴圈後 i 的值是 5。

6. 第六個迴圈，開始時 i 的值是 5。迴圈結束，等待 setTimeout 的程式碼執行完成到 callback queue 
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
      <td colspan="2">console.log(i), console.log(i), console.log(i), console.log(i), console.log(i)</td>
    </tr>
</table>

7. i 的值是 5。call stack 沒有工作，Event Loop 將 callback queue 的程式碼放到 call stack 中。因為全部都是 `console.log(i)`，而 i 的值是 5，所以會全部 `console.log(5)`
```
i: 0
i: 1
i: 2
i: 3
i: 4
5
5
5
5
5
```


