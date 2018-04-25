/**
* 函数参数的默认值
*/
function log(x, y='world') {
    console.log(x,y);
}

function Point(x = 0, y = 0) {
    this.x = x;
    this.y = y;
}

// 参数变量是默认声明的，所以不能用let或const再次声明。
function foo(x = 5) {
    // let x = 1;    // error
    // 函数参数不能再次被声明
}




/**
* 与解构赋值默认值结合使用
*/
function doTo({x, y=2}) {
    console.log(x,y);
}
doTo({x:1, y:3});  // 1, 3
doTo({x:1});       // 1, 2
doTo();        // 报错，找不到 x


function fetch1(url, {body='', method='GET', headers={}}) {
    console.log('');
}
fetch1('url', {});
fetch1('url');   // 报错，因为找不到第二个参数

function fetch2(url, {body='', method='GET', headers={}} = {}) {
    console.log('');
}
fetch2('url', {method:'POST'});
fetch2('url');   // 不报错，第二个参数有默认值


/**
* 区分如下函数参数解构赋值的两种方式
*/
// 写法一：有默认参数，有解构赋值
function m1( {x = 0, y = 0} = {} ) {
    return [x, y];
}
// 写法二：有默认参数，没有解构赋值
function m2( {x, y} = { x:0, y:0} ) {
    return [x, y];
}
// 区别：写法一函数参数的默认值是空对象，但是设置了对象解构赋值的默认值；写法二函数参数的默认值是一个有具体属性的对象，但是没有设置对象解构赋值的默认值。

// 函数没有参数的情况
m1() // [0, 0]
m2() // [0, 0]

// x 和 y 都有值的情况
m1({x: 3, y: 8}) // [3, 8]
m2({x: 3, y: 8}) // [3, 8]

// x 有值，y 无值的情况
m1({x: 3}) // [3, 0]
m2({x: 3}) // [3, undefined]

// x 和 y 都无值的情况
m1({}) // [0, 0];
m2({}) // [undefined, undefined]

m1({z: 3}) // [0, 0]
m2({z: 3}) // [undefined, undefined]
