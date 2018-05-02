/**
* Proxy概述
*/
// Proxy 用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种“元编程”（meta programming），即对编程语言进行编程。

// Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。Proxy 这个词的原意是代理，用在这里表示由它来“代理”某些操作，可以译为“代理器”。

// ES6 原生提供 Proxy 构造函数，用来生成 Proxy 实例。
var proxy = new Proxy(target, handler);

// Proxy 对象的所有用法，都是上面这种形式，不同的只是handler参数的写法。其中，new Proxy()表示生成一个Proxy实例，target参数表示所要拦截的目标对象，handler参数也是一个对象，用来定制拦截行为。

// 注意，要使得Proxy起作用，必须针对Proxy实例（上例是proxy对象）进行操作，而不是针对目标对象（target）进行操作。

// 如果handler没有设置任何拦截，那就等同于直接通向原对象。

var handler = {
    get: function(target, name) {
        if(name === 'prototype') {
            return Object.prototype;
        }
        return 'Hello, '+name;
    },
    apply: function(target, thisBinding, args) {
        return args[0];
    },
    construct: function(target, args) {
        return { value: args[1] };
    }
};

var fproxy = new Proxy(function(x,y) {
    return x + y;
}, handler);

fproxy(1, 2);  // 1
new fproxy(1, 2);  // { value: 2 }
fproxy.prototype === Object.prototype;   // true
fproxy.foo;   // 'Hello, foo'


/**
* Proxy支持的 13种拦截操作
*/
/*
    get(target, propKey, receiver)：拦截对象属性的读取，比如proxy.foo和proxy['foo']。

    set(target, propKey, value, receiver)：拦截对象属性的设置，比如proxy.foo = v或proxy['foo'] = v，返回一个布尔值。

    has(target, propKey)：拦截propKey in proxy的操作，返回一个布尔值。

    deleteProperty(target, propKey)：拦截delete proxy[propKey]的操作，返回一个布尔值。

    ownKeys(target)：拦截Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys(proxy)、for...in循环，返回一个数组。该方法返回目标对象所有自身的属性的属性名，而Object.keys()的返回结果仅包括目标对象自身的可遍历属性。

    getOwnPropertyDescriptor(target, propKey)：拦截Object.getOwnPropertyDescriptor(proxy, propKey)，返回属性的描述对象。

    defineProperty(target, propKey, propDesc)：拦截Object.defineProperty(proxy, propKey, propDesc）、Object.defineProperties(proxy, propDescs)，返回一个布尔值。

    preventExtensions(target)：拦截Object.preventExtensions(proxy)，返回一个布尔值。

    getPrototypeOf(target)：拦截Object.getPrototypeOf(proxy)，返回一个对象。

    isExtensible(target)：拦截Object.isExtensible(proxy)，返回一个布尔值。

    setPrototypeOf(target, proto)：拦截Object.setPrototypeOf(proxy, proto)，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截。

    apply(target, object, args)：拦截 Proxy 实例作为函数调用的操作，比如proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)。

    construct(target, args)：拦截 Proxy 实例作为构造函数调用的操作，比如new proxy(...args)。
*/




/**
* Proxy.revocable()
*/
// Proxy.revocable方法返回一个可取消的 Proxy 实例。

// Proxy.revocable的一个使用场景是，目标对象不允许直接访问，必须通过代理访问，一旦访问结束，就收回代理权，不允许再次访问。

let { proxy, revoke } = Proxy.revocable({}, {});
proxy.foo = 123;
proxy.foo;  // 123
revoke();   // 取消proxy实例
proxy.foo;  // TypeError: Revoked



/**
* this 问题
*/
// 虽然 Proxy 可以代理针对目标对象的访问，但它不是目标对象的透明代理，即不做任何拦截的情况下，也无法保证与目标对象的行为一致。主要原因就是在 Proxy 代理的情况下，目标对象内部的this关键字会指向 Proxy 代理。

const target = {
  m: function () {
    console.log(this === proxy);
  }
};
const handler = {};

const proxy = new Proxy(target, handler);

target.m() // false
proxy.m()  // true



/**
* Proxy 应用举例：Web服务的客户端
*/
// Proxy 对象可以拦截目标对象的任意属性，这使得它很合适用来写 Web 服务的客户端。
function createWebService(baseUrl) {
  return new Proxy({}, {
    get(target, propKey, receiver) {
      return () => httpGet(baseUrl+'/' + propKey);
    }
  });
}

// 同理，Proxy 也可以用来实现数据库的 ORM 层。
