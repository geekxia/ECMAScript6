// String.fromCharCode()
// 用于从码点返回对应字符，但是这个方法不能识别 32 位的 UTF-16 字符（Unicode 编号大于0xFFFF）。

String.fromCharCode(0xf0ff);


// String.fromCodePoint()
// 可以识别大于0xFFFF的字符，弥补了String.fromCharCode方法的不足。在作用上，正好与codePointAt方法相反。

String.fromCodePoint(0x78, 0x1f680, 0x79) === 'x\uD83D\uDE80y';  // true
// 如果String.fromCodePoint方法有多个参数，则它们会被合并成一个字符串返回。



// 遍历字符串
// 用for循环遍历字符串，不可以识别大于oxFFFF的码点
// 用for...of遍历字符串，可以识别大于oxFFFF的码点

let str = String.fromCodePoint(0x20BB7) + 'abc';
for(let i of str) {
    console.log(i);
}
// '𠮷'
// 'a'
// 'b'
// 'c'



// charAt()
// 返回字符串给定位置的字符。该方法不能识别码点大于0xFFFF的字符。
'abc'.charAt(1);
// 'b'



// normalize()
// 用来将字符的不同表示方法统一为同样的形式，这称为 Unicode 正规化。

'\u01D1'.normalize() === '\u004F\u030C'.normalize();    // true



// indexOf()     用来确定一个字符串是否包含在另一个字符串中
// includes()    返回布尔值，表示是否找到了参数字符串。
// startsWith()  返回布尔值，表示参数字符串是否在原字符串的头部。
// endsWith()    返回布尔值，表示参数字符串是否在原字符串的尾部。


// repeat()
// 返回一个新字符串，表示将原字符串重复n次。

'x'.repeat(3);   // 'xxx'
'y'.repeat(0);   // ''



// padStart()
// padEnd()
// ES2017 引入了字符串补全长度的功能。如果某个字符串不够指定长度，会在头部或尾部补全。padStart()用于头部补全，padEnd()用于尾部补全。

'12'.padStart(10, '0');   // '0000000012'
'23'.padStart(10, 'YYYY-MM-DD');  // 'YYYY-MM-23'
'x'.padEnd(5, 'abcdefg');  // 'xabcd'



// matchAll()
// 返回一个正则表达式在当前字符串中的所有匹配
