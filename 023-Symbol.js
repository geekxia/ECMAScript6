/**
* Symbol类型
*/
// ES5 的对象属性名都是字符串，这容易造成属性名的冲突。ES6 引入Symbol类型，就是为了从根本上防止属性名的冲突。

// ES6 引入了一种新的原始数据类型Symbol，表示独一无二的值。它是 JavaScript 语言的第七种数据类型，前六种是：undefined、null、布尔值（Boolean）、字符串（String）、数值（Number）、对象（Object）。

// Symbol 值通过Symbol函数生成。这就是说，对象的属性名现在可以有两种类型，一种是原来就有的字符串，另一种就是新增的 Symbol 类型。凡是属性名属于 Symbol 类型，就都是独一无二的，可以保证不会与其他属性名产生冲突。

let s = Symbol();
typeof s;   // 'symbol'

// 注意，Symbol函数前不能使用new命令，否则会报错。这是因为生成的 Symbol 是一个原始类型的值，不是对象。也就是说，由于 Symbol 值不是对象，所以不能添加属性。基本上，它是一种类似于字符串的数据类型。

// Symbol函数可以接受一个字符串作为参数，表示对 Symbol 实例的描述。
let s1 = Symbol('foo');
let s2 = Symbol('bar');

s1;   // Symbol(foo)
s2;   // Symbol(bar)

s1.toString();   // 'Symbol(foo)'
s2.toString();   // 'Symbol(bar)'

// 如果 Symbol 的参数是一个对象，就会调用该对象的toString方法，将其转为字符串，然后才生成一个 Symbol 值。
let s3 = Symbol({
    toString() {
        return 'abc';
    }
});
s3;   // Symbol(abc)


// 注意，Symbol函数的参数只是表示对当前 Symbol 值的描述，因此相同参数的Symbol函数的返回值是不相等的。
Symbol('foo') === Symbol('foo');   // false

// Symbol 值不能与其他类型的值进行运算，会报错。
let s4 = Symbol('geek');
"my symbol is " + s4;    // 报错

// 但是，Symbol 值可以显式转为字符串。
String(s4);  // 'Symbol(geek)'
s4.toString();  // 'Symbol(geek)'

// Symbol 值也可以转为布尔值，但是不能转为数值。
Boolean(s4);  // true
!s4;          // false




/**
* 作为属性名的 Symbol
*/
// 由于每一个 Symbol 值都是不相等的，这意味着 Symbol 值可以作为标识符，用于对象的属性名，就能保证不会出现同名的属性。这对于一个对象由多个模块构成的情况非常有用，能防止某一个键被不小心改写或覆盖。
let s = Symbol();
let obj = {};
obj[s] = 'hello';
// 等同于
Object.defineProperty(obj, s, {value: 'hello'});
obj[s];  // 'hello'

// 注意，Symbol 值作为对象属性名时，不能用点运算符。Symbol 值必须放在方括号之中。
let s2 = Symbol();
let obj2 = {
    // Symbol作为方法名
    [s2](args) { }
}
obj2[s2](1);

// Symbol 值作为属性名时，该属性还是公开属性，不是私有属性。



/**
* 消除魔术字符串
*/
// 魔术字符串指的是，在代码之中多次出现、与代码形成强耦合的某一个具体的字符串或者数值。风格良好的代码，应该尽量消除魔术字符串，改由含义清晰的变量代替。
const shapeType = {
    triangle: Symbol()
}
switch (type) {
    case shapeType.triangle:
        // ...
        break;
    default:
        // ...
}
// 可以发现shapeType.triangle等于哪个值并不重要，只要确保不会跟其他shapeType属性的值冲突即可。因此，这里就很适合改用 Symbol 值。



/**
* Symbol属性名的遍历：Object.getOwnPropertySymbols()
*/
// Symbol 作为属性名，该属性不会出现在for...in、for...of循环中，也不会被Object.keys()、Object.getOwnPropertyNames()、JSON.stringify()返回。但是，它也不是私有属性，有一个Object.getOwnPropertySymbols方法，可以获取指定对象的所有 Symbol 属性名。
const obj = {};
let a = Symbol('a');
let b = Symbol('b');
obj[a] = 'hello';
obj[b] = 'world';

const symbolArr = Object.getOwnPropertySymbols(obj);
symbolArr;  // [Symbol(a), Symbol(b)]



/**
* Reflect.ownKeys()
*/
// Reflect.ownKeys方法可以返回所有类型的键名，包括常规键名和 Symbol 键名。
let obj = {
    [Symbol('my_key')]: 1,
    enum: 2,
    nonEnum: 3
}
Reflect.ownKeys(obj);   // ['enum', 'nonEnum', Symbol(my_key)]



/**
* Symbol.for()
* Symbol.keyFor()
*/
// Symbol.for()与Symbol()这两种写法，都会生成新的 Symbol。它们的区别是，前者会被登记在全局环境中供搜索，后者不会。Symbol.for()不会每次调用就返回一个新的 Symbol 类型的值，而是会先检查给定的key是否已经存在，如果不存在才会新建一个值。比如，如果你调用Symbol.for("cat")30 次，每次都会返回同一个 Symbol 值，但是调用Symbol("cat")30 次，会返回 30 个不同的 Symbol 值。

Symbol.for('bar') === Symbol.for('bar');   // true
Symbol('foo') === Symbol('foo');     // false

// 由于Symbol()写法没有登记机制，所以每次调用都会返回一个不同的值。
// Symbol.keyFor方法返回一个已登记的 Symbol 类型值的key。
let s1 = Symbol.for('foo');
Symbol.keyFor(s1);  // 'foo'

let s2 = Symbol('bar');
Symbol.keyFor(s2);  // undefined



/**
* 实例：模块的 Singleton 模式
*/
// Singleton 模式指的是调用一个类，任何时候返回的都是同一个实例。
// 模块文件可以看成是一个类。怎么保证每次执行这个模块文件，返回的都是同一个实例呢？

const FOO_KEY = Symbol('foo');
function A() {
    this.foo = 'hello';
}
if (!global[FOO_KEY]) {
    global[FOO_KEY] = new A();  // 把模块实例赋值给全局变量
}
module.exports = global[FOO_KEY];



/**
* 内置的 Symbol 值
*/
/*
    Symbol.hasInstance
    Symbol.isConcatSpreadable
    Symbol.species
    Symbol.match
    Symbol.replace
    Symbol.search
    Symbol.split
    Symbol.iterator
    Symbol.toPrimitive
    Symbol.toStringTag
    Symbol.unscopables
*/
