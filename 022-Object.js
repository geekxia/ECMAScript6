/**
* Object.is()
*/
// ES5 比较两个值是否相等，只有两个运算符：相等运算符（==）和严格相等运算符（===）。它们都有缺点，前者会自动转换数据类型，后者的NaN不等于自身，以及+0等于-0。JavaScript 缺乏一种运算，在所有环境中，只要两个值是一样的，它们就应该相等。

// ES6 提出“Same-value equality”（同值相等）算法，用来解决这个问题。Object.is就是部署这个算法的新方法。它用来比较两个值是否严格相等，与严格比较运算符（===）的行为基本一致。

Object.is('foo', 'foo');   // true
Object.is({}, {});         // false

+0 === -0;   // true
NaN === NaN; // false

Object.is(+0, -0);  // false
Object.is(NaN, NaN);// true



/**
* Object.assign()
*/
// Object.assign方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）。
const tar = { a: 1 };
const s1 = { b: 2 };
const s2 = { c: 3 };
Object.assign(tar, s1, s2);  // { a: 1, b: 2, c: 3 }

// 如果只有一个参数，Object.assign会直接返回该参数。
Object.assign(tar) === tar;   // true

// Object.assign拷贝的属性是有限制的，只拷贝源对象的自身属性（不拷贝继承属性），也不拷贝不可枚举的属性（enumerable: false）。
Object.assign({b: 'c'},
  Object.defineProperty({}, 'invisible', {
    enumerable: false,
    value: 'hello'
  })
)
// { b: 'c' }

// 处理数组
Object.assign([1,2,3], [4,5]);
// [4,5,3]

// 属性名为 Symbol 值的属性，也会被Object.assign拷贝。
Object.assign({ a: 'b' }, { [Symbol('c')]: 'd' })
// { a: 'b', Symbol(c): 'd' }


/**
* Object.assign()的常见用途
*/
// 一、为对象添加新属性
class Point {
    constructor(x, y) {
        Object.assign(this, {x, y});
    }
}

// 二、为对象添加方法
Object.assign(Point.prototype, {
    method1() {},
    method2() {}
});

// 三、克隆对象
// 将原始对象拷贝到一个空对象，采用这种方法克隆，只能克隆原始对象自身的值，不能克隆它继承的值。
function clone (origin) {
    return Object.assign({}, origin);
}

// 连继承链上的属性也一起克隆
function clone (origin) {
    let originProto = Object.getPrototypeOf(origin);
    return Object.assign(Object.create(originProto), origin);
}

// 四、合并多个对象
const merge = (...sources) => Object.assign({}, ...sources);
const merge = (tar, ...sources) => Object.assign(tar, ...sources);

// 五、为属性指定默认值
const defaultOpt = {
    logLevel: 0,
    outputFormat: 'html'
}
function f (options) {
    options = Object.assign({}, defaultOpt, options);
    console.log(options);
}

// 注意：Object.assign方法实行的是浅拷贝，而不是深拷贝。遇到同名属性，Object.assign的处理方法是替换，而不是添加。


/**
* Object.getOwnPropertyDescriptor()
*/
// 对象的每个属性都有一个描述对象（Descriptor），用来控制该属性的行为。Object.getOwnPropertyDescriptor方法可以获取该属性的描述对象。

let obj = { foo: 123 };
Object.getOwnPropertyDescriptor(obj, 'foo');
// { value: 123, writable: true, enumerable: true, configurable: true }

// ES6 规定，所有 Class 的原型的方法都是不可枚举的。

// 有四个操作会忽略enumerable为false的属性。
/*
    for...in循环：只遍历对象自身的和继承的可枚举的属性。
    Object.keys()：返回对象自身的所有可枚举的属性的键名。
    JSON.stringify()：只串行化对象自身的可枚举的属性。
    Object.assign()： 忽略enumerable为false的属性，只拷贝对象自身的可枚举的属性。
*/


/**
* 属性的遍历
*/
// ES6 一共有 5 种方法可以遍历对象的属性。
/*
    for...in
    Object.keys()
    Object.getOwnPropertyNames()
    Object.getOwnPropertySymbols()
    Reflect.ownKeys()
*/


/**
* Object.getOwnPropertyDescriptors()
*/
// 返回指定对象所有自身属性（非继承属性）的描述对象。返回一个对象，所有原对象的属性名都是该对象的属性名，对应的属性值就是该属性的描述对象。
const obj = {
    foo: 123,
    get bar() { return 'abc'}
}
Object.getOwnPropertyDescriptors(obj);
// {
//     foo: {
//         value: 123,
//         writable: true,
//         enumerable: true,
//         configurable: true
//     },
//     bar: {
//         get: [Function: get bar],
//         set: undefined,
//         enumerable: true,
//         configurable: true
//     }
// }



/**
* __proto__
* Object.setPrototypeOf()
* Object.getPrototypeOf()
*/
// JavaScript 语言的对象继承是通过原型链实现的。ES6 提供了更多原型对象的操作方法。

// 果一个对象本身部署了__proto__属性，该属性的值就是对象的原型。

// Object.setPrototypeOf方法的作用与__proto__相同，用来设置一个对象的prototype对象，返回参数对象本身。它是 ES6 正式推荐的设置原型对象的方法。

// 该方法与Object.setPrototypeOf方法配套，用于读取一个对象的原型对象。



/**
* super关键字
*/
// this关键字总是指向函数所在的当前对象，ES6 又新增了另一个类似的关键字super，指向当前对象的原型对象。

// super关键字表示原型对象时，只能用在对象的方法之中，用在其他地方都会报错。



/**
* Object.keys()
* Object.values()
* Object.entries()
*/
// 实现Object.entries()方法
function entries(obj) {
    let arr = [];
    for(let key of Object.keys(obj)) {
        arr.push([key, obj[key]]);
    }
    return arr;
}
