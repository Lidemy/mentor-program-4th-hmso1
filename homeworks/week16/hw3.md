``` js
var a = 1
function fn(){
  console.log(a)
  var a = 5
  console.log(a)
  a++
  var a
  fn2()
  console.log(a)
  function fn2(){
    console.log(a)
    a = 20
    b = 100
  }
}
fn()
console.log(a)
a = 10
console.log(a)
console.log(b)
```

當開始執行程式碼時，會建立 Global 的 Execution Context，當進入一個 function 又會建立一個 EC 在現有 EC 之上，所有 EC 都執行完成就代表程式執行完成。Execution Context 會儲存 Variable Object/Activation Object 和它的 Scope Chain。VO/AO 的初始化是以以下步驟進行：
1. function 傳入 parameter 的數值，如果沒有傳入就記錄成 undefined
2. function 的宣告，如果和之前傳入的 parameter 同名會覆蓋之前的設定。function 的宣告都會帶來 `function.[[Scope]] = EC.scopeChain`
3. 變數的宣告，會將變數宣告成 undefined。如果和之前傳入的 property 同名就忽視

Scope Chain 的宣告是 `[AO, [[Scope]]]`

1. 首先我們開始執行程式，建立 Global 的 Execution Context
```
Global EC {
  fn: function,
  a: undefined
  scopeChain : [glocalEC.VO]
}
fn.[[Scope]] = globalEC.scopeChain = [glocalEC.VO]
```

2. 執行 a = 1，更改 Global.VO a 的值
```
Global EC {
  fn: function,
  a: 1
  scopeChain : [glocalEC.VO]
}
fn.[[Scope]] = globalEC.scopeChain = [glocalEC.VO]
```

2. 進入 fn()，建立 fn 的 EC
```
fn EC {
  AO: {
    a: undefined,
    fn2: function,
  },
  scopeChain : [fn.AO, fn.[[Scope]]] = [fn.AO, glocalEC.VO]
}
fn2.[[Scope]] = fnEC.scopeChain = [fn.AO, glocalEC.VO]

}
Global EC {
  VO: {
    fn: function,
    a: 1
  },
  scopeChain : [glocalEC.VO]
}
fn.[[Scope]] = globalEC.scopeChain = [glocalEC.VO]
```
3. 執行 console.log(a)。根據 fn EC, a 會是 undefined。

畫面 
```
undefined
```
4. 執行 var a = 5，fn EC 內的 a 會變成 5
```
fn EC {
  AO: {
    a: 5,
    fn2: function,
  },
  scopeChain : [fn.AO, fn.[[Scope]]] = [fn.AO, glocalEC.VO]
}
fn2.[[Scope]] = fnEC.scopeChain = [fn.AO, glocalEC.VO]

}
Global EC {
  VO: {
    fn: function,
    a: 1
  },
  scopeChain : [glocalEC.VO]
}
fn.[[Scope]] = globalEC.scopeChain = [glocalEC.VO]
```
5. 執行 console.log(a) 會印出 fn EC 內的 a，所以 a 是 5

畫面 
```
undefined
5
```

6. 執行 a++，a 會由 5 變成 6
```
fn EC {
  AO: {
    a: 6,
    fn2: function,
  },
  scopeChain : [fn.AO, fn.[[Scope]]] = [fn.AO, glocalEC.VO]
}
```

7. 執行 var a，但因為 a 已經在之前宣告了，所以可以忽略
8. 進入 fn2()，建立 fn2 的 EC

```
fn2 EC {
  AO:{},
  scopeChain : [fn2.AO, fn2.[[Scope]]] = [fn2.AO, fn.AO, glocalEC.VO]
}

fn EC {
  AO: {
    a: 6,
    fn2: function,
  },
  scopeChain : [fn.AO, fn.[[Scope]]] = [fn.AO, glocalEC.VO]
}
fn2.[[Scope]] = fnEC.scopeChain = [fn.AO, glocalEC.VO]

}
Global EC {
  VO: {
    fn: function,
    a: 1
  },
  scopeChain : [glocalEC.VO]
}
fn.[[Scope]] = globalEC.scopeChain = [glocalEC.VO]
```
9. 執行 console.log(a)，因為 fn2.AO 沒有 a，會以 scopeChain 向上找到 fn.AO 的 a。所以 a 會是 6

畫面 
```
undefined
5
6
```
10. a = 20，同樣地因為 fn2.AO 沒有 a，所以會向上找到 fn.AO 的 a 並將 fn.AO 中 a 的值改為 20
```
fn2 EC {
  AO:{},
  scopeChain : [fn2.AO, fn2.[[Scope]]] = [fn2.AO, fn.AO, glocalEC.VO]
}

fn EC {
  AO: {
    a: 20,
    fn2: function,
  },
  scopeChain : [fn.AO, fn.[[Scope]]] = [fn.AO, glocalEC.VO]
}
fn2.[[Scope]] = fnEC.scopeChain = [fn.AO, glocalEC.VO]

}
Global EC {
  VO: {
    fn: function,
    a: 1
  },
  scopeChain : [glocalEC.VO]
}
fn.[[Scope]] = globalEC.scopeChain = [glocalEC.VO]
```
11. b = 100，因為fn2.AO 沒有 b，跟着 scopeChain 都找不到 b，最終會在 Global.AO 宣告 b = 100
```
fn2 EC {
  AO:{},
  scopeChain : [fn2.AO, fn2.[[Scope]]] = [fn2.AO, fn.AO, glocalEC.VO]
}

fn EC {
  AO: {
    a: 20,
    fn2: function,
  },
  scopeChain : [fn.AO, fn.[[Scope]]] = [fn.AO, glocalEC.VO]
}
fn2.[[Scope]] = fnEC.scopeChain = [fn.AO, glocalEC.VO]

}
Global EC {
  VO: {
    fn: function,
    a: 1,
    b: 100
  },
  scopeChain : [glocalEC.VO]
}
fn.[[Scope]] = globalEC.scopeChain = [glocalEC.VO]
```

12. fn2 執行完成，fn2 的 EC 可以刪除
```
fn EC {
  AO: {
    a: 20,
    fn2: function,
  },
  scopeChain : [fn.AO, fn.[[Scope]]] = [fn.AO, glocalEC.VO]
}
fn2.[[Scope]] = fnEC.scopeChain = [fn.AO, glocalEC.VO]

}
Global EC {
  VO: {
    fn: function,
    a: 1,
    b: 100
  },
  scopeChain : [glocalEC.VO]
}
fn.[[Scope]] = globalEC.scopeChain = [glocalEC.VO]
```
13. 執行 console.log(a)，fn.AO 中 a 的值是 20，所以會印出 20。

畫面 
```
undefined
5
6
20
```

14. fn 執行完畢，fn 的 EC 會刪除
```
Global EC {
  VO: {
    fn: function,
    a: 1,
    b: 100
  },
  scopeChain : [glocalEC.VO]
}
fn.[[Scope]] = globalEC.scopeChain = [glocalEC.VO]
```

15. 執行 console.log(a)，Global.VO 中 a 是 1

畫面 
```
undefined
5
6
20
1
```

16. a = 10 會改變 Global.VO 的值
```
Global EC {
  VO: {
    fn: function,
    a: 10,
    b: 100
  },
  scopeChain : [glocalEC.VO]
}
fn.[[Scope]] = globalEC.scopeChain = [glocalEC.VO]
```

17. 最後執行的 console.log(a) 和 console.log(b) 會印出 Global.VO 的值

畫面 
```
undefined
5
6
20
1
10
100
```