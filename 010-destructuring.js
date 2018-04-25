/**
* 解构赋值的应用
*/

// 一、交换两个变量的值
let x = 1;
let y = 2;
[x, y] = [y, x];
console.log(x,y);  // 2, 1



// 二、从函数中返回多个值
// 函数只能返回一个值，如果要返回多个值，只能将它们放在数组或对象里返回。有了解构赋值，取出这些值就非常方便。
function returnArray() {
    // 返回一个数组
    return [1, 2, 3];
}
let [a, b, c] = returnArray();

function returnJson() {
    // 返回一个对象
    return {
        m: 1,
        n: 2
    }
}
let { m, n: aN } = returnJson();



// 三、函数参数的定义
// 解构赋值可以方便地将一组参数与变量名对应起来。

// 有序参数
function f1([x,y,z]) { };
f1([1, 2, 3]);

// 无序参数
function f2({x,y,z}) { };
f({ z: 3, x: 1, y: 2});



// 四、提取JSON中的数据
let data = {
    id: 42,
    status: 'ok',
    names: ['geek', 'xia']
}
let { id, status, names:myNames } = data;




// 五、函数参数的默认值
jQuery.ajax = function(url, {
    async = true,
    beforeSend = function() {},
    cache = true,
    complete = function() {},
    crossDomain = false,
    global = true,
    method = 'GET'
} = {}) {
    // do something
}
// 调用并覆盖部分默认参数
jQuery.ajax(url, {method: 'POST', async: false});




// 六、遍历Map结构
// 任何部署了 Iterator 接口的对象，都可以用for...of循环遍历。Map 结构原生支持 Iterator 接口，配合变量的解构赋值，获取键名和键值就非常方便。
const map = new Map();
map.set('a', 1);
map.set('b', 2);

// 从Map结构中取出所有键值
for(let [key, value] of map) {
    console.log(key + ' - ' + value);
}

// 只获取键名
for(let [key] of map) {
    console.log(key);
}

// 只获取值
for(let [value] of map) {
    console.log(value);
}




// 七、使用模块中的指定方法
const { method1, method2 } = require('source-map');
