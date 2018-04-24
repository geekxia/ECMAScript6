// ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构（Destructuring）。

let [a,b,c] = [1,2,3];
console.log(b);

let [foo, [[bar], baz]] = [1, [[2], 3]];

let [ , , third] = [1, 2, 3];
console.log(third);


let [head, ...tail] = [1,2,3,4];
head;  // 1
console.log(tail); // [2,3,4]


let [x,y,...z] = ['geek'];
x;  // 'geek'
y;  // undefined    // 如果解构不成功，变量的值就等于undefined。
console.log(z);  // []


// 对Set结构进行解构
let [m,n] = new Set(['1', '2']);
console.log(m);


// 事实上，只要某种数据结构具有 Iterator 接口，都可以采用数组形式的解构赋值。

// 解构赋值允许指定默认值
let [foo = true] = [];
foo;   // true

let [s, t = 2] = [1];
t;   // 2

let [w, v='xia'] = ['geek', undefined];
v;   // 'xia'


let [j = 1] = [undefined];
j;   // 1

let [h = 1] = [null];
h;   // null
// 因为 null !== undefined



let [x = 1, y = x] = [];
// x = y = 1;
let [x = 1, y = x] = [100];
// x = y = 100;
let [x = 1, y = x] = [200, 300];
// x = 200,  y = 300
let [x = y, y = 1] = [1];  // 报错，y is undefined
