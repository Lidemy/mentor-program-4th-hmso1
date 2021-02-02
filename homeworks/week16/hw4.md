``` js
const obj = {
  value: 1,
  hello: function() {
    console.log(this.value)
  },
  inner: {
    value: 2,
    hello: function() {
      console.log(this.value)
    }
  }
}
  
const obj2 = obj.inner
const hello = obj.inner.hello
obj.inner.hello() // ??
obj2.hello() // ??
hello() // ??
```
obj.inner.hello() 可以轉換成 call 的形式來看
`obj.inner.hello() = obj.inner.hello.call(obj.inner)` 所以 this 的值會是 obj.inner，最後會印出 2

obj2.hello() 轉換成 call 的形式來看 `obj2.hello() = obj2.hello.call(obj2) = obj2.hello.call(obj.inner)` 所以和上一題一樣印出 2

hello() 轉成 call 的形式來看會是 hello.call(undefined)，所以會印出 undefined