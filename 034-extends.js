/**
*   extends 继承
*/
// Class 可以通过extends关键字实现继承，这比 ES5 的通过修改原型链实现继承，要清晰和方便很多。
class Point {};
class ColorPoint extends Point {
    constructor(x, y, color) {
        super(x, y);   // 调用父类的 constructor(x, y)
        this.color = color;
    }
    toString() {
        return this.color + ' ' + super.toString();  // 调用父类的toString()方法
    }
}

// 子类必须在constructor方法中调用super方法，否则新建实例时会报错。这是因为子类自己的this对象，必须先通过父类的构造函数完成塑造，得到与父类同样的实例属性和方法，然后再对其进行加工，加上子类自己的实例属性和方法。如果不调用super方法，子类就得不到this对象。

// 如果子类没有定义constructor方法，这个方法会被默认添加，代码如下。也就是说，不管有没有显式定义，任何一个子类都有constructor方法。
class ColorPoint extends Point {};
// 等同于
class ColorPoint extends Point {
    constructor(...args) {
        super(...args);
    }
}

// 在子类的构造函数中，只有调用super之后，才可以使用this关键字，否则会报错。这是因为子类实例的构建，是基于对父类实例加工，只有super方法才能返回父类实例。

// 子类实例，同时是子类和父类的实例
var cp = new ColorPoint();
cp instanceof ColorPoint;   // true
cp instanceof Point;    // true

// 父类的静态方法，会被子类继承。
class A {
    static hello() {}
}
class B extends A {};

B.hello();   // 类 B，继承了类 A 的静态方法。



/**
*   Object.getPrototypeOf()
*/
// Object.getPrototypeOf方法可以用来从子类上获取父类。可以使用这个方法判断，一个类是否继承了另一个类。
Object.getPrototypeOf(ColorPoint) === Point;  // true




/**
*   super 关键字
*/
// super这个关键字，既可以当作函数使用，也可以当作对象使用。在这两种情况下，它的用法完全不同。

// 第一种情况，super作为函数调用时，代表父类的构造函数。ES6 要求，子类的构造函数必须执行一次super函数。
// super虽然代表了父类A的构造函数，但是返回的是子类B的实例，即super内部的this指的是B，因此super()在这里相当于A.prototype.constructor.call(this)。
class A {
    constructor() {
        console.log(new.target.name);
    }
}
class B extends A {
    constructor() {
        super();
    }
}

new A();    // A
new B();    // B

// new.target指向当前正在执行的函数
// 作为函数时，super()只能用在子类的构造函数之中，用在其他地方就会报错。


// 第二种情况，super作为对象时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类。
class A {
    p() {}
}
class B extends A {
    constructor() {
        super();    // super作为函数，执行父类的构造函数，返回子类实例
        super.p();  // super作为对象，指向父类的原型A.prototype 或者 父类A
    }
}
// 这里需要注意，由于super指向父类的原型对象或父类，所以定义在父类实例上的方法或属性，是无法通过super调用的。
// 如果super作为对象，用在静态方法之中，这时super将指向父类，而不是父类的原型对象。

// super小结
/*
    1、在子类的构造器中调用super()时，执行的是父类的构造器，并返回子类实例。
    2、在子类的非静态方法中使用super对象时，super指向父类的原型，即 super = A.prototype ，此时 this 指向子类实例。
    3、在子类的静态方法中使用super对象时，super指向父类，即 super = A ，此时 this 指向子类。
*/


// 由于对象总是继承其他对象的，所以可以在任意一个对象中，使用super关键字。
var obj = {
    toString() {
        super.toString();  // 在普通对象中使用 super
    }
}




/**
*   类的 prototype 属性 和 __proto__ 属性
*/
// 大多数浏览器的 ES5 实现之中，每一个对象都有__proto__属性，指向对应的构造函数的prototype属性。Class 作为构造函数的语法糖，同时有prototype属性和__proto__属性。
/*
（1）子类的__proto__属性，表示构造函数的继承，总是指向父类。
（2）子类prototype属性的__proto__属性，表示方法的继承，总是指向父类的prototype属性。
*/
class A {};
class B extends A {};

B.__proto__ === A;  // true
B.prototype.__proto__ === A.prototype;  // true

// 这两条继承链，可以这样理解：作为一个对象，子类（B）的原型（__proto__属性）是父类（A）；作为一个构造函数，子类（B）的原型对象（prototype属性）是父类的原型对象（prototype属性）的实例。


// 手动实现继承
class M {};
class N {};
Object.setPrototypeOf(N.prototype, M.prototype);
Object.setPrototypeOf(N, M);
Object.setPrototypeOf = function(obj, proto) {
    obj.__proto__ = proto;
    return obj;
}



/**
*   extends 的继承目标
*/
// extends关键字后面可以跟多种类型的值。

// 第一种特殊情况，子类继承Object类。
class C extends Object {};
C.__proto__ === Object;  // true
C.prototype.__proto__ === Object.prototype;  // true
// A其实就是构造函数Object的复制，A的实例就是Object的实例。


// 第二种特殊情况，不存在任何继承。
class C {};
C.__proto__ === Function.prototype;  // true
C.prototype.__proto__ === Object.prototype;  // true


// 第三种特殊情况，子类继承null。
class C extends null {};
C.__proto__ === Function.prototype;  // true
C.prototype.__proto__ === undefined;  // true


/**
*   实例的 __proto__ 属性
*/
// 子类实例的__proto__属性的__proto__属性，指向父类实例的__proto__属性。也就是说，子类的原型的原型，是父类的原型。
var a = new A();
var b = new B();

b.__proto__.__proto__ = a.__proto__;  // true



/**
*   js 原生构造函数的继承
*/
// 原生构造函数是指语言内置的构造函数，通常用来生成数据结构。ECMAScript 的原生构造函数大致有下面这些。
/*
    Boolean()
    Number()
    String()
    Array()
    Date()
    Function()
    RegExp()
    Error()
    Object()
*/
// 在 ES5 中，这些原生构造函数是无法被继承的。

// ES6 允许继承原生构造函数 定义子类，因为 ES6 是先新建父类的实例对象this，然后再用子类的构造函数修饰this，使得父类的所有行为都可以继承。
class MyArray extends Array {
    constructor(...args) {
        super(...args);
    }
}
// 这意味着，ES6 可以自定义原生构造函数（比如Array、String等）的子类，这是 ES5 无法做到的。

// 上面这个例子也说明，extends关键字不仅可以用来继承类，还可以用来继承原生的构造函数。
class ExtendableError extends Error {
    constructor(msg) {
        super();
        this.msg = msg;
        this.stack = (new Error()).stack;
        this.name = this.constructor.name;
    }
}

class MyError extends ExtendableError {
    constructor(args) {
        super(args);
    }
}

var myerror = new MyError('geek');
myerror.msg;    // 'geek'
myerror instanceof Error;  // true
myerror.name;   // 'MyError'
myerror.stack;



/**
*   Mixin 模式的实现
*/
// Mixin 指的是多个对象合成一个新的对象，新对象具有全部成员的接口。

// Mixin 简单实现如下
const a = { a: 1 };
const b = { b: 2 };
const c = { ...a, ...b };
// c对象是a对象和b对象的合成，具有两者的接口。

// Mixin 混合生成一个新类，实现如下
function mix(...mixins) {
    class Mix {};
    for (let mixin of mixins) {
        copyProperties(Mix, mixin);   // 拷贝实例属性
        copyProperties(Mix.prototype, mixin.prototype); // 拷贝原型属性
    }
    return Mix;
}
function copyProperties(target, source) {
    for (let key of Reflect.ownKeys(source)) {
        if ( key !== 'constructor' && key !== 'prototype' && key !== 'name') {
            let desc = Object.getOwnPropertyDescriptor(source, key);
            Object.defineProperty(target, key, desc);
        }
    }
}

// 上面代码的mix函数，可以将多个对象合成为一个类。使用的时候，只要继承这个类即可。
class MyClass extends mix(Loggable, Serializable) {};
