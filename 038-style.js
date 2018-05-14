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
