/**
* 什么是 Iterator遍历器？
*/

// JavaScript 原有的表示“集合”的数据结构，主要是数组（Array）和对象（Object），ES6 又添加了Map和Set。这样就有了四种数据集合，用户还可以组合使用它们，定义自己的数据结构，比如数组的成员是Map，Map的成员是对象。这样就需要一种统一的接口机制，来处理所有不同的数据结构。

// 遍历器（Iterator）就是这样一种机制。它是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署 Iterator 接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）。




/**
* Iterator的三个作用
*/
// 一是为各种数据结构，提供一个统一的、简便的访问接口；

// 二是使得数据结构的成员能够按某种次序排列；

// 三是 ES6 创造了一种新的遍历命令for...of循环，Iterator 接口主要供for...of消费。




/**
* Iterator的遍历过程是怎样的？
*/
// （1）创建一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上，就是一个指针对象。

// （2）第一次调用指针对象的next方法，可以将指针指向数据结构的第一个成员。

// （3）第二次调用指针对象的next方法，指针就指向数据结构的第二个成员。

// （4）不断调用指针对象的next方法，直到它指向数据结构的结束位置。

// 每一次调用next方法，都会返回数据结构的当前成员的信息。具体来说，就是返回一个包含value和done两个属性的对象。其中，value属性是当前成员的值，done属性是一个布尔值，表示遍历是否结束。


// 模拟实现
var it = makeIterator(['a', 'b']);  // 创建遍历器指针对象
it.next();  // { value: 'a', done: false }
it.next();  // { value: 'b', done: false }
it.next();  // { value: undefined, done: true }

function makeIterator(arr) {
    var nextIdx = 0;
    return {
        next: function() {
            return nextIdx < arr.length ? { value: arr[nextIdx++], done: false } : { value: undefined, done: true};
        }
    }
}



/**
* 默认 Iterator接口
*/
// Iterator 接口的目的，就是为所有数据结构，提供了一种统一的访问机制，即for...of循环（详见下文）。当使用for...of循环遍历某种数据结构时，该循环会自动去寻找 Iterator 接口。

// 一种数据结构只要部署了 Iterator 接口，我们就称这种数据结构是“可遍历的”（iterable）。

// ES6 规定，默认的 Iterator 接口部署在数据结构的Symbol.iterator属性，或者说，一个数据结构只要具有Symbol.iterator属性，就可以认为是“可遍历的”（iterable）。Symbol.iterator属性本身是一个函数，就是当前数据结构默认的遍历器生成函数。执行这个函数，就会返回一个遍历器。至于属性名Symbol.iterator，它是一个表达式，返回Symbol对象的iterator属性，这是一个预定义好的、类型为 Symbol 的特殊值，所以要放在方括号内。

// ES6 的有些数据结构原生具备 Iterator 接口（比如数组），即不用任何处理，就可以被for...of循环遍历。原因在于，这些数据结构原生部署了Symbol.iterator属性，另外一些数据结构没有（比如对象）。凡是部署了Symbol.iterator属性的数据结构，就称为部署了遍历器接口。调用这个接口，就会返回一个遍历器对象。

// 原生具备 Iterator 接口的数据结构如下，它们都可以使用 for...of 进行遍历
/*
    Map
    Set
    String
    Array
    TypedArray
    函数的 arguments 对象
    NodeList 对象
*/
// 对象（Object）没有默认部署 Iterator 接口，所以对象不能使用 for...of进行遍历
// xxx[Symbol.iterator]() 用于获取遍历器的指针对象

let arr = [1,2,3];
let it = arr[Symbol.iterator]();  // 获取遍历器指针对象
it.next();  // {value: 1, done: false}
it.next();  // {value: 2, done: false}
it.next();  // {value: 3, done: false}
it.next();  // {value: undefined, done: true}



/**
* for...of遍历、while遍历
*/
var arr = [1,2,3];

// for...of遍历
for(let ele of arr) {
    console.log(ele);
}
// while遍历
var it = arr[Symbol.iterator]();   // 获取遍历器的指针对象
var res = it.next();
while (!res.done) {
    console.log(res.value);
    res = it.next();
}



/**
* 哪些场合下会默认调用Iterator接口（Symbol.iterator）？
*/
/*
    for...of遍历时
    解构赋值时
    使用扩展运算符时
    yield* 时
    Array.from()
    Map(), Set(), WeakMap(), WeakSet()（比如new Map([['a',1],['b',2]])）
    Promise.all()
    Promise.race()
*/



/**
* 字符串的 Iterator接口
*/
var str = 'geekxia';
typeof str[Symbol.iterator];   // 'function'

var it = str[Symbol.iterator]();  // 创建遍历器指针对象
it.next();   // { value: 'g', done: false }

// 修改 遍历器接口 Symbol.iterator方法，修改遍历器的默认行为
str[Symbol.iterator] = function() {
    return {
        next: function() {
            // 自定义的遍历行为
        }
    }
}




/**
* Iterator 接口与 Generator 函数
*/
// 使用 Generator 函数，实现遍历器接口的Symbol.iterator方法
let myIterable = {
    [Symbol.iterator]: function* () {
        yield 1;
        yield 2;
        yield 3;
    }
};
[...myIterable];   // [1,2,3]

// 另一种写法
let obj = {
    * [Symbol.iterator]() {
        yield 'hello';
        yield 'world';
    }
};
for(let x of obj) {
    console.log(x);
}
// 'hello'
// 'world'




/**
* 遍历器对象的 return()，throw()
*/
// 遍历器对象除了具有next方法，还可以具有return方法和throw方法。如果你自己写遍历器对象生成函数，那么next方法是必须部署的，return方法和throw方法是否部署是可选的。

function readLineSync(file) {
    // 返回一个可遍历的对象，即部署了Symbol.iterator属性的对象
    return {
        [Symbol.iterator]() {
            // 返回一个遍历器对象
            return {
                next() {
                    // 自定义next()
                },
                return() {
                    // 自定义return()
                }
            }
        }
    }
};
