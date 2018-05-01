/**
* Array.from()
*/
// Array.from方法用于将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象（包括 ES6 新增的数据结构 Set 和 Map）。

let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
}

// ES5写法
var arr = [].slice.call(arrayLike); // ['a', 'b', 'c']
// ES6写法
var arr = Array.from(arrayLike);   // ['a', 'b', 'c']

// DOM 操作返回的 NodeList 集合，以及函数内部的arguments对象，Array.from都可以将它们转为真正的数组。
let pList = document.querySelectorAll('p');
Array.from(pList).filter(p=>{
    return p.textContent.length > 50;
});

function foo() {
    var args = Array.from(arguments);
}

// 只要是部署了 Iterator 接口的数据结构，Array.from都能将其转为数组。
Array.from('hello');
// ['h', 'e', 'l', 'l', 'o']

let nameSet = new Set(['a', 'b']);
Array.from(nameSet);
// ['a', 'b']

// 值得提醒的是，扩展运算符（...）也可以将某些数据结构转为数组。

// 扩展运算符背后调用的是遍历器接口（Symbol.iterator），如果一个对象没有部署这个接口，就无法转换。Array.from方法还支持类似数组的对象。所谓类似数组的对象，本质特征只有一点，即必须有length属性。因此，任何有length属性的对象，都可以通过Array.from方法转为数组，而此时扩展运算符就无法转换。


/**
* Array.of()
*/
// Array.of方法用于将一组值，转换为数组。
// Array.of总是返回参数值组成的数组。如果没有参数，就返回一个空数组。
Array.of(1,2);  // [1, 2]
Array.of();     // []
Array.of(undefined);  // [undefined]

// 模拟实现
function ArrayOf() {
    return [].slice.call(arguments);
}



/**
* copyWithin()
*/
// 数组实例的copyWithin方法，在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组。也就是说，使用这个方法，会修改当前数组。
[1,2,3,4,5].copyWithin(0,3);
// [4,5,3,4,5]
[1, 2, 3, 4, 5].copyWithin(0, 3, 4)
// [4, 2, 3, 4, 5]


/**
* find()  /  findIndex()
*/
// 数组实例的find方法，用于找出第一个符合条件的数组成员。它的参数是一个回调函数，所有数组成员依次执行该回调函数，直到找出第一个返回值为true的成员，然后返回该成员。如果没有符合条件的成员，则返回undefined。
[1,2,-5,10].find((ele,index,arr) => ele < 0);
// -5

// 数组实例的findIndex方法的用法与find方法非常类似，返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回-1。
[1,5,10,15].findIndex((ele,index,arr) => ele > 9);
// 2

// 这两个方法都可以接受第二个参数，用来绑定回调函数的this对象。

// 另外，这两个方法都可以发现NaN，弥补了数组的indexOf方法的不足。
[NaN].indexOf(NaN);   // -1
[NaN].findIndex(y => Object.is(NaN, y));  // 0


/**
* fill()
*/
// fill方法使用给定值，填充一个数组。
[1,2,3].fill(7);
// [7,7,7]
new Array(4).fill(7);
// [7,7,7,7]

// fill方法还可以接受第二个和第三个参数，用于指定填充的起始位置和结束位置。
[1,2,3].fill(7,1,2);
// [1,7,2]

// 如果填充的元素类型为对象，那么被赋值的是同一个内存地址的对象，而不是深拷贝对象。
let arr = new Array(3).fill({name: 'geek'});
// [{name: 'geek'}, {name: 'geek'}, {name: 'geek'}]
arr[0].name = 'xia';
// [{name: 'xia'}, {name: 'xia'}, {name: 'xia'}]


/**
* entries() / keys() / values()
*/
// ES6 提供三个新的方法——entries()，keys()和values()——用于遍历数组。它们都返回一个遍历器对象，可以用for...of循环进行遍历，唯一的区别是keys()是对键名的遍历、values()是对键值的遍历，entries()是对键值对的遍历。
const arr = ['a', 'b'];
for(let index of arr.keys()) {
    console.log(index);
}
// 0
// 1

for(let value of arr.values()) {
    console.log(value);
}
// 'a'
// 'b'

for(let [index, value] of arr.entries()) {
    console.log(index, value);
}
// 0, 'a'
// 1, 'b'

// 如果不使用for...of循环，可以手动调用遍历器对象的next方法，进行遍历。
let entries = ['a', 'b'].entries();
entries.next().value;  // [0, 'a']
entries.next().value;  // [1, 'b']



/**
* includes()
*/
// 表示某个数组是否包含给定的值，返回布尔值
[1,2,3].includes(2);  // true
[1,2,3].includes(3, 3); // false

// 另外，Map 和 Set 数据结构有一个has方法，需要注意与includes区分。

// Map 结构的has方法，是用来查找键名的，比如Map.prototype.has(key)、WeakMap.prototype.has(key)、Reflect.has(target, propertyKey)。

// Set 结构的has方法，是用来查找值的，比如Set.prototype.has(value)、WeakSet.prototype.has(value)。


/**
* 数组的空位
*/
// 数组的空位指，数组的某一个位置没有任何值。空位不是undefined，一个位置的值等于undefined，依然是有值的。空位是没有任何值，in运算符可以说明这一点。
Array(3);    // [ , , ]
0 in [undefined, undefined, undefined];   // true
0 in [ , , ];   // false

// 由于空位的处理规则非常不统一，所以建议避免出现空位。
