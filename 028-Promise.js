/**
* Promise的含义
*/
// Promise 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大。

// 所谓Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。

// Promise对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）。

// Promise对象的状态改变，只有两种可能：从pending变为fulfilled和从pending变为rejected。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 resolved（已定型）。

// 如果某些事件不断地反复发生，一般来说，使用 Stream 模式是比部署Promise更好的选择。




/**
* 基本用法
*/
// Promise对象是一个构造函数，用来生成Promise实例。

// Promise构造函数接受一个函数作为参数，该函数的两个参数分别是resolve和reject。它们是两个函数，由 JavaScript 引擎提供，不用自己部署。

// resolve函数的作用是，将Promise对象的状态从“未完成”变为“成功”（即从 pending 变为 resolved），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；reject函数的作用是，将Promise对象的状态从“未完成”变为“失败”（即从 pending 变为 rejected），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。

const promise = new Promise(function(resolve, reject) {
    // ...
    if ( /* 异步操作成功 */) {
        resolve(value);
    } else {
        reject(error);
    }
});

// Promise实例生成以后，可以用then方法分别指定resolved状态和rejected状态的回调函数。
promise.then(function(value) {
    // success
}, function(error) {
    // failure
});
// then方法可以接受两个回调函数作为参数。第一个回调函数是Promise对象的状态变为resolved时调用，第二个回调函数是Promise对象的状态变为rejected时调用。其中，第二个函数是可选的，不一定要提供。这两个函数都接受Promise对象传出的值作为参数。


/**
* 执行顺序
*/
let promise = new Promise(function(resolve, reject) {
    console.log(1);
    resolve();
    reject();
});
promise.then(function() {
    console.log(2);
}, function() {
    console.log(3);
});
console.log(4);
// 1
// 4
// 2 或 3


new Promise((resolve, reject)=>{
    resolve(1);  // 传参
    console.log(2);
}).then(r => {
    console.log(r);
});
// 2
// 1



/**
* 异步加载图片的示例
*/
function loadImageAsync(url) {
    return new Promise(function(resolve, reject) {
        const image = new Image();
        image.src = url;
        image.onload = function() {
            resolve(image);
        };
        image.onerror = function() {
            reject(new Error('Could not load image'));
        };
    });
}
// 如果图片url加载成功，就调用resolve方法，否则就调用reject方法。
loadImageAsync(url).then(function(oImg) {
    console.log(oImg);
}, function(err) {
    console.log(err);
});

/**
* Promise实现Ajax的示例
*/
// 封装 XMLHttpRequest
const getJSON = function(url) {
    const promise = new Promise(function(resolve, reject){
        const client = new XMLHttpRequest();
        client.open("GET", url);
        client.onreadystatechange = function() {
            if (this.readyState !== 4) {
                return;
            }
            if (this.status === 200) {
                // 请求成功时，执行resolve()
                resolve(this.response);
            } else {
                // 否则执行reject()
                reject(new Error(this.statusText));
            }
        };
        client.responseType = 'json';
        client.setRequestHeader('Accept', 'application/json');
        client.send();
    });
    return promise;
}

getJSON('url').then(function(res) {
    console.log(res);
}, function(error) {
    console.log(error);
});


// 如果调用resolve函数和reject函数时带有参数，那么它们的参数会被传递给回调函数。reject函数的参数通常是Error对象的实例，表示抛出的错误；resolve函数的参数除了正常的值以外，还可能是另一个 Promise 实例，比如像下面这样。

const p1 = new Promise(function(resolve, reject){});
const p2 = new Promise(function(resolve, reject){
    resolve(p1);  // resolve的参数是另一个Promise对象
});





/**
* then()
*/
// Promise 实例具有then方法，也就是说，then方法是定义在原型对象Promise.prototype上的。它的作用是为 Promise 实例添加状态改变时的回调函数。前面说过，then方法的第一个参数是resolved状态的回调函数，第二个参数（可选）是rejected状态的回调函数。

// then方法返回的是一个新的Promise实例（注意，不是原来那个Promise实例）。因此可以采用链式写法，即then方法后面再调用另一个then方法。

// 采用链式的then，可以指定一组按照次序调用的回调函数。这时，前一个回调函数，有可能返回的还是一个Promise对象（即有异步操作），这时后一个回调函数，就会等待该Promise对象的状态发生变化，才会被调用。

promise1.then(()=>{
    console.log('promise1 成功');
    return promise2;  // 返回另一个promise对象
}, ()=>{
    console.log('promise1 失败');
}).then(()=>{
    console.log('promise2 成功');
    return promise3;  // 返回另一个promise对象
}, ()=>{
    console.log('promise2 失败');
}).then(()=>{
    console.log('promise3 成功');
}, ()=>{
    console.log('promise3 失败');
});





/**
* catch()
*/
// Promise.prototype.catch方法是.then(null, rejection)的别名，用于指定发生错误时的回调函数。另外，then方法指定的回调函数，如果运行中抛出错误，也会被catch方法捕获。

// Promise 对象的错误具有“冒泡”性质，会一直向后传递，直到被捕获为止。也就是说，错误总是会被下一个catch语句捕获。
promise.then(()=>{
    console.log();
}).catch((err)=>{
    console.log(err);
});




/**
* finally()
*/
// finally方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。
promise.then(res => {
    // 成功时执行
}).catch(err => {
    // 有异常时执行
}).finally(()=> {
    // 总会被执行
});




/**
* Promise.all()
*/
// Promise.all方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。
const p = Promise.all([p1, p2, p3]);

// p的状态由p1、p2、p3决定，分成两种情况。
// （1）只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数。
// （2）只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数。

const promiseArr = [1,2,3,4,5].map(function(id) {
    return new Promise(function(resolve, reject) {
        // ...
        resolve(id);
    });
});
// Promise.all()接收一组promise对象作为参数
Promise.all(promiseArr).then(function(arr) {
    // ...
}).catch(function(err){
    console.log(err);
});



/**
* Promise.race()
*/
// Promise.race方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例。
const p = Promise.race([p1, p2, p3]);

// 上面代码中，只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给p的回调函数。



/**
* Promise.resolve()
*/
// Promise.resolve()用于把现有对象转为 Promise 对象

// 下面代码将 jQuery 生成的deferred对象，转为一个新的 Promise 对象。
const jsPromise = Promise.resolve($.ajax('/whatever.json'));


Promise.resolve('foo');
// 等价于
new Promise(resolve => resolve('foo'));




/**
* Promise.reject()
*/
// Promise.reject(reason)方法也会返回一个新的 Promise 实例，该实例的状态为rejected。
const p = Promise.reject('出错了');
// 等价于
const p = new Promise((resolve, reject) => reject('出错了'));

p.then(null, str => {
    console.log(str);
});




/**
* Promise.try()
*/
// Promise.try就是模拟try代码块，就像promise.catch模拟的是catch代码块。
Promise.try(database.users.get({id:1})).then().catch();
