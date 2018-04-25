// 二进制写法 0b开头或者0B开头
0b11110111 === 503;  // true
0B11110111 === 503;

// 八进制写法  0o开头或者0O开头
0o767 === 503;
0O767 === 503;


// 把二进制或者八进制转化为 十进制
Number('0B111');  // 7
Number('0O10');   // 8


Number.isFinite(10);  // 判断一个值是不是有限的
Number.isNaN(10);     // 判断一个值是不是非数
// 与传统的全局方法isFinite()和isNaN()的区别在于，传统方法先调用Number()将非数值的值转为数值，再进行判断，而这两个新方法只对数值有效，Number.isFinite()对于非数值一律返回false, Number.isNaN()只有对于NaN才返回true，非NaN一律返回false。

isFinite('20');    // true
Number.isFinite('20');  // false

isNaN('NaN');    // true
Number.isNaN('NaN');  // false



// ES5的写法
parseInt('12.34') // 12
parseFloat('123.45#') // 123.45

// ES6的写法
Number.parseInt('12.34') // 12
Number.parseFloat('123.45#') // 123.45

Number.parseInt === parseInt // true
Number.parseFloat === parseFloat // true



Number.isInteger(25.2);  // false
// 用于判断一个数值是不是整数
Number.isInteger(25.0) // true
Number.isInteger(3.0000000000000002) // true
Number.isInteger(5E-325) // true
// 由于 JavaScript 采用 IEEE 754 标准，数值存储为64位双精度格式，数值精度最多可以达到 53 个二进制位（1 个隐藏位与 52 个有效位）。如果数值的精度超过这个限度，第54位及后面的位就会被丢弃



Number.EPSILON;
Number.EPSILON === Math.pow(2, -52);
// Number.EPSILON实际上是 JavaScript 能够表示的最小精度。误差如果小于这个值，就可以认为已经没有意义了，即不存在误差了。引入一个这么小的量的目的，在于为浮点数计算，设置一个误差范围。

// 函数封装：设置数值相减的误差范围
function withinError(left, right) {
    // return Math.abs(left - right) < 10;
    return Math.abs(left - right) < Number.EPSILON * Math.pow(2,2);
}
0.1 + 0.2 === 0.3;   // false
withinError(0.1+0.2, 0.3);   // true



/**
* js整数范围  [-9007199254740991 ~ 9007199254740991]
*/
// JavaScript 能够准确表示的整数范围在-2^53到2^53之间（不含两个端点），超过这个范围，无法精确表示这个值。
Number.MAX_SAFE_INTEGER === Math.pow(2, 53) - 1;    // true
Number.MIN_SAFE_INTEGER === -Number.MAX_SAFE_INTEGER;  // true

Number.isSafeInteger(-1000);   // true
Number.isSafeInteger(9007199254740993 - 990);  // true
// 用于判断一个整数是否在这个安全范围之内

// 源码实现
Number.isSafeInteger = function(n) {
    // 要求是数值，是整数，并且在最大值与最小值之间
    return (typeof n === 'number' && Math.round(n) === n && Number.MIN_SAFE_INTEGER <= n && Number.MAX_SAFE_INTEGER >= n);
}




// 函数封装，用于验证运算数和运算结果是否都是安全整数
function trusty(left, right, result) {
    if (Number.isSafeInteger(left) && Number.isSafeInteger(right) && Number.isSafeInteger(result)) {
        return result;
    }
    // 否则抛出异常
    throw new RangeError('Operation cannot be trusted');
}

trusty(9007199254740993, 990, 9007199254740993 - 990);
// RangeError: Operation cannot be trusted!
