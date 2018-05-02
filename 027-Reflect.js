/**
* Reflect 对象
*/

// Reflect对象的设计目的有这样几个。

// （1） 将Object对象的一些明显属于语言内部的方法（比如Object.defineProperty），放到Reflect对象上。现阶段，某些方法同时在Object和Reflect对象上部署，未来的新方法将只部署在Reflect对象上。也就是说，从Reflect对象上可以拿到语言内部的方法。

// （2） 修改某些Object方法的返回结果，让其变得更合理。比如，Object.defineProperty(obj, name, desc)在无法定义属性时，会抛出一个错误，而Reflect.defineProperty(obj, name, desc)则会返回false。

// （3） 让Object操作都变成函数行为。某些Object操作是命令式，比如name in obj和delete obj[name]，而Reflect.has(obj, name)和Reflect.deleteProperty(obj, name)让它们变成了函数行为。

// （4）Reflect对象的方法与Proxy对象的方法一一对应，只要是Proxy对象的方法，就能在Reflect对象上找到对应的方法。这就让Proxy对象可以方便地调用对应的Reflect方法，完成默认行为，作为修改行为的基础。也就是说，不管Proxy怎么修改默认行为，你总可以在Reflect上获取默认行为。



/**
* Reflect对象一共有 13 个静态方法
*/
/*
    Reflect.apply(target, thisArg, args)
    Reflect.construct(target, args)
    Reflect.get(target, name, receiver)
    Reflect.set(target, name, value, receiver)
    Reflect.defineProperty(target, name, desc)
    Reflect.deleteProperty(target, name)
    Reflect.has(target, name)
    Reflect.ownKeys(target)
    Reflect.isExtensible(target)
    Reflect.preventExtensions(target)
    Reflect.getOwnPropertyDescriptor(target, name)
    Reflect.getPrototypeOf(target)
    Reflect.setPrototypeOf(target, prototype)
*/
// 上面这些方法的作用，大部分与Object对象的同名方法的作用都是相同的，而且它与Proxy对象的方法是一一对应的。

Reflect.get方法查找并返回target对象的name属性，如果没有该属性，则返回undefined。

Reflect.set方法设置target对象的name属性等于value。

Reflect.has方法对应name in obj里面的in运算符。

Reflect.deleteProperty方法等同于delete obj[name]，用于删除对象的属性。

Reflect.construct方法等同于new target(...args)，这提供了一种不使用new，来调用构造函数的方法。

Reflect.getPrototypeOf方法用于读取对象的__proto__属性，对应Object.getPrototypeOf(obj)。

Reflect.setPrototypeOf方法用于设置对象的__proto__属性，返回第一个参数对象，对应Object.setPrototypeOf(obj, newProto)。

Reflect.apply方法等同于Function.prototype.apply.call(func, thisArg, args)，用于绑定this对象后执行给定函数。

Reflect.defineProperty方法基本等同于Object.defineProperty，用来为对象定义属性。未来，后者会被逐渐废除，请从现在开始就使用Reflect.defineProperty代替它。

Reflect.getOwnPropertyDescriptor基本等同于Object.getOwnPropertyDescriptor，用于得到指定属性的描述对象，将来会替代掉后者。

Reflect.isExtensible方法对应Object.isExtensible，返回一个布尔值，表示当前对象是否可扩展。

Reflect.preventExtensions对应Object.preventExtensions方法，用于让一个对象变为不可扩展。它返回一个布尔值，表示是否操作成功。

Reflect.ownKeys方法用于返回对象的所有属性，基本等同于Object.getOwnPropertyNames与Object.getOwnPropertySymbols之和。




/**
* 实例：使用 Proxy实现观察者模式
*/
// 观察者模式（Observer mode）指的是函数自动观察数据对象，一旦对象有变化，函数就会自动执行。

let person = observable({
    name: 'geek',
    age: 20
});

function print() {
    console.log('有数据发生了变化');
}

observe(print);
person.name = 'xia';
// '有数据发生了变化'

// 上述代码中，数据对象person是观察目标，函数print是观察者。一旦数据对象发生变化，print就会自动执行。

// 下面，使用 Proxy 写一个观察者模式的最简单实现，即实现observable和observe这两个函数。思路是observable函数返回一个原始对象的 Proxy 代理，拦截赋值操作，触发充当观察者的各个函数。

const queuedObservers = new Set();
const observe = fn => queuedObservers.add(fn);
const observable = obj => new Proxy(obj, {
    set: function(target, key, value, receiver) {
        const result = Reflect.set(target, key, value, receiver);
        queuedObservers.forEach(observer => observer());
        return result;
    },
    get: function(target, key) {
        console.log('有值被读取了');
        return target[key];
    }
});

// 上面代码中，先定义了一个Set集合，所有观察者函数都放进这个集合。然后，observable函数返回原始对象的代理，拦截赋值操作。拦截函数set之中，会自动执行所有观察者。
