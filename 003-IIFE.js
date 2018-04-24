/**
* 用块级作用域写法，代替立即执行函数表达式IIFE
*/

// IIFE写法
(function() {
    var tmp = 100;
    console.log(tmp);
})();
console.log(tmp); // undefined

// 用“块级作用域”替代IIFE
{
    let tmp1 = 100;
    console.log(tmp1);
}
console.log(tmp1);  // undefined
