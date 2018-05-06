/**
*  什么是 async 函数？
*/
// ES2017 标准引入了 async 函数，使得异步操作变得更加方便。
// async 函数是什么？一句话，它就是 Generator 函数的语法糖。

const fs = require('fs');
const readFile = function(filename) {
    return new Promise(function(resolve, reject) {
        fs.readFile(filename, function(err, data) {
            if (err) return reject(err);
            resolve(data);
        });
    });
};

// 异步读取两个文件，用 Generator 函数的写法
const gen = function* () {
    const f1 = yield readFile('./etc/fstab');
    const f2 = yield readFile('./etc/shells');
    console.log(f1.toString());
    console.log(f2.toString());
}

// 异步读取两个文件，用 async 函数的写法
const asyncReadfile = async function() {
    const f1 = await readFile('./etc/fstab');
    const f2 = await readFile('./etc/shells');
    console.log(f1.toString());
    console.log(f2.toString());
}

// 一比较就会发现，async函数就是将 Generator 函数的星号（*）替换成async，将yield替换成await，仅此而已。


/**
*  async函数对 Generator函数的改进，体现在哪些方面？
*/
/*
    1、async函数自带执行器。也就是说，async函数的执行，与普通函数一模一样，只要一行。
    2、async函数，有更好的语义。async表示函数里有异步操作，await表示紧跟在后面的表达式需要等待结果。
    3、async函数具有更广的适用性。
    4、async函数的返回值是 Promise对象。这比 Generator 函数的返回值是 Iterator 对象方便多了。你可以用then方法指定下一步的操作。进一步说，async函数完全可以看作多个异步操作，包装成的一个 Promise 对象，而await命令就是内部then命令的语法糖。
*/



/**
*   async 函数的基本用法
*/
// async函数返回一个 Promise 对象，可以使用then方法添加回调函数。当函数执行的时候，一旦遇到await就会先返回，等到异步操作完成，再接着执行函数体内后面的语句。

// async 函数有多种使用形式。

// 函数声明
async function foo() {};

// 函数表达式
const foo = async function() {};

// 对象的写法
let obj = { async foo() { } };
obj.foo().then();

// Class的写法
class Storage {
    constructor() {}
    async foo() {}
}
const s = new Storage();
s.foo().then();

// 箭头函数
const foo = async () => {};





/**
*   async 语法
*/
// async函数返回值是 Promise对象。
// async函数内部的return语句返回的值，会成为 then方法回调函数的参数。
// async函数内部抛出错误，会导致返回的 Promise 对象变为reject状态。抛出的错误对象会被catch方法回调函数接收到。
// 正常情况下，await命令后面是一个 Promise 对象。如果不是，会被转成一个立即resolve的 Promise 对象。
// 只要一个await语句后面的 Promise 变为reject，那么整个async函数都会中断执行。

async function f(){
    return await 'hello world';
}
f().then(v => console.log(v), err => console.log(err));  // 'hello world'


// async函数的错误处理机制
async function f() {
    try {
        await new Promise();
    } catch (e) {
        console.log(err);
    } finally {
        return 'done';
    }
}
// 另一种写法
async function f() {
    await new Promise((resolve, reject) => {}).catch(err => {
        console.log(err);
    });
}




/**
*   async函数的实现原理
*/
// async 函数的实现原理，就是将 Generator 函数和自动执行器，包装在一个函数里。
async function fn(args) { };
// 等同于
function fn(args) {
    return spawn(function* () {});
}
// spawn函数就是自动执行器，其实现如下：
function spawn(genFn) {
    return new Promise((resolve, reject) => {
        const gen = genFn();
        const step = nextFn => {
            let next;
            try {
                next = nextFn();
            } catch (e) {
                return reject(e);
            }
            if(next.done) {
                return resolve(next.value);
            }
            Promise.resolve(next.value).then(v => {
                step(() => gen.next(v));
            }, err => {
                step(() => gen.throw(err));
            });
        };
        step(() => gen.next(undefined));
    });
}




/**
*  实例：按顺序完成异步操作
*/
async function loginOrder(urls) {
    // 并发读取远程 url
    const textPromises = urls.map(async url => {
        const response = await fetch(url);
        return response.text();
    });
    // 按顺序输出
    for (let textPromise of textPromises) {
        console.log(await textPromise);
    }
}




/**
*   异步遍历器
*/
// Iterator 接口是一种数据遍历的协议，只要调用遍历器对象的next方法，就会得到一个对象，表示当前遍历指针所在的那个位置的信息。这里隐含着一个规定，next方法必须是同步的。

// ES2018 引入了”异步遍历器“（Async Iterator），为异步操作提供原生的遍历器接口，即value和done这两个属性都是异步产生。

// 异步遍历器的最大的语法特点，就是调用遍历器的next方法，返回的是一个 Promise 对象。

// 一个对象的同步遍历器的接口，部署在Symbol.iterator属性上面。同样地，对象的异步遍历器接口，部署在Symbol.asyncIterator属性上面。不管是什么样的对象，只要它的Symbol.asyncIterator属性有值，就表示应该对它进行异步遍历。

asyncIterator.next().then({value, done} => {});
// 异步遍历器的next方法，返回的是一个 Promise 对象。


// for...of循环用于遍历同步的 Iterator 接口。新引入的 for await...of 循环，则是用于遍历异步的 Iterator 接口。
for await (let x of asyncIterator) {
    console.log(x);
}


/**
*   异步 Generator 函数
*/
// 就像 Generator 函数返回一个同步遍历器对象一样，异步 Generator 函数的作用，是返回一个异步遍历器对象。

// 在语法上，异步 Generator 函数就是async函数与 Generator 函数的结合。
async function* gen() {
    yield 'hello';
    return 'world';
}
const genObj = gen();  // 生成异步遍历器
genObj.next().then( x => console.log(x));

// 异步遍历器的设计目的之一，就是 Generator 函数处理同步操作和异步操作时，能够使用同一套接口。

// yield* 语句也可以跟一个异步遍历器。
// 与同步 Generator 函数一样，for await...of循环会展开yield*。
async function* g() {
    yield 'a';
    yield 'b';
    return 2;
}
async function* g2() {
    const result = yield* g();
}
(async function () {
    for await (let x of g2()) {
        console.log(x);
    }
})();
// 'a'
// 'b'
