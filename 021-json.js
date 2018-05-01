/**
* 属性的简洁表示法
*/
// ES6 允许直接写入变量和函数，作为对象的属性和方法。这样的书写更加简洁。
const foo = 'geek';
const json1 = {
    foo,
    f() {
        return 'hello';
    }
}

function f(x, y) {
    return {
        x,
        y
    }
}

// CommonJS 模块输出一组变量，就非常合适使用简洁写法。
let ms = {};
function getItem (key) {
    return key in ms ? ms[key] : null;
}
function setItem (key, value) {
    ms[key] = value;
}
function clear() {
    ms = {};
}
module.exports = { getItem, setItem, clear };


/**
* 属性名表达式、方法名表达式
*/
let propKey = 'foo';
let obj = {
    [propKey]: true,
    ['a' + 'bc']: 123,
    ['h' + 'ello'] () {
        return 'hello geek';
    }
}


/**
* 方法的 name属性
*/
// 函数的name属性，返回函数名。对象方法也是函数，因此也有name属性。
// 两种特殊情况：bind方法创造的函数，name属性返回bound加上原函数的名字；Function构造函数创造的函数，name属性返回anonymous。
(new Function()).name // "anonymous"

var doSomething = function() {};
doSomething.bind().name // "bound doSomething"

// 如果对象的方法是一个 Symbol 值，那么name属性返回的是这个 Symbol 值的描述。
const k1 = Symbol('description');
const k2 = Symbol();
let obj = {
    [k1]() {},
    [k2]() {}
}
obj[k1].name;   // '[description]'
obj[k2].name;   // ''
