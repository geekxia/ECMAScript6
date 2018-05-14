// 如何将 ES6 的新语法，运用到编码实践之中，与传统的 JavaScript 语法结合在一起，写出合理的、易于阅读和维护的代码？

/**
*   本章主要参考了 Airbnb 公司的 JavaScript 风格规范。
*/

// 1、let 取代 var
// ES6 提出了两个新的声明变量的命令：let和const。其中，let完全可以取代var，因为两者语义相同，而且let没有副作用。


// 2、在let和const之间，建议优先使用const
// 尤其是在全局环境，不应该设置变量，只应设置常量。
// const优于let有几个原因。一个是const可以提醒阅读程序的人，这个变量不应该改变；另一个是const比较符合函数式编程思想，运算不改变值，只是新建值，而且这样也有利于将来的分布式运算；最后一个原因是 JavaScript 编译器会对const进行优化，所以多使用const，有利于提高程序的运行效率，也就是说let和const的本质区别，其实是编译器内部的处理不同。
// const声明常量还有两个好处，一是阅读代码的人立刻会意识到不应该修改这个值，二是防止了无意间修改变量值所导致的错误。
// 所有的函数都应该设置为常量。


// 3、静态字符串一律使用单引号或反引号，不使用双引号。动态字符串使用反引号。


// 4、优先使用解构赋值
// 使用数组成员对变量赋值时，优先使用解构赋值。
const [a, b, c] = [1, 2, 3];

// 函数的参数如果是对象的成员，优先使用解构赋值。
function getName({firstName, lastName}) {};

// 如果函数返回多个值，优先使用对象的解构赋值，而不是数组的解构赋值。这样便于以后添加返回值，以及更改返回值的顺序。
function processInput(ipt) {
    return { left, right, top, bottom };
}


// 5、单行定义的对象，最后一个成员不以逗号结尾。多行定义的对象，最后一个成员以逗号结尾。
const obj1 = { a: 1, b: 2 };
const obj2 = {
    a: 1,
    b: 2,
}


// 6、对象尽量静态化，一旦定义，就不得随意添加新的属性。如果添加属性不可避免，要使用Object.assign方法。
const obj = { a: 0 };
obj.a = 1;
Object.assign(a, { b: 2 });


// 7、如果对象的属性名是动态的，可以在创造对象的时候，使用属性表达式定义。
const obj = {
    id: 9,
    name: 'geek',
    [getKey('isChecked')]: true,
}


// 8、对象的属性和方法，尽量采用简洁表达法，这样易于描述和书写。
const ref = '123';
const obj = {
    // ref: ref,
    ref,
    id: 10,
    // getId: function() {
    //     return obj.id;
    // },
    getId () {
        return obj.id;
    },
}


// 9、使用扩展运算符（...）拷贝复制数组。
const arr = [1, 2, 3];
const copy = [...arr];


// 10、使用 Array.from 方法，将类似数组的对象转为数组。
const foo = document.querySelectorAll('div');
const nodes = Array.from(foo);


// 11、立即执行函数可以写成箭头函数的形式。
(() => {
    console.log('geek');
})();


// 12、箭头函数取代Function.prototype.bind，不应再用 self/_this/that 绑定 this。
const boundMethod (...params) => method.apply(this, params);
[1,2,3].map((x) => x * x);


// 13、所有配置项都应该集中在一个对象，放在最后一个参数，布尔值不可以直接作为参数。
function divide(a, b, { option = false } = {}) {};


// 14、不要在函数体内使用 arguments 变量，使用 rest 运算符（...）代替。因为 rest 运算符显式表明你想要获取参数，而且 arguments 是一个类似数组的对象，而 rest 运算符可以提供一个真正的数组。
function concatAll(...args) {
    return args.join('-');
}


// 15、使用默认值语法设置函数参数的默认值。
function handleThings (opts = {}) {};


// 16、注意区分 Object 和 Map，只有模拟现实世界的实体对象时，才使用 Object。如果只是需要key: value的数据结构，使用 Map 结构。因为 Map 有内建的遍历机制。
let map = new Map(arr);
for (let key of map.keys()) {};
for (let value of map.values()) {};
for (let item of map.entries()) {};


// 17、用 Class，取代需要 prototype 的操作。因为 Class 的写法更简洁，更易于理解。
class Queue {
    constructor(contents = []) {
        this._queue = [...contents];
    }
    pop() {
        const value = this._queue[0];
        this._queue.splice(0, 1);
        return value;
    }
}


// 18、使用extends实现继承，因为这样更简单，不会有破坏instanceof运算的危险。
class PeekableQueue extends Queue {
    peek() {
        return this._queue[0];
    }
}


// 19、Module 语法是 JavaScript 模块的标准写法，优先使用ES6模块写法。用 import取代 require。
import { fn1, fn2 } from 'my_module';


// 20、用 export取代 module.exports
import React from 'react';
class Breadcrumbs exports React.Component {
    render() {}
}
export default Breadcrumbs;


// 21、如果模块只有一个输出值，就使用export default。如果模块有多个输出值，就不使用export default，export default与普通的export不要同时使用。


// 22、不要在模块输入中使用通配符。因为这样可以确保你的模块之中，有一个默认输出（export default）。
// bad
import * as myObj from 'my_module';  // 不建议这么写
// good
import myObj from 'my_module';


// 23、如果模块默认输出一个函数，函数名的首字母应该小写
function makeStyle() {};
export default makeStyle;


// 24、如果模块默认输出一个对象，对象名的首字母应该大写。
const StyleGuide = {};
export default StyleGuide;


/**
*   ESLint
*/
// ESLint 是一个语法规则和代码风格的检查工具，可以用来保证写出语法正确、风格统一的代码。

// 安装
npm install eslint -g

// 安装 Airbnb 语法规则，以及 import、a11y、react 插件
npm install eslint-config-airbnb -g
npm install eslint-plugin-import -g
npm install eslint-plugin-jsx-ally -g
npm install eslint-plugin-react -g

// 配置 .eslintrc文件
{
    "extends": "eslint-config-airbnb"
}

// 检测文件编码是否合乎规范
eslint index.js
