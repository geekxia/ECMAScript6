// ES6 借鉴 C++、Java、C# 和 Python 语言，引入了for...of循环，作为遍历所有数据结构的统一方法。


// 一个数据结构只要部署了Symbol.iterator属性，就被视为具有 iterator 接口，就可以用for...of循环遍历它的成员。也就是说，for...of循环内部调用的是数据结构的Symbol.iterator方法。


// for...of循环可以使用的范围包括数组、Set 和 Map 结构、某些类似数组的对象（比如arguments对象、DOM NodeList 对象）、Generator 对象，以及字符串。




/**
* for...of 遍历数组
*/
// 数组原生具备iterator接口（即默认部署了Symbol.iterator属性），for...of循环本质上就是调用这个接口产生的遍历器，可以用下面的代码证明。

const arr ['red', 'green', 'blue'];
for (let v of arr) {
    console.log(v);  // red  green  blue
}

const obj = {};
obj[Symbol.iterator] = arr[Symbol.iterator].bind(arr);
for (let o of obj) {
    console.log(o);  // red  green  blue
}


// for...of循环可以代替数组实例的forEach方法。

// for...in循环读取键名，for...of循环读取键值。




/**
* for...of 遍历 Map 和 Set 结构
*/
// Set 和 Map 结构也原生具有 Iterator 接口，可以直接使用for...of循环。
var engines = new Set(["Gecko", "Trident", "Webkit", "Webkit"]);
for (var e of engines) {
  console.log(e);
}
// Gecko
// Trident
// Webkit

var es6 = new Map();
es6.set("edition", 6);
es6.set("committee", "TC39");
es6.set("standard", "ECMA-262");
for (var [name, value] of es6) {
  console.log(name + ": " + value);
}
// edition: 6
// committee: TC39
// standard: ECMA-262




/**
* for...of 遍历 数组/Map/Set 之 keys()/values()/entries() 返回的对象
*/
// 数组、Set、Map 都部署了keys()/values()/entries()三个方法，调用这三个方法后都返回遍历器对象。使用 for...of 可以遍历它们的返回结果。

let arr = ['a', 'b', 'c'];
for (let pair of arr.entries()) {
  console.log(pair);
}
// [0, 'a']
// [1, 'b']
// [2, 'c']




/**
* for...of 遍历字符串
*/
let str = 'hello';

for (let s of str) {
    console.log(s);   // h  e  l  l  o
}





/**
* for...of 遍历 NodeList对象
*/
let opArr = document.querySelectorAll('p');

for(let p of opArr) {
    p.classList.add('on');
}




/**
* for...of 遍历 arguments对象
*/
function printArgs() {
    for (let x of arguments) {
        console.log(x);
    }
}
printArgs('a', 'b');
// 'a'
// 'b'



/**
* for...of 遍历 非 Iterator 的类数组对象
*/
// 并不是所有类似数组的对象都具有 Iterator 接口，一个简便的解决方法，就是使用Array.from方法将其转为数组。
let arrayLike = { length: 2, 0: 'a', 1: 'b' };

// 报错
for (let x of arrayLike) {
  console.log(x);
}

// 正确
for (let x of Array.from(arrayLike)) {
  console.log(x);
}




/**
* for...of 遍历 对象
*/
// 对于普通的对象，for...of结构不能直接使用，会报错
// 使用 for...in 可以遍历对象的键名
let obj = {
    a: 1,
    b: 2,
    c: 3
}

for (let e in obj) {
    console.log(e);  // 'a'  'b'  'c'
}
// 总之，for...in循环主要是为遍历对象而设计的，不适用于遍历数组。

// 一种解决方法是，使用Object.keys方法将对象的键名生成一个数组，然后再用 for...of 遍历这个数组。
for(let key of Object.keys(obj)) {
    console.log(key + ': ' + obj[key]);
}

// 另一个方法是使用 Generator 函数将对象重新包装一下。
function* entries(obj) {
    for(let key of Object.keys(obj)) {
        yield [key, obj[key]];
    }
}
for(let [key, value] of entries(obj)) {
    console.log(key, '->', value);
}



/**
* for...of 可以与 break / continue / return 配合使用
*/
for (var n of arr) {
    if (n > 10) {
        break;
    }
    console.log(n);
}
