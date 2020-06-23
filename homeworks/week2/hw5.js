function join(arr, concatStr) {
    var result = arr[0]

    for(var i=1; i<arr.length; i++){
        result += concatStr + arr[i]
    }

    return result
}

function repeat(str, times) {
  var result = ''

  for(var i=1; i<=times; i++){
      result += str
  }

  return result
}

console.log(join(["a"], ','));
console.log(repeat('yoyo', 2));

