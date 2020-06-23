function capitalize(str) {
    result = ''
    
    // get the first char ASCII code
    var firstCharCode = str.charCodeAt(0)
    
    if(firstCharCode >= 97 && firstCharCode <= 122){
        result = String.fromCharCode(firstCharCode - 32)
    } else {
        result += str[0]
    }

    result += str.slice(1)
    
    /*
    for(var i=1; i<str.length; i++){
        result += str[i]
    }
    */

    return result
}

console.log(capitalize('nick'));
