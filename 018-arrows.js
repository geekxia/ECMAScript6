/**
* 箭头函数
*/
var f1 = v => v;

var f2 = () => 5;

var f3 = (a, b) => a + b;

// 由于大括号被解释为代码块，所以如果箭头函数直接返回一个对象，必须在对象外面加上括号，否则会报错。
let getTempItem1 = id => { id: id, name: "Temp" };   // 报错
let getTempItem2 = id => ({ id: id, name: "Temp" }); // 正确

// 如果箭头函数只有一行语句，且不需要返回值，可以采用下面的写法，就不用写大括号了。
let f4 = () => void doesNotReturn();

// 箭头函数可以与变量解构结合使用。
let f5 = ({first, last}) => first + ' ' + last;

// 箭头函数使得表达更加简洁。
let isEven = n => n % 2 === 0;
let square = n => n * n;

// 箭头函数的一个用处是简化回调函数。
[1, 2, 3].map(x => x * x);
var result =[3, 5, 2].sort((a,b) => a - b);

// rest 参数与箭头函数结合
let numbers = (...nums) => nums;
numbers(1,2,3);   // [1,2,3]

let f6 = (head, ...tail) => [head, tail];
f6(1,2,3,4,5);   // [1,2,3,4,5]



/**
* 箭头函数注意要点
*/
// （1）函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。
// （2）不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。
// （3）不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。
// （4）不可以使用yield命令，因此箭头函数不能用作 Generator 函数。

// 箭头函数可以让this指向固定化，这种特性很有利于封装回调函数。
// 箭头函数可以让setTimeout里面的this，绑定定义时所在的作用域，而不是指向运行时所在的作用域。
// this指向的固定化，并不是因为箭头函数内部有绑定this的机制，实际原因是箭头函数根本没有自己的this，导致内部的this就是外层代码块的this。正是因为它没有this，所以也就不能用作构造函数。
// 箭头函数里面根本没有自己的this，而是引用外层的this。

function foo() {
  return () => {
    return () => {
      return () => {
        console.log('id:', this.id);
      };
    };
  };
}
var f = foo.call({id: 1});

var t1 = f.call({id: 2})()(); // id: 1
var t2 = f().call({id: 3})(); // id: 1
var t3 = f()().call({id: 4}); // id: 1

// 除了this，以下三个变量在箭头函数之中也是不存在的，指向外层函数的对应变量：arguments、super、new.target。
function foo() {
  setTimeout(() => {
    console.log('args:', arguments);
  }, 100);
}
foo(2, 4, 6, 8);    // args: [2, 4, 6, 8]

// 由于箭头函数没有自己的this，所以当然也就不能用call()、apply()、bind()这些方法去改变this的指向。

(function() {
  return [
    (() => this.x).bind({ x: 'inner' })()
  ];
}).call({ x: 'outer' });   // ['outer']
// 上面代码中，箭头函数没有自己的this，所以bind方法无效，内部的this指向外部的this。




/**
* 箭头函数嵌套
*/
let insert = (value) => ({into: (array) => ({after: (afterValue) => {
  array.splice(array.indexOf(afterValue) + 1, 0, value);
  return array;
}})});

insert(2).into([1, 3]).after(1); //[1, 2, 3]


// 箭头函数嵌套，部署管道机制（pipeline），即前一个函数的输出是后一个函数的输入。
const pipeline (...funcs) => val => funcs.reduce((a,b) => b(a), val);
const plus1 = a => a + 1;
const mult2 = a => a * 2;
const addThenMult = pipeline(plus1, mult2);

addThenMult(5);    // 12
mult2(plus1(5));   // 12


// 箭头函数还有一个功能，就是可以很方便地改写 λ 演算。
var fix = f => (x => f(v => x(x)(v)))(x => f(v => x(x)(v)));




/**
* 双冒号运算符（提案）
*/
// 函数绑定运算符是并排的两个冒号（::），双冒号左边是一个对象，右边是一个函数。该运算符会自动将左边的对象，作为上下文环境（即this对象），绑定到右边的函数上面。

foo::bar;
// 等同于
bar.bind(foo);





/**
* 尾调用 与 尾递归
*/
// 什么是尾调用？
// 尾调用（Tail Call）是函数式编程的一个重要概念，本身非常简单，一句话就能说清楚，就是指某个函数的最后一步是调用另一个函数。

// 以下三种情况，都不属于尾调用
// 情况一
function f(x){
  let y = g(x);
  return y;
}
// 情况二
function f(x){
  return g(x) + 1;
}
// 情况三
function f(x){
  g(x);
}
function f(x){
  g(x);
  return undefined;
}


// 尾调用示例
function f(x) {
    if (x > 0) {
        return m(x);
    }
    return n(x);
}



// 什么是尾递归 ？
// 函数调用自身，称为递归。如果尾调用自身，就称为尾递归。
// 递归非常耗费内存，因为需要同时保存成千上百个调用帧，很容易发生“栈溢出”错误（stack overflow）。但对于尾递归来说，由于只存在一个调用帧，所以永远不会发生“栈溢出”错误。

// 复杂度 O(n)
function factorial(n) {
  if (n === 1) return 1;
  return n * factorial(n - 1);
}
factorial(5) // 120


// 尾递归优化， 复杂度 O(1)
function factorial(n, total) {
  if (n === 1) return total;
  return factorial(n - 1, n * total);
}
factorial(5, 1) // 120
