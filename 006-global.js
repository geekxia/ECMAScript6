// var命令和function命令声明的全局变量，依旧是顶层对象window的属性.
// let命令、const命令、class命令声明的全局变量，不属于顶层对象的属性。也就是说，从 ES6 开始，全局变量将逐步与顶层对象的属性脱钩。


var a = 1;
// window.a;  // 1

let b = 2;
// window.b;  // undefined



// 浏览器里面，顶层对象是window，但 Node 和 Web Worker 没有window。
// 浏览器和 Web Worker 里面，self也指向顶层对象，但是 Node 没有self。
// Node 里面，顶层对象是global，但其他环境都不支持。


/**
* 功能封装：获取各种不同环境下的js顶层对象
*/
// 方案1
let globalObj = (
    typeof window !== 'undefined'
    ? window
    : (typeof process === 'object' && typeof require === 'function' && typeof global === 'object')
    ? global
    : this
);
// console.log(globalObj);

// 方案2
var getGlobal = function() {
    if (typeof self !== 'undefined') return self;
    if (typeof window !== 'undefined') return window;
    if (typeof global !== 'undefined') return global;
    throw new Error('unable to locate global object');
}
console.log(getGlobal());



// system.global垫片库，用于获取js环境下的顶层对象
