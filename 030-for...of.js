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
