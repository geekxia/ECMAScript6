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
