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




/**
* next()
*/
// yield表达式本身没有返回值，或者说总是返回undefined。next方法可以带一个参数，该参数就会被当作上一个yield表达式的返回值。

// 注意，由于next方法的参数表示上一个yield表达式的返回值，所以在第一次使用next方法时，传递参数是无效的。V8 引擎直接忽略第一次使用next方法时的参数，只有从第二次使用next方法开始，参数才是有效的。从语义上讲，第一个next方法用来启动遍历器对象，所以不用带有参数。




/**
* for...of 循环
*/
// for...of循环可以自动遍历 Generator 函数时生成的Iterator对象，且此时不再需要调用next方法。

function* f() {
    yield 1;
    yield 2;
    yield 3;
    return 4;
}
for (let v of f()) {
    console.log(v);   // 1  2  3
}
// 上面代码使用for...of循环，依次显示 3 个yield表达式的值。这里需要注意，一旦next方法的返回对象的done属性为true，for...of 循环就会中止，且不包含该返回对象，所以上面代码的return语句返回的4，不包括在for...of循环之中。


// 示例：实现斐波那契数列
function* fibonacci() {
    let [prev, curr] = [0, 1];
    for ( ; ; ) {
        [prev, curr] = [curr, prev + curr];
        yield curr;
    }
}

for (let n of fibonacci()) {
    if ( n > 1000) break;
    console.log(n);
}




/**
* 函数封装：给不具备 Iterator 接口的对象部署 Iterator 接口
*/
// 方案一：用 Generator函数，把对象转化成遍历器对象
function* createIterator(obj) {
    let propKeys = Reflect.ownKeys(obj);
    for (let prop of propKeys) {
        yield [prop, obj[prop]];
    }
}
let testObj = { first: 1, last: 2 };
for( let [k,v] of createIterator(testObj)) {
    console.log(`${k}: ${v}`);
}

// 方案二：将 Generator 函数加到对象的Symbol.iterator属性上面
function* createIterator() {
    let propKeys = Object.keys(this);
    for (let prop of propKeys) {
        yield [prop, this[prop]];
    }
}
let testObj = { first: 1, last: 2 };
testObj[Symbol.iterator] = createIterator;
for (let [k,v] of testObj) {
    console.log(`${k}: ${v}`);
}




// 除了for...of循环以外，扩展运算符（...）、解构赋值和Array.from方法内部调用的，都是遍历器接口。这意味着，它们都可以将 Generator 函数返回的 Iterator 对象，作为参数。
function* f() {
    yield 1;
    yield 2;
    return 3;
    yield 4;
}
// 扩展运算符
[...f()];  // [1,2]

// Array.from()
Array.from(f());  // [1,2]

// 解构赋值
let [x, y] = f();
x;  // 1
y;  // 2

// for...of 循环
for (let n of f()) {
    console.log(n);  // 1  2
}




/**
* Generator函数返回值 的相关 API
*/
/*
    Generator.prototype.throw()
    Generator.prototype.return()
*/
function* f() {
    yield 1;
}
var it = f();   // 生成遍历器对象
it.throw('err');
it.return('ending');



/**
* next()、throw()、return() 的共同点
*/
// next()、throw()、return()这三个方法本质上是同一件事，可以放在一起理解。它们的作用都是让 Generator 函数恢复执行，并且使用不同的语句替换yield表达式。
next() 是将yield表达式替换成一个值。
throw() 是将yield表达式替换成一个throw语句。
return() 是将yield表达式替换成一个return语句。
