/**
* Map
*/
// JavaScript 的对象（Object），本质上是键值对的集合（Hash 结构），但是传统上只能用字符串当作键。

// ES6 提供了 Map 数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。也就是说，Object 结构提供了“字符串—值”的对应，Map 结构提供了“值—值”的对应，是一种更完善的 Hash 结构实现。如果你需要“键值对”的数据结构，Map 比 Object 更合适。

const m = new Map();
const o = { p: 'hello world'};

m.set(o, 'content'); // 键名是一个对象
m.get(o);   // 'content'

m.has(o);   // true
m.delete(o);

// 作为构造函数，Map 也可以接受一个数组作为参数。该数组的成员是一个个表示键值对的数组。
const map = new Map([['name', '张三'], ['title', '律师']]);
map.size;  // 2
map.has('name');   // true
map.get('title');  // '律师'

// 事实上，不仅仅是数组，任何具有 Iterator 接口、且每个成员都是一个双元素的数组的数据结构都可以当作Map构造函数的参数。这就是说，Set和Map都可以用来生成新的 Map。

// 如果对同一个键多次赋值，后面的值将覆盖前面的值。
map.set(1, 'aaa').set(1, 'bbb');
map.get(1);  // 'bbb'


/**
* Map的实例属性和操作方法
*   size
*   set()
*   get()
*   has()
*   delete()
*   clear()
*/


/**
* Map的遍历方法
*   keys()    返回键名的遍历器。
*   values()  返回键值的遍历器。
*   entries() 返回所有成员的遍历器。
*   forEach() 遍历 Map 的所有成员。
*/
// Map 的遍历顺序就是插入顺序。
const map = new Map([['a', 'aaa'], ['b', 'bbb']]);
for(let [key,value] of map.entries()) {
    console.log(key, value);
}
// 'a' 'aaa'
// 'b' 'bbb'

// Map 结构转为数组结构，比较快速的方法是使用扩展运算符（...）。
[...map];
[...map.keys()];
[...map.values()];
[...map.entries()];

// Map 还有一个forEach方法，与数组的forEach方法类似，也可以实现遍历。forEach方法还可以接受第二个参数，用来绑定this。


/**
* Map结构与其它结构进行相互转换
*/
