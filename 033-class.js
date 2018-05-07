/**
*   ES5 中基于原型的构造函数
*/
function Point(x, y) {
    this.x = x;
    this.y = y;
}
Point.prototype.toString = function() {
    return `${this.x}, ${this.y}`;
}
// 创建实例
var p = new Point(1, 2);



/**
*   ES6 的 class关键字
*/
// ES6 引入了 Class（类）这个概念，作为对象的模板。通过class关键字，可以定义类。
// ES6 的class可以看作只是一个语法糖，它的绝大部分功能，ES5 都可以做到，新的class写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已。
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    toString() {
        return `${this.x}, ${this.y}`;
    }
}
// 创建实例
var p = new Point(1, 2);

// ES6 的类，完全可以看作构造函数的另一种写法。类的数据类型就是函数，类本身就指向构造函数。
typeof Point;   // 'function'
Point === Point.prototype.constructor;   // true


// 事实上，类的所有方法都定义在类的prototype属性上面。
// 由于类的方法都定义在prototype对象上面，所以类的新方法可以添加在prototype对象上面。Object.assign方法可以很方便地一次向类添加多个方法。
Object.assign(Point.prototype, {
    fn1(){},
    fn2(){},
    fn3(){}
});

// 类的内部所有定义的方法，都是不可枚举的（non-enumerable）。
Object.keys(Point.prototype);    // []
Object.getOwnPropertyNames(Point.prototype);   // ["constructor", "toString"]

// 类的属性名，可以采用表达式。
let methodName = 'getArea';
class  Square {
    constructor(length) {
        // ...
    }
    [methodName]() {
        // ...
    }
}



/**
*   严格模式
*/
// 类和模块的内部，默认就是严格模式，所以不需要显示地使用use strict指定运行模式。只要你的代码写在类或模块之中，就只有严格模式可用。

// 考虑到未来所有的代码，其实都是运行在模块之中，所以 ES6 实际上把整个语言升级到了严格模式。
