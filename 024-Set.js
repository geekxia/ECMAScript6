/**
* Set
*/
// ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。
// Set 本身是一个构造函数，用来生成 Set 数据结构。

const s = new Set();

[1,2,2,2,3,4].forEach(x => s.add(x));

for(let i of s) {
    console.log(i);
}
// 1  2  3  4


const s1 = new Set([1,2,2,2,3,4]);
[...s1];   // [1,2,3,4]
s1.size; // 4

// 这是一种去除数组重复成员的方法
const arr = [1,2,2,2,3,4];
[...new Set(arr)];

// 向 Set 加入值的时候，不会发生类型转换，所以5和"5"是两个不同的值。

// Set 内部判断两个值是否不同，使用的算法叫做“Same-value-zero equality”，它类似于精确相等运算符（===），主要的区别是NaN等于自身，而精确相等运算符认为NaN不等于自身。

// 在 Set 内部，两个NaN是相等。

// 另外，两个对象总是不相等的。
let s = new Set();
s.add({});
s.size;  // 1
s.add({});
s.size;  // 2

/**
    Set.prototype.constructor;
    Set.prototype.size;
*/

/**
    Set实例的四个操作方法：
        add()
        delete()
        has()
        clear()
*/
let s = new Set();
s.add(1).add(2).add(3);
s.has(3);
s.delete(3);
s.clear();

// Array.from方法可以将 Set 结构转为数组。
let s = new Set([1,2,3,4]);
const arr = Array.from(s);

// 函数封装：数组去重
function dedupe(arr) {
    return Array.from(new Set(arr));
}


/**
    Set实例的四个遍历方法
        keys()   返回键名的遍历器
        value()    返回键值的遍历器
        entries()   返回键值对的遍历器
        forEach()   使用回调函数遍历每个成员
*/
// 需要特别指出的是，Set的遍历顺序就是插入顺序。这个特性有时非常有用，比如使用 Set 保存一个回调函数列表，调用时就能保证按照添加顺序调用。

// keys方法、values方法、entries方法返回的都是遍历器对象。由于 Set 结构没有键名，只有键值（或者说键名和键值是同一个值），所以keys方法和values方法的行为完全一致。
let s = new Set(['red', 'green', 'blue']);
for(let item of s.entries()) {
    console.log(item);
}
// ['red', 'red']
// ['green', 'green']
// ['blue', 'blue']


// 使用 Set 可以很容易地实现并集（Union）、交集（Intersect）和差集（Difference）。
let a = new Set([1,2,3]);
let b = new Set([2,3,4]);
// 并集
let union = new Set([...a, ...b]);
// 交集
let intersect = new Set([...a].filter(x=>b.has(x)));
// 差集
let differene = new Set([...a].filter(x=>!b.has(x)));


// 在遍历操作中，同步改变原来的 Set 结构
// 方法一
let set = new Set([1, 2, 3]);
set = new Set([...set].map(val => val * 2));
// set的值是2, 4, 6

// 方法二
let set = new Set([1, 2, 3]);
set = new Set(Array.from(set, val => val * 2));
// set的值是2, 4, 6




/**
* WeakSet
*/
// WeakSet 结构与 Set 类似，也是不重复的值的集合。但是，它与 Set 有两个区别。
// 首先，WeakSet 的成员只能是对象，而不能是其他类型的值。
// 其次，WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 WeakSet 之中。
// 由于 WeakSet 内部有多少个成员，取决于垃圾回收机制有没有运行，运行前后很可能成员个数是不一样的，而垃圾回收机制何时运行是不可预测的，因此 ES6 规定 WeakSet 不可遍历。

const a = [[1,2], [3,4]];
const ws = new WeakSet(a);
// WeakSet{[1,2], [3,4]}

// WeakSet 没有size属性，没有办法遍历它的成员。
