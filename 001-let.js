/**
* 知识点：let声明的变量只在它所在的代码块内有效。
* ES5 只有两种声明变量的方法：var命令和function命令。ES6 除了添加let和const命令，另外两种声明变量的方法：import命令和class命令。所以，ES6 一共有 6 种声明变量的方法。
*/
{
    var a = 10;
    let b = 20;
    const c = 30;
}
// console.log(a);
// 10
// console.log(b);
// b is undefined
// console.log(c);
// c is undefined

for(let i =0; i<10; i++) {
    //
}
// console.log(i);
// i is undefined


var a = [];
for(var i = 0; i<10; i++) {
    a[i] = function() {
        console.log(i);
    }
}
a[6]();   // 10
