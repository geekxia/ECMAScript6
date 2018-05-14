// 上一章介绍了模块的语法，本章介绍如何在浏览器和 Node 之中加载 ES6 模块，以及实际开发中经常遇到的一些问题（比如循环加载）。

/**
*   浏览器中的模块加载（传统做法）
*/
// 内嵌脚本
<script type="application/javascript">
    // some js code
</script>

// 加载外部脚本
<script type="application/javascript" src='./some.js'></script>

// 由于浏览器脚本的默认语言是 JavaScript，因此type="application/javascript"可以省略。
// 默认情况下，浏览器是同步加载 JavaScript 脚本，即渲染引擎遇到<script>标签就会停下来，等到执行完脚本，再继续向下渲染。

// 浏览器端也可以异步加载js脚本
<script src="path/to/myModule.js" defer></script>
<script src="path/to/myModule.js" async></script>

// defer与async的区别是：defer要等到整个页面在内存中正常渲染结束（DOM 结构完全生成，以及其他脚本执行完成），才会执行；async一旦下载完，渲染引擎就会中断渲染，执行这个脚本以后，再继续渲染。一句话，defer是“渲染完再执行”，async是“下载完就执行”。另外，如果有多个defer脚本，会按照它们在页面出现的顺序加载，而多个async脚本是不能保证加载顺序的。



/**
*   在浏览器中加载 ES6 模块
*/
// 浏览器加载 ES6 模块，也使用<script>标签，但是要加入type="module"属性。

// 浏览器对于带有type="module"的<script>，都是异步加载，不会造成堵塞浏览器，即等到整个页面渲染完，再执行模块脚本，等同于打开了<script>标签的defer属性。
<script type="module" src="./foo.js"></script>
<!-- 等同于 -->
<script type="module" src="./foo.js" defer></script>

<script type="module">
  import utils from "./utils.js";
  // other code
</script>

// 浏览器下加载 ES6模块，以下点须注意：
/*
    代码是在模块作用域之中运行，而不是在全局作用域运行。模块内部的顶层变量，外部不可见。
    模块脚本自动采用严格模式，不管有没有声明use strict。
    模块之中，可以使用import命令加载其他模块（.js后缀不可省略，需要提供绝对 URL 或相对 URL），也可以使用export命令输出对外接口。
    模块之中，顶层的this关键字返回undefined，而不是指向window。也就是说，在模块顶层使用this关键字，是无意义的。
    同一个模块如果加载多次，将只执行一次。
*/



/**
*   ES6 模块与 CommonJS 模块的差异
*/
// 差异一
// CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。CommonJS 模块输出的是值的拷贝，也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。ES6 模块是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块。

// 差异二
// CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。
// CommonJS 加载的是一个对象（即module.exports属性），该对象只有在脚本运行完才会生成。而 ES6 模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成。




/**
*   在 Node.js 环境中加载 ES6 模块
*/
// Node 对 ES6 模块的处理比较麻烦，因为它有自己的 CommonJS 模块格式，与 ES6 模块格式是不兼容的。目前的解决方案是，将两者分开，ES6 模块和 CommonJS 采用各自的加载方案。

// Node 要求 ES6 模块采用.mjs后缀文件名。也就是说，只要脚本文件里面使用import或者export命令，那么就必须采用.mjs后缀名。require命令不能加载.mjs文件，会报错，只有import命令才可以加载.mjs文件。反过来，.mjs文件里面也不能使用require命令，必须使用import。
// Node 的import命令是异步加载，这一点与浏览器中的ES6模块加载处理方法相同。

// ES6 模块之中，顶层的this指向undefined；CommonJS 模块的顶层this指向当前模块，这是两者的一个重大差异。

// 其次，以下这些顶层变量在 ES6 模块之中都是不存在的。
/*
    arguments
    require
    module
    exports
    __filename
    __dirname
*/



/**
*   ES6 模块中 加载 CommonJS 模块
*/
import * as express from 'express';
// 或者
import expres from 'express';



/**
*   CommonJS 模块中 加载 ES6 模块
*/
// CommonJS 模块加载 ES6 模块，不能使用require命令，而要使用import()函数。
const es = await import('./es.js');




/**
*   模块的循环加载
*/
// “循环加载”（circular dependency）指的是，a脚本的执行依赖b脚本，而b脚本的执行又依赖a脚本。

// 通常，“循环加载”表示存在强耦合，如果处理不好，还可能导致递归加载，使得程序无法执行，因此应该避免出现。



/**
*   ES6 模块的转码
*/
// 浏览器目前还不支持 ES6 模块，为了现在就能使用，可以将转为 ES5 的写法。除了 Babel 可以用来转码之外，还有以下两个方法，也可以用来转码。

// ES6 module transpiler是 square 公司开源的一个转码器，可以将 ES6 模块转为 CommonJS 模块或 AMD 模块的写法，从而在浏览器中使用。

// 另一种解决方法是使用 SystemJS。它是一个垫片库（polyfill），可以在浏览器内加载 ES6 模块、AMD 模块和 CommonJS 模块，将其转为 ES5 格式。它在后台调用的是 Google 的 Traceur 转码器。
