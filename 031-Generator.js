/**
* Generator 基本概念
*/
// Generator 函数是 ES6 提供的一种异步编程解决方案。

// 从语法上讲，可以把Generator 函数理解成是一个状态机，它封装了多个内部状态。执行 Generator 函数会返回一个遍历器对象，也就是说，Generator 函数除了状态机，还是一个遍历器对象生成函数。返回的遍历器对象，可以依次遍历 Generator 函数内部的每一个状态。

// 从形式上讲，Generator 函数是一个普通函数，但是有两个特征。一是，function关键字与函数名之间有一个星号；二是，函数体内部使用yield表达式，定义不同的内部状态（yield在英语里的意思就是“产出”）。

function* hwGenerator() {
    yield 'hello';
    yield 'world';
    return 'ending';
}
// 上述 hwGenerator函数，内部有两个 yield 和 一个 return，所以这个函数有三个状态，分别是 hello / world / ending。


/**
* Generator 函数的返回值 与 执行过程
*/
// Generator 函数的调用与普通函数一样，也是在函数名后面加上一对圆括号。不同的是，调用 Generator 函数后，该函数并不执行，返回的也不是函数运行结果，而是一个指向内部状态的指针对象，也就是上一章介绍的遍历器对象（Iterator Object）。

// 下一步，必须调用遍历器对象的next方法，使得指针移向下一个状态。也就是说，每次调用next方法，内部指针就从函数头部或上一次停下来的地方开始执行，直到遇到下一个yield表达式（或return语句）为止。换言之，Generator 函数是分段执行的，yield表达式是暂停执行的标记，而next方法可以恢复执行。

var hwIterator = hwGenerator();  // 返回一个遍历器指针对象
hwIterator.next();  // { value: 'hello', done: false }
hwIterator.next();  // { value: 'world', done: false }
hwIterator.next();  // { value: 'ending', done: true }
hwIterator.next();  // { value: undefined, done: true }

// 总结一下，调用 Generator 函数，返回一个遍历器对象，代表 Generator 函数的内部指针。以后，每次调用遍历器对象的next方法，就会返回一个有着value和done两个属性的对象。value属性表示当前的内部状态的值，是yield表达式后面那个表达式的值；done属性是一个布尔值，表示是否遍历结束。




/**
* yield 表达式
*/
// 由于 Generator 函数返回的遍历器对象，只有调用next方法才会遍历下一个内部状态，所以其实提供了一种可以暂停执行的函数。yield表达式就是暂停标志。

// Generator 函数中也可以不用yield表达式，这时就变成了一个单纯的暂缓执行函数。

function* f() {
    console.log('执行');
}
var fIterator = f();    // 返回遍历器指针对象
f.next();  // '执行了'
// { value: undefined, done: true }

// 另外需要注意，yield表达式只能用在 Generator 函数里面，用在其他地方都会报错。

// 另外，yield表达式如果用在另一个表达式之中，必须放在圆括号里面。
function* demo() {
    console.log('hello' + yield 123);   // 语法错误
    console.log('hello' + (yield));     // 正确
    console.log('hello' + (yield 456)); // 正确
}

// yield表达式用作函数参数或放在赋值表达式的右边，可以不加括号。
function* demo() {
    foo(yield 'a', yield 'b');   // 正确
    let input = yield;           // 正确
}




/**
* Generator 函数 与 Iterator 接口的关系
*/
// 任意一个对象的Symbol.iterator方法，等于该对象的遍历器生成函数，调用该函数会返回该对象的一个遍历器指针对象。

// 由于 Generator 函数就是遍历器生成函数，因此可以把 Generator 赋值给对象的Symbol.iterator属性，从而使得该对象具有 Iterator 接口。

var obj = {};
obj[Symbol.iterator] = function* () {
    yield 1;
    yield 2;
    yield 3;
};
[...obj];   // [1,2,3]
// 上面代码中，Generator 函数赋值给obj对象的 Symbol.iterator属性，从而使得obj对象具有了 Iterator 接口，因此可以被...运算符遍历了。

// Generator 函数执行后，返回一个遍历器对象。该对象本身也具有Symbol.iterator属性，执行后返回自身。
function* gen() {
    // ....
};
var genIterator = gen();

genIterator[Symbol.iterator]() === genIterator;  // true
