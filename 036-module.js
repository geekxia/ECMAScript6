/**
*   模块 概述
*/
// 在 ES6 之前，社区制定了一些模块加载方案，最主要的有 CommonJS 和 AMD 两种。前者用于服务器，后者用于浏览器。ES6 在语言标准的层面上，实现了模块功能，而且实现得相当简单，完全可以取代 CommonJS 和 AMD 规范，成为浏览器和服务器通用的模块解决方案。

// ES6 模块的设计思想是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。CommonJS 和 AMD 模块，都只能在运行时确定这些东西。

// CommonJS 模块就是对象，输入时必须查找对象属性。
// CommonJS 模块
let { stat, exists, readFile } = require('fs');
// 等同于
let _fs = require('fs');
let stat = _fs.stat;
let exists = _fs.exists;
let readFile = _fs.readFile;
// 上面代码的实质是整体加载fs模块（即加载fs的所有方法），生成一个对象（_fs），然后再从这个对象上面读取 3 个方法。这种加载称为“运行时加载”，因为只有运行时才能得到这个对象，导致完全没办法在编译时做“静态优化”。


// ES6 模块不是对象，而是通过export命令显式指定输出的代码，再通过import命令输入。
import { stat, exists, readFile } from 'fs';
// 上面代码的实质是从fs模块加载 3 个方法，其他方法不加载。这种加载称为“编译时加载”或者静态加载，即 ES6 可以在编译时就完成模块加载，效率要比 CommonJS 模块的加载方式高。


// ES6 模块的优势
/*
    由于 ES6 模块是编译时加载，使得静态分析成为可能。
    不再需要UMD模块格式了，将来服务器和浏览器都会支持 ES6 模块格式。目前，通过各种工具库，其实已经做到了这一点。
    将来浏览器的新 API 就能用模块格式提供，不再必须做成全局变量或者navigator对象的属性。
    不再需要对象作为命名空间（比如Math对象），未来这些功能可以通过模块提供。
*/



/**
*   严格模式
*/
// ES6 的模块自动采用严格模式，不管你有没有在模块头部加上"use strict";。

// 严格模式主要有以下限制
/*
    变量必须声明后再使用
    函数的参数不能有同名属性，否则报错
    不能使用with语句
    不能对只读属性赋值，否则报错
    不能使用前缀 0 表示八进制数，否则报错
    不能删除不可删除的属性，否则报错
    不能删除变量delete prop，会报错，只能删除属性delete global[prop]
    eval不会在它的外层作用域引入变量
    eval和arguments不能被重新赋值
    arguments不会自动反映函数参数的变化
    不能使用arguments.callee
    不能使用arguments.caller
    禁止this指向全局对象
    不能使用fn.caller和fn.arguments获取函数调用的堆栈
    增加了保留字（比如protected、static和interface）
*/
// 尤其需要注意this的限制。ES6 模块之中，顶层的this指向undefined，即不应该在顶层代码使用this。



/**
*   export 命令
*/
// ES6 模块功能主要由两个命令构成：export和import。export命令用于规定模块的对外接口，import命令用于输入其他模块提供的功能。

// 一个模块就是一个独立的文件。该文件内部的所有变量，外部无法获取。如果你希望外部能够读取模块内部的某个变量，就必须使用export关键字输出该变量。下面是一个 JS 文件，里面使用export命令输出变量。

// 写法一
export var year = 2018;
export function add(x, y) { return x + y };

// 写法二
var year = 2018;
var add = function(x, y) { return x + y };
export {
    year,
    add
}

// 写法三
// 通常情况下，export输出的变量就是本来的名字，但是可以使用as关键字重命名。
// 重命名后，变量可以用不同的名字输出多次。
export {
    year as date,
    add as addFun1,
    add as addFun2,
    add as addFun3
}


// export语句输出的接口，与其对应的值是动态绑定关系，即通过该接口，可以取到模块内部实时的值。
export var foo = 1;
setTimeout(() => foo = 2, 1000);
// 上面代码输出变量foo，值为 1 ，一秒之后变成 2。 这一点与 CommonJS 规范完全不同。CommonJS 模块输出的是值的缓存，不存在动态更新。


// 最后，export命令可以出现在模块的任何位置，只要处于模块顶层就可以。如果处于块级作用域内，就会报错，下一节的import命令也是如此。这是因为处于条件代码块之中，就没法做静态优化了，违背了 ES6 模块的设计初衷。




/**
*   import 命令
*/
// import命令接受一对大括号，里面指定要从其他模块导入的变量名。大括号里面的变量名，必须与被导入模块（export）对外接口的名称相同。

// 写法一
import { year } from './profile.js';

// 写法二
// 如果想为输入的变量重新取一个名字，import命令要使用as关键字，将输入的变量重命名。
import { year as date } from './profile.js';

// 写法三
// import语句会执行所加载的模块，比如执行一个js文件，或者加载一张图片等
import './createTime.js';
import './data.json';
import './image/dog.png';
import './style.css';

// 写法四
// 模块的整体加载，除了指定加载某个输出值，还可以使用整体加载，即用星号（*）指定一个对象，所有输出值都加载在这个对象上面。
import * as circle from './circle.js';


// import命令输入的变量都是只读的，因为它的本质是输入接口。也就是说，不允许在加载模块的脚本里面改写接口。 但是，如果导入的变量是对象类型，改写它的属性是允许的，一旦改写了，其他模块也可以读以它被改写后的值。因此，这种写法很难查错，建议凡是import导入的变量，都当作完全只读，不要轻易改变它的属性。

// 注意，import命令具有提升效果，会提升到整个模块的头部，首先执行。import命令是编译阶段执行的，在代码运行时之前。  由于import是静态执行，所以不能使用表达式和变量。
// 报错
import { 'f' + 'oo' } from 'my_module';
// 报错
let module = 'my_module';
import { foo } from module;
// 报错
if (x === 1) {
  import { foo } from 'module1';
} else {
  import { foo } from 'module2';
}

// 如果多次重复执行同一句import语句，那么只会执行一次，而不会执行多次。
import './do.js';
import './do.js';
import './do.js';   // 只会执行一次


import { foo } from 'module';
import { bar } from 'module';
// 等同于
import { foo, bar } from 'module';
// 上面代码中，虽然foo和bar在两个语句中加载，但是它们对应的是同一个module实例。也就是说，import语句是 Singleton 模式。

// 目前阶段，通过 Babel 转码，CommonJS 模块的require命令和 ES6 模块的import命令，可以写在同一个模块里面，但是最好不要这样做。因为import在静态解析阶段执行，所以它是一个模块之中最早执行的。
// ES6 模块是静态加载执行的，发生在编译阶段
// CommonJS 模块是动态加载的，发生在运行时阶段


/**
*   export default 命令
*/
// 本质上，export default就是输出一个叫做default的变量或方法，然后系统允许你为它取任意名字。
// 一个模块中只能有一个默认输出，因此export default命令只能使用一次。
export default function() {};
export default function foo() {};
export default a;
export default 45;
export default class MyClass {};
// export default命令其实只是输出一个叫做default的变量，所以它后面不能跟变量声明语句。
export default var a = 1;   // 报错
// 导入 default 接口
import xxx from './my_default.js';

// 注意：
// 一个模块中，使用 export default 导出的接口，import 时无须大括号。直接用 export 导出的接口，import 时，都需要用大括号包裹起来。
export a;
export b;
export default c;

import c, { a, b} from './my_default.js';  // 注意大括号的使用



/**
*   export 与 import 的复合写法
*/
// 如果在一个模块之中，先输入后输出同一个模块，import语句可以与export语句写在一起。写成一行以后，被导入再导出的接口 API，实际上并没有被导入当前模块，只是相当于对外转发了这些接口，导致当前模块不能直接使用这些接口。

export { foo, bar } from 'my_module';
// 等同于
import { foo, bar } from 'my_module';
export { foo, bar };

// 这种写法，可以用于对模块接口进行改名和整体输出
// 接口改名
export { foo as myFoo } from 'my_module';
// 整体导出
export * from 'my_module';

// 导出默认接口
export { default } from 'my_module';
export { es6 as default } from 'my_module';
export { default as es6 } from 'my_module';



/**
*   模块的继承
*/
// 模块之间也可以继承。
export * from 'circle';
export var e = 2.718;
export default function(x) {
    return Math.exp(x);
}
// 注意，export *命令会忽略circle模块的default方法。然后，上面代码又输出了自定义的e变量和默认方法。



/**
*   跨模块常量
*/
// const声明的常量只在当前代码块有效。如果想设置跨模块的常量（即跨多个文件），或者说一个值要被多个模块共享，可以采用下面的写法。

// constants.js模块
export const A = 1;
export const B = 2;
export const C = 2;

// 使用这些跨模块的常量
import * as constants from './constants.js';
console.log(constants.A);
// 另一种使用方式
import { A, B } from './constants.js';
console.log(B);


// 如果要使用的常量非常多，可以建立一个常量目录，把这些常量分模块进行定义，再统一导出。做法如下：
// constants/db.js
export const db = {
    url: 'http://my.local:8000',
    admin: 'root',
    pwd: '123456'
};
// constants/user.js
export const users = ['root', 'admin', 'staff', 'ceo'];

// 合并常量，统一导出
// constants/index.js
export { db } from './db.js';
export { users } from './users.js';

// 使用这些常量
import { db, users } from './index.js';




/**
*   import()
*/
// import命令会被 JavaScript 引擎静态分析，先于模块内的其他语句执行。也就是说，import和export命令只能在模块的顶层，不能在代码块之中。

// 这样的设计，固然有利于编译器提高效率，但也导致无法在运行时加载模块。在语法上，条件加载就不可能实现。如果import命令要取代 Node 的require方法，这就形成了一个障碍。因为require是运行时加载模块，import命令无法取代require的动态加载功能。

// 提案：建议引入 import()，实现动态加载功能。像node.js的require()一样
const path = './' + fileName;
let myModule = null;
if (bol) {
    myModule = require(path);
}
