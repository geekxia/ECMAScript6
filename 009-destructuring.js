// 字符串的解构赋值
const [a,b,c,d,e] = 'hello';
// a = 'h'
// e = 'o'

let {length: len} = 'hello';
// length是匹配模式，字符串有这个属性
// len = 5


// 数值和布尔值的解构赋值
let { toString: s } = 123;
let { toString: t } = true;



// 函数参数的解构赋值
function add([x,y]) {
    return x + y;
}
add([1,2]);   // 3

[[1,2], [3,4]].map(([a,b]) => a + b);
// [3, 7]


// 函数参数解构使用默认值
function move({x=0, y=0} = {}) {
    return [x,y];
}
move({x:3, y:8});  // [3,8]
move({x:3});  // [3,0]
move();  // [0,0]

[1, undefined, null, true].map((x = 'yes') => x);
// [1, 'yes', null, true]


// -> 6.圆括号问题
