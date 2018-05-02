/**
* 扩展运算符 ...
*/
// 扩展运算符（spread）是三个点（...）。它好比 rest 参数的逆运算，将一个数组转为用逗号分隔的参数序列。
function push(array, ...items) {
    array.push(...items);
}

console.log(...[1,2,3]);

console.log(1, ...[2,3,4], 5);

[...document.querySelectorAll('div')];
// [<div>, <div>, <div>]

// 扩展运算符主要用于函数调用
const nums = [2,4];
add(...nums);  // 等同于 add(2,4);

// 扩展运算符与正常的函数参数可以结合使用，非常灵活。
const args = [0, 1];
f(-1, ...args, 3,4, ...[6]);

// 扩展运算符后面还可以放置表达式。
const arr = [...(x > 0 ? ['a'] : ['b']), 'c', 'd'];

[...[], 2];  // [2]


/**
* 替代函数的apply方法，Some.func.apply(obj, []);
*/
// 例一
function f(x,y,z) {};
const args = [1,2,3];
// ES5写法
f.apply(null, [1,2,3]);
// ES6写法
f(...args);

// 例二
// ES5写法
Math.max.apply(null, [23,5,78]);
// ES6写法
Math.max(...[23,5,78]);
// 等同于
Math.max(23,5,78);

// 例三
var arr1 = [1,2,3];
var arr2 = [4,5,6];
// ES5写法
Array.prototype.push.apply(arr1, arr2);
// ES6写法
arr1.push(...arr2);

// 例四
// ES5写法
new (Date.bind.apply(Date, [null, 2018, 4, 29]));
// ES6写法
new Date(...[2018, 4, 29]);


/**
* 扩展运算符的应用
*/
// 一、复制数组
// 数组是复合的数据类型，直接复制的话，只是复制了指向底层数据结构的指针，而不是克隆一个全新的数组。
const a1 = [1,2];
const a2 = a1;
a2[1] = 100;  // a2和a1指向同一个引用地址
a1;   // [1, 100]

// ES5写法
const a2 = a1.concat();
// ES6写法
const a2 = [...a1];
// 或者
const [...a2] = a1;


// 二、合并数组
// ES5写法
[1,2].concat([3,4]);
[1,2].concat([3,4], [5,6]);
// ES6写法
[1,2,...[3,40]];
[...[1,2], ...[3,4], ...[5,6]];


// 三、与解构赋值结合
const arr = [1,2,3,4,5];
// ES5写法
const a = arr[0];
const rest = arr.slice(1);
// ES6写法
const [a, ...rest] = arr;
// 如果将扩展运算符用于数组赋值，只能放在参数的最后一位，否则会报错。


// 四、扩展运算符与字符串
// 扩展运算符还可以将字符串转为真正的数组。
[..."hello"];
// ["h", "e", "l", "l", "o"]
// 扩展运算符，能够正确识别四个字节的 Unicode 字符


// 五、扩展运算符实现了 Iterator接口对象
// 任何 Iterator 接口的对象，都可以用扩展运算符转为真正的数组。
let nodeList = document.querySelectorAll('div');
let array = [...nodeList];
// 对于那些没有部署 Iterator 接口的类似数组的对象，扩展运算符就无法将其转为真正的数组。


// 六、Map 和Set结构，Generator函数
// 扩展运算符内部调用的是数据结构的 Iterator 接口，因此只要具有 Iterator 接口的对象，都可以使用扩展运算符，比如 Map 结构。
let map = new Map([
    [1, 'a'],
    [2, 'b'],
    [3, 'c']
]);
let arr = [...map.keys()];   // [1,2,3]

// Generator 函数运行后，返回一个遍历器对象，因此也可以使用扩展运算符。
const go = function*() {
    yield 1;
    yield 2;
    yield 3;
}
[...go()];    // [1,2,3]

// 对非Iterator 接口的对象使用扩展运算符，将会报错。



/**
* 对象的扩展运算符
*/
// 扩展运算符（...）
const [a, ...b] = [1, 2, 3];
b;  // [2, 3]

let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
z;  // { a: 3, b: 4 }

// 解构赋值必须是最后一个参数，否则会报错。

// 解构赋值的拷贝是浅拷贝，即如果一个键的值是复合类型的值（数组、对象、函数）、那么解构赋值拷贝的是这个值的引用，而不是这个值的副本。

let obj = { a: { b: 1 } };
let { ...x } = obj;
obj.a.b = 100;
x.a.b;  // 100


// 对象的扩展运算符（...）用于取出参数对象的所有可遍历属性，拷贝到当前对象之中。这等同于使用Object.assign方法。
let z = { a: 1, b: 2 };
let n = { ...z };
n;   // { a: 1, b: 2 }

// 扩展运算符可以用于合并两个对象。
let ab = { ...a, ...b };
// 等同于
let ab = Object.assign({}, a, b);

// 如果用户自定义的属性，放在扩展运算符后面，则扩展运算符内部的同名属性会被覆盖掉。
let obj = { ...a, x:1, y:2 };
let obj = { ...a, ...{ x:1, y:2 } };
let x=1, y=2, obj = { ...a, x, x };
let obj = Object.assign({}, a, {x:1, y:2});

// 与数组的扩展运算符一样，对象的扩展运算符后面可以跟表达式。
const obj = {
    ...{x > 0 ? {a:1} : {b:2}},
    c: 3
}


// 扩展运算符（...）内部使用的是 for...of循环
