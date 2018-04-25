// ES6 在 Math 对象上新增了 17 个与数学相关的方法。所有这些方法都是静态方法，只能在 Math 对象上调用。


// Math.trunc()
// 方法用于去除一个数的小数部分，返回整数部分。
Math.trunc('5.5');   // 5
Math.trunc(-4.6);    // -4

// 对没有实现Math.trunc()的环境进行模拟实现
Math.trunc = Math.trunc || function(c) {
    // 小于零时向上取整，大于零时向下取整
    return c < 0 ? Math.ceil(c) : Math.floor(c);
}



// Math.sign()
// 方法用来判断一个数到底是正数、负数、还是零。对于非数值，会先将其转换为数值。
Math.sign('9');   // +1
// 模拟实现
Math.sign = Math.sign || function(x) {
    // 把 x 转化为 Number类型
    x = +x;
    if (x === 0 || isNaN(x)) {
        return x;
    }
    return x > 0 ? 1 : -1;
}



// Math.cbrt()
// 方法用于计算一个数的立方根。
Math.cbrt(-1);   // -1
Math.cbrt('8');  // 2
// 模拟实现
Math.cbrt = Math.cbrt || function(x) {
    x = +x;
    // 对 x 开三次方
    var y = Math.pow(Math.abs(x), 1/3);
    return x < 0 ? -y : y;
}



// Math.clz32()
// JavaScript 的整数使用 32 位二进制形式表示，Math.clz32方法返回一个数的 32 位无符号整数形式有多少个前导 0。
// clz32这个函数名就来自”count leading zero bits in 32-bit binary representation of a number“（计算一个数的 32 位二进制形式的前导 0 的个数）的缩写。
Math.clz32(1000);   // 22
Math.clz32(0b01000000000000000000000000000000);   // 1

// 左移运算符（<<）
Math.clz32(1);   // 31
Math.clz32(1 << 1);   // 30




// Math.imul()
// 方法返回两个数以 32 位带符号整数形式相乘的结果，返回的也是一个 32 位的带符号整数。
Math.imul(-2, -2);  // 4
Math.imul(0x7fffffff, 0x7fffffff);   // 1




// Math.fround()
// 方法返回一个数的32位单精度浮点数形式。
Math.fround(0.7);     // 0.699999988079071
Math.fround(1.0000000123);   // 1
// 模拟实现
Math.fround = Math.fround || function(x) {
    return new Float32Array([x])[0];
}




// Math.hypot()
// 方法返回所有参数的平方和的平方根。
Math.hypot(3, 4);        // 5



// Math.expm1(x)
// 返回 e的x次方 - 1，即 Math.exp(x) - 1。
Math.expm1(1);     // 1.718281828459045
// 模拟实现
Math.expm1 = Math.expm1 || function(x) {
    return Math.exp(x) - 1;
};



// Math.log1p(x)
// 方法返回1 + x的自然对数，即Math.log(1 + x)。如果x小于-1，返回NaN。



// Math.log10(x)
// 返回以 10 为底的x的对数。如果x小于 0，则返回 NaN。



// Math.log2(x)
// 返回以 2 为底的x的对数。如果x小于 0，则返回 NaN。



// Math.sinh(x) 返回x的双曲正弦（hyperbolic sine）
// Math.cosh(x) 返回x的双曲余弦（hyperbolic cosine）
// Math.tanh(x) 返回x的双曲正切（hyperbolic tangent）
// Math.asinh(x) 返回x的反双曲正弦（inverse hyperbolic sine）
// Math.acosh(x) 返回x的反双曲余弦（inverse hyperbolic cosine）
// Math.atanh(x) 返回x的反双曲正切（inverse hyperbolic tangent）



// 指数运算符
// ES2016 新增了一个指数运算符（**）
2 ** 2    // 4
2 ** 3    // 8

let a = 1.5;
a **= 2;
// 等同于 a = a * a;

let b = 4;
b **= 3;
// 等同于 b = b * b * b;

// 指数运算符可以与等号结合，形成一个新的赋值运算符（**=）
let b = 4;
b **= 3;
// 等同于 b = b * b * b;
