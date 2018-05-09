/**
*   类的修饰  decorator(target) {}
*/
// 许多面向对象的语言都有修饰器（Decorator）函数，用来修改类的行为。
@testable
class MyClass {};

function testable(target) {
    target.isTestable = true;
}

MyClass.isTestable;  // true

// 上面代码中，@testable就是一个修饰器。它修改了MyClass这个类的行为，为它加上了静态属性isTestable。


// 基本语法
@decorator
class A {};

// 等同于
class A {};
A = decorator(A) || A;

// 也就是说，修饰器是一个对类进行处理的函数。修饰器函数的第一个参数，就是所要修饰的目标类。
function decorator(target) {
    target.age = 20;   // 为类添加静态属性
    target.prototype.grade = 3;  // 为类添加实例属性
}

// 注意，修饰器对类的行为的改变，是代码编译时发生的，而不是在运行时。这意味着，修饰器能在编译阶段运行代码。也就是说，修饰器本质就是编译时执行的函数。


// 如果觉得一个参数不够用，可以在修饰器外面再封装一层函数。见下面例子：
// 定义装饰器的外层函数
function mixins(...list) {
    // 返回一个装饰器函数
    return function(target) {
        Object.assign(target.prototype, ...list);
    }
}

const args = {
    f1() {}
    f2() {}
    f3() {}
};

// 使用mixins装饰器
@mixins(args)
class MyClass {};

let inst = new MyClass();
inst.f3();


// 实例：实际开发中，React 与 Redux 库结合使用时，常常需要写成下面这样。
class MyComponent extends React.Component {};
export default connect(mapStateToProps, mapDispatchToProps)(MyComponent);

// 有了装饰器，就可以改写上面的代码。
@connect(mapStateToProps, mapDispatchToProps)
export default class MyComponent extends React.Component {};




/**
*   修饰类的方法  decorator(target, key, descriptor) {}
*/
// 修饰器不仅可以修饰类，还可以修饰类的属性。
class Person {
    @readonly
    // readonly(Person.prototype, 'name', descriptor);
    // 类似于
    // Object.defineProperty(Person.prototype, 'name', descriptor);
    name() { return `${this.name}` }
}
// 定义 readonly装饰器
/*
    第一个参数是类的原型对象
    第二个参数是所要修饰的属性名
    第三个参数是该属性的描述对象
*/
function readonly(target, key, descriptor) {
    // descriptor对象原来的值如下
    // {
    //     value: specifiedFunction,
    //     enumerable: false,
    //     configurable: true,
    //     writable: true
    // }
    decorator.writable = false;  // 不可写
    return descriptor;
}


// 再例
class A {
    @nonenumerable
    get kidCount() {
        return this.children.length;
    }
}
function nonenumerable(target, key, descriptor) {
    descriptor.enumerable = false;
    return descriptor;
}


// 再例
class Math {
    @log
    add(a, b) {
        return a + b;
    }
}
function log(target, key, descriptor) {
    var oldValue = descriptor.value;
    // 修改 descriptor属性
    descriptor.value = function() {
        console.log(`${name}`, arguments);
        return oldValue.apply(this, arguments);
    }
    return descriptor;
}

// 修饰器还起到了注释的作用。
// 用装饰器写组件
@Component({
    tag: 'my-component',
    styleUrl: 'my-component.scss'
})
export class MyComponent {
    @Prop() first: string;
    @Prop() last: string;
    @State() isVisible: boolean = true;

    render() {
        return(
            <p>my name is {this.first} {this.last}</p>
        )
    }
}

// 如果同一个方法有多个修饰器，会像剥洋葱一样，先从外到内进入，然后由内向外执行。
// 定义一个装饰器的外层包装函数
function dec(id) {
    // 返回一个用于修饰类成员的装饰器
    return (target, key, descriptor) => {
        descriptor.writable = false;
    }
}
class Demo {
    @dec(1)
    @dec(2)
    @dec(3)
    method() {}
}
// 装饰器的进入顺序：dec(1) -> dec(2) -> dec(3)
// 装饰器的执行顺序：dec(3) -> dec(2) -> dec(1)

// 除了注释，修饰器还能用来类型检查。所以，对于类来说，这项功能相当有用。从长期来看，它将是 JavaScript 代码静态分析的重要工具。




/**
*   为什么修饰器不能用于函数？
*/
// 修饰器只能用于类和类的方法，不能用于修饰函数，因为存在函数提升。
// 由于存在函数提升，使得修饰器不能用于函数。类是不会提升的，所以就没有这方面的问题。

// 如果一定要修饰函数，可以采用高阶函数的形式直接执行。
function decoratorFn(fn) {
    return function() {
        const res = fn.apply(this, arguments);
        return res;
    }
}

function doSomething() {};
const doSomething2 = decoratorFn(doSomething);



/**
*   core-decorators.js
*/
// core-decorators.js是一个第三方模块，提供了几个常见的修饰器，通过它可以更好地理解修饰器。
/*
    （1）@autobind  修饰器使得方法中的this对象，绑定原始对象。
    （2）@readonly  修饰器使得属性或方法不可写。
    （3）@override  修饰器检查子类的方法，是否正确覆盖了父类的同名方法，如果不正确会报错。
    （4）@deprecate 或 @deprecated  修饰器在控制台显示一条警告，表示该方法将废除。
    （5）@suppressWarnings  修饰器抑制deprecated修饰器导致的console.warn()调用。但是，异步代码发出的调用除外。
*/
import { autobind, readonly } from 'core-decorators';

class Person {
    @autobind
    getPerson() {
        return this;
    }

    @readonly
    age = 23;
}



/**
*   使用修饰器实现自动发布事件
*/
// 我们可以使用修饰器，使得对象的方法被调用时，自动发出一个事件。
// 使用的事件“发布/订阅”库  Postal.js
const postal = require('postal/lib/postal.lodash');

// 封装装饰器函数
export default function publish(topic, channel) {
    const channelName = channel || '/';
    const msgChannel = postal.channel(channelName);
    msgChannel.subscribe(topic, v => {
        console.log('频道', channelName);
        console.log('事件', topic);
        console.log('数据', v);
    });
    // 返回装饰器函数
    return function(target, key, descriptor) {
        const fn = descriptor.value;
        descriptor.value = function() {
            let value = fn.apply(this, arguments);
            msgChannel.publish(topic, value);
        }
    };
}

// 使用装饰器
import publish from './publish.js';
class FooComponent {
    @publish('foo.some.message', 'component')
    someMethod() {
        return { a: 1 };
    }
    @publish('foo.some.other')
    anotherMethod() {
        return { b: 2 };
    }
}
let foo = new FooComponent();
foo.someMethod();
foo.anotherMethod();



/**
*   Mixin
*/
// 在修饰器的基础上，可以实现Mixin模式。所谓Mixin模式，就是对象继承的一种替代方案，中文译为“混入”（mix in），意为在一个对象之中混入另外一个对象的方法。
function mix(...list) {
    return function (target) {
        Object.assign(target.prototype, ...list);
    };
}



/**
*   Trait
*/
// Trait 也是一种修饰器，效果与 Mixin 类似，但是提供更多功能，比如防止同名方法的冲突、排除混入某些方法、为混入的方法起别名等等。
import { traits, alias } from 'traits-decorator';

class TFoo {
    foo() { console.log('foo'); }
}
const obj = {
    bar() { console.log('bar');},
    foo() { console.log('foo');}
}
@traits(TFoo, obj::alias({foo: 'aliasFoo'}))
class MyClass {};

let inst = new MyClass();
inst.foo();
inst.bar();
inst.aliasFoo();



/**
*   Babel 转码器 支持装饰器
*/
// 目前，Babel 转码器已经支持 Decorator。

// 首先，安装babel-core和babel-plugin-transform-decorators。由于后者包括在babel-preset-stage-0之中，所以改为安装babel-preset-stage-0亦可。

// 然后，设置配置文件.babelrc。
{
    "plugins": ["transform-decorators"]
}

// Babel 的官方网站提供一个在线转码器，只要勾选 Experimental，就能支持 Decorator 的在线转码。
