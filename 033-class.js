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



/**
*   constructor 方法
*/
// constructor方法是类的默认方法，通过new命令生成对象实例时，自动调用该方法。一个类必须有constructor方法，如果没有显式定义，一个空的constructor方法会被默认添加。

// constructor方法默认返回实例对象（即this），完全可以指定返回另外一个对象。

class  Foo {
    constructor() {
        // 自定义返回值
        return Object.create(null);
    }
}
new Foo() instanceof Foo;   // false

// 类必须使用new调用，否则会报错。这是它跟普通构造函数的一个主要区别，后者不用new也可以执行。



/**
*   类的实例对象
*/
// 与 ES5 一样，实例的属性除非显式定义在其本身（即定义在this对象上），否则都是定义在原型上（即定义在class上）。
class Point {
    constructor(x, y) {
        this.x = x;    // 实例属性
        this.y = y;
    }
    toString() {}      // 类属性
}
var p = new Point(1, 2);

p.hasOwnProperty('x');  // true
p.hasOwnProperty('y');  // true
p.hasOwnProperty('toString');   // false
p.__proto__.hasOwnProperty('toString');  // true

// 与 ES5 一样，类的所有实例共享一个原型对象。
var p2 = new Point(4, 5);
p.__proto__ === p2.__proto__ === Point.prototype;   // true

// 可以通过实例的__proto__属性为“类”添加方法。
p.__proto__.print = function() {
    console.log('打印');
}
p2.print();

// __proto__ 并不是语言本身的特性，这是各大厂商具体实现时添加的私有属性，虽然目前很多现代浏览器的 JS 引擎中都提供了这个私有属性，但依旧不建议在生产中使用该属性，避免对环境产生依赖。生产环境中，我们可以使用 Object.getPrototypeOf 方法来获取实例对象的原型，然后再来为原型添加方法/属性。




/**
*   class 表达式
*/
const MyClass = class Me {
    getClassName() {
        return Me.name;
    }
};
// 需要注意的是，这个类的名字是MyClass而不是Me，Me只在 Class 的内部代码可用，指代当前类。

// 如果类的内部没用到的话，可以省略Me，也就是可以写成下面的形式。
const MyClass = class  { };

// 采用 Class 表达式，可以写出立即执行的 Class。
let person = new Class {
    constructor(name) {
        this.name = name;
    }
    sayName() {
        console.log(this.name);
    }
}('张三');

person.sayName();   // '张三'



/**
*   class类 不存在变量提升
*/
// 类不存在变量提升（hoist），这一点与 ES5 完全不同。
new Bar();   // 报错
class Bar { };

// 类 使用在前，定义在后，这样会报错，因为 ES6 不会把类的声明提升到代码头部。这种规定的原因与下文要提到的继承有关，必须保证子类在父类之后定义。

// let 、 const 也不存在变量提升



/**
*   类的公有方法和私有方法
*/
class Widget {
    // 公有方法
    foo() {}
}
// 公有方法，在类的外部可以被调用

// 实现类私有方法的方案一
// 将私有方法移出模块，因为模块内部的所有方法都是对外可见的。
function bar(x) {
    return this.x = x;
}
class Widget {
    foo(x) {
        // bar变成了类的私有方法
        bar.call(this, x);
    }
}

// 实现类私有方法的方案二
// 利用Symbol值的唯一性，将私有方法的名字命名为一个Symbol值。
const bar = Symbol('bar');
const snaf = Symbol('snaf');
export default class Widget {
    // 公有方法
    foo(x) {
        this[bar](x);
    }
    // 私有方法
    [bar](x) {
        return this[snaf] = x;
    }
}
// 上面代码中，bar和snaf都是Symbol值，导致第三方无法获取到它们，因此达到了私有方法和私有属性的效果。

// 与私有方法一样，ES6 不支持私有属性。



/**
*   this 的指向
*/
// 类的方法内部如果含有this，它默认指向类的实例。

// this 绑定当前类的实例 方案一
// 在构造方法中绑定this
class Log {
    constructor() {
        this.print.bind(this);
    }
    print() {}
}

// this 绑定当前类的实例 方案二
// 使用箭头函数。
class Log {
    constructor() {
        this.print = () => {};
    }
}

// this 绑定当前类的实例 方案三
// 使用Proxy，获取方法的时候，自动绑定this。
function selfish (target) {
    const cache = new WeakMap();
    return proxy = new Proxy(target, {
        get (target, key) {
            const value = Reflect.get(target, key);
            if (typeof value !== 'function') {
                return value;
            }
            if (!cache.has(value)) {
                // 绑定当前对象target
                cache.set(value, value.bind(target));
            }
            return cache.get(value);
        }
    });
}
class Log { print() {} };
const log = selfish(new Log());



/**
*   name 属性
*/
// 由于本质上，ES6 的类只是 ES5 的构造函数的一层包装，所以函数的许多特性都被Class继承，包括name属性。
class Point {};
Point.name;   // 'Point'

// name属性总是返回紧跟在class关键字后面的类名。



/**
*   Class 的取值函数（getter）和存值函数（setter）
*/
// 与 ES5 一样，在“类”的内部可以使用get和set关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为。
class MyClass {
    constructor() {}
    get age() {
        console.log('发生了 age 取值操作');
    }
    set age() {
        console.log('发生了 age 赋值操作');
    }
}
let inst = new MyClass();
inst.age = 20;   // '发生了 age 赋值操作'
inst.age;        // '发生了 age 取值操作'

// 存值函数和取值函数是设置在属性的 Descriptor 对象上的。
var descriptor = Object.getOwnPropertyDescriptor(MyClass.prototype, 'age');
'get' in descriptor;   // true
'set' in descriptor;   // true



/**
*   Class类中的 Generator 方法
*/
// 如果某个方法之前加上星号（*），就表示该方法是一个 Generator 函数。
class Foo {
    constructor(...args) {
        this.args = args;
    }
    * [Symbol.iterator]() {
        for (let arg of this.args) {
            yield arg;
        }
    }
}

for (let x of new Foo('a', 'b')) {
    console.log(x);
}
// 'a'
// 'b'

// Foo类的Symbol.iterator方法前有一个星号，表示该方法是一个 Generator 函数。Symbol.iterator方法返回一个Foo类的默认遍历器，for...of循环会自动调用这个遍历器。



/**
*   class中的 静态方法和实例方法
*/
// 类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前，加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”
class Foo {
    // 实例方法，this指定类的实例
    fn1() {
        console.log(this);
    }

    // 静态方法，this指向类
    static fn2() {
        console.log(this);
    }
}

Foo.fn2();
var f = new Foo();
f.fn1();

// 注意，如果静态方法包含this关键字，这个this指的是类，而不是实例。

// 静态方法可以与非静态方法重名。

// 父类的静态方法，可以被子类继承。
class Foo {
    static fn() {}
}
class Bar extends Foo { }

Bar.fn();

// 静态方法也是可以从super对象上调用的。
// super指向父类
class Doo extends Foo {
    static fn2() {
        super.fn();
    }
}



/**
*   class中 的静态属性和实例属性
*/
// 静态属性指的是 Class 本身的属性，即Class.propName，而不是定义在实例对象（this）上的属性。
class Foo {
    constructor() {
        this.prop = 0;  // 实例属性
    }
};
Foo.prop = 1;   // 类的静态属性

// 类的静态属性只有上述这种写法，因为 ES6 明确规定，Class 内部只有静态方法，没有静态属性。

// 实例属性，只能写在类的constructor方法里面。



/**
*   new.target
*/
// 在 Class 内部调用new.target，返回当前 Class。
// 子类继承父类时，new.target会返回子类。
class Foo {
    constructor() {
        console.log(new.target === Foo);  // true
    }
}

// 在构造函数之中，new命令作用于的那个构造函数。如果构造函数不是通过new命令调用的，new.target会返回undefined
function Person() {
    if (new.target === Person) {
        console.log('使用了 new 创建实例');
    }
    if (new.target === undefined) {
        console.log('未使用 new 创建实例');
    }
}
