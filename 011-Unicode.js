// JavaScript 允许采用\uxxxx形式表示一个字符，其中xxxx表示字符的 Unicode 码点。
// 但是，这种表示法只限于码点在\u0000~\uFFFF之间的字符。


// ES6 对这一点做出了改进，只要将码点放入大括号，就能正确解读该字符。

// 写法  \u{}
"\u{20BB7}"

"\u{41}\u{42}\u{43}"
// ABC

let hello = 123;
hell\u{6F} === hello;   // true


'\u{1F680}' === '\uD83D\uDE80';
// ES6大括号表示法 与 两个双字节（4字节）的UTF-16编码是等价的。


// 6种表示字符的方式
"\z" === "z";
"\172" === "z";
"\x7A" === "z";
"\u007A" === "z";
"\u{7A}" === "z";   // ES6表示法



// JavaScript 内部，字符以 UTF-16 的格式储存，每个字符固定为2个字节。对于那些需要4个字节储存的字符（Unicode 码点大于0xFFFF的字符），JavaScript 会认为它们是两个字符。
// 1字符 = 2字节     c.length = 1
// 2字符 = 4字节     c.length = 2

var s = '𠮷';   // 它的Unicode码点大于0xFFFF
s.length;   // 2

var t = '夏';   // 它的Unicode码点小于0xFFFF
t.length;   // 1



// codePointAt() 方法是测试一个字符由两个字节还是由四个字节组成的最简单方法。
function is32Bit(c) {
    // 4字节的字符，它的Unicode码点大于0xFFFF
    return c.codePointAt(0) > 0xFFFF;
}
is32Bit("𠮷");   // true
is32Bit("夏");   // false
