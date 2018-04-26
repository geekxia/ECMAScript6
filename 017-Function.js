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



/**
* 函数的 length 属性
*/
(function (a) {}).length // 1
(function (a = 5) {}).length // 0
(function (a, b, c = 5) {}).length // 2
(function(...args) {}).length // 0
(function (a = 0, b, c) {}).length // 0
(function (a, b = 1, c) {}).length // 1


/**
* 作用域、函数域
*/
// 示例一
var x = 1;
function bar(x, y=function() {x=2;}){
    var x = 3;
    y();
    console.log(x);
}
bar();  // 3
x;      // 1

// 示例二
var x = 1;
function bar(x, y=function() {x=2;}){
    x = 3;
    y();
    console.log(x);
}
bar();  // 2
x;      // 1



/**
* 函数 rest参数
*/
// ES6 引入 rest 参数（形式为...变量名），用于获取函数的多余参数，这样就不需要使用arguments对象了。rest 参数搭配的变量是一个数组，该变量将多余的参数放入数组中。
// 注意，rest 参数之后不能再有其他参数（即只能是最后一个参数），否则会报错。
// 求和
function add(...values) {
    let sum = 0;
    for(var val of values) {
        sum += val;
    }
    return sum;
}
add(2,3,4);   // 9
add(1,2,3,4,5);  // 15


// 区分 rest参数 和 arguments
// arguments变量的写法
function sortNumbers() {
    // 调用数组的slice方法，把arguments转化为数组，再排序
    return Array.prototype.slice.call(arguments).sort();
}
// rest参数的写法
const sortNumbers = (...numbers) => numbers.sort();
// arguments对象不是数组，而是一个类似数组的对象。所以为了使用数组的方法，必须使用Array.prototype.slice.call先将其转为数组。rest 参数就不存在这个问题，它就是一个真正的数组，数组特有的方法都可以使用。


(function(a) {}).length  // 1
(function(...a) {}).length  // 0
(function(a, ...b) {}).length  // 1


/**
* 严格模式
*/
// 从 ES5 开始，函数内部可以设定为严格模式。
function doSomething(a, b) {
  'use strict';
  // code
}
// ES2016 做了一点修改，规定只要函数参数使用了默认值、解构赋值、或者扩展运算符，那么函数内部就不能显式设定为严格模式，否则会报错。



// name属性
// 函数的name属性，返回该函数的函数名。
function foo() {};
foo.name;   // 'foo'

// Function构造函数返回的函数实例，name属性的值为anonymous。
(new Function).name // "anonymous"

// bind返回的函数，name属性值会加上bound前缀。
function foo() {};
foo.bind({}).name // "bound foo"
(function(){}).bind({}).name // "bound "
