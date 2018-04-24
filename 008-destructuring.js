// 解构不仅可以用于数组，还可以用于对象。
// 对象的解构与数组有一个重要的不同。数组的元素是按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。

let obj = {foo: 'aaa', bar: 'bbb'};
let { foo, geek } = obj;
console.log(foo);  // 'aaa'
console.log(geek); // undefined


let { bar: b } = obj;
console.log(b);   // 'bbb'


let { foo: f } = { foo: 'geek' };
// foo is undefined  // foo是匹配模式
// f = 'geek';       // f 才是变量


// 解构嵌套
let obj2 = {
    p: ['hello', {y: 'world'}]
};
let {p: [x:x, {y:z}]} = obj2;
// x = 'hello'
// z = 'world'
// p 是匹配模式，它不是变量
// y 是匹配模式，它不是变量



// 解构、匹配模式
const node = {
    loc: {
        start: {
            line: 1,
            column: 4
        }
    }
}
let { loc, loc: {start}, loc: {start: {line, column}}} = node;
// loc变量
// start变量
// line变量
// : 前面的是匹配模式



let obj3 = {};
let arr3 = [];
({foo: obj3.prop, bar: arr3[0]} = { foo: 123, bar: true});
// foo 是匹配模式， obj3.prop 是变量
// bar 是匹配模式， arr3[0] 是变量


// 指定默认值
var { x = 3 } = { x: undefined };
// x = 3
let { y = 3} = { y : null };
// y = null



// 实例，从Math对象中解构出三个函数
let { log, sin, cos } = Math;


// 由于数组本质是特殊的对象，因此可以对数组进行对象属性的解构。
let arr = [1, 2, 3];
let {0: first, 1: second, [arr.length-1]: last} = arr;
// first = 1
// second = 2
// last = 3
// 把数组看成特殊的对象
let arrObj = {
    0: 1,
    1: 2,
    3: 2
}
