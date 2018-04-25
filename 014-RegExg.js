/**
* RegExp构造函数
*/
// 方式1
var reg1 = new RegExp('xyz', 'i');
// 等价于
var reg1 = /xyz/i;

// 方式2
var reg2 = new RegExp(/xyz/i);
// 等价于
var reg2 = /xyz/i;

// 方式3：ES6新增的构造方法，第二个参数会覆盖第一个参数中的修改符
var reg3 = new RegExp(/xyz/img, 'i');
// 等价于
var reg3 = /xyz/i;



/**
* 四个字符串的正则方法
*/
// match()
// replace()
// search()
// split()
// ES6 将这 4 个方法，在语言内部全部调用RegExp的实例方法，从而做到所有与正则相关的方法，全都定义在RegExp对象上。
/*
    String.prototype.match 调用了 RegExp.prototype[Symbol.match]
    String.prototype.replace 调用了 RegExp.prototype[Symbol.replace]
    String.prototype.search 调用了 RegExp.prototype[Symbol.search]
    String.prototype.split 调用了 RegExp.prototype[Symbol.split]
*/



// ES6中新增的 u 修改符
// ES6 对正则表达式添加了u修饰符，含义为“Unicode 模式”，用来正确处理大于\uFFFF的 Unicode 字符。也就是说，会正确处理四个字节的 UTF-16 编码。
function codePointLength(text) {
  var result = text.match(/[\s\S]/gu);
  return result ? result.length : 0;
}
var s = '𠮷𠮷';
s.length // 4
codePointLength(s) // 2


// ES6中新增的 y修饰符
// ES6 还为正则表达式添加了y修饰符，叫做“粘连”（sticky）修饰符。y 修饰符的作用与g修饰符类似，也是全局匹配，后一次匹配都从上一次匹配成功的下一个位置开始。不同之处在于，g修饰符只要剩余位置中存在匹配就可，而y修饰符确保匹配必须从剩余的第一个位置开始，这也就是“粘连”的涵义。



// ES6中新增的 s 修饰符
// ES2018 引入s修饰符，使得.可以匹配任意单个字符，包括换行符、回车符、行分隔符、段分隔符。这被称为dotAll模式，即点（dot）代表一切字符。所以，正则表达式还引入了一个dotAll属性，返回一个布尔值，表示该正则表达式是否处在dotAll模式。
/foo.bar/s.test('foo\nbar');  // true

// /s修饰符和多行修饰符/m不冲突，两者一起使用的情况下，.匹配所有字符，而^和$匹配每一行的行首和行尾。



// 判断一个正则对象是否设置了y修饰符
var reg4 = /hell\d/ys;
reg4.sticky;   // 返回 true，表示reg4设置了y修饰符

// 获取正则对象的修改符
reg4.flags;   // 'y'

// 获取正则对象的正文
reg4.source;  // 'hell\d'

// 判断一个正则对象是否处在dotAll匹配模式
reg4.dotAll;  // true



/**
* 断言
*/

// ”先行断言“指的是，x只有在y前面才匹配，必须写成/x(?=y)/。比如，只匹配百分号之前的数字，要写成/\d+(?=%)/。

// ”先行否定断言“指的是，x只有不在y前面才匹配，必须写成/x(?!y)/。比如，只匹配不在百分号之前的数字，要写成/\d+(?!%)/。

/\d+(?=%)/.exec('100% of US presidents have been male')  // ["100"]
/\d+(?!%)/.exec('that’s all 44 of them')                 // ["44"]

// “后行断言”正好与“先行断言”相反，x只有在y后面才匹配，必须写成/(?<=y)x/。比如，只匹配美元符号之后的数字，要写成/(?<=\$)\d+/。

// ”后行否定断言“则与”先行否定断言“相反，x只有不在y后面才匹配，必须写成/(?<!y)x/。比如，只匹配不在美元符号后面的数字，要写成/(?<!\$)\d+/。

/(?<=\$)\d+/.exec('Benjamin Franklin is on the $100 bill')  // ["100"]
/(?<!\$)\d+/.exec('it’s is worth about €90')                // ["90"]


// 实例：使用后行断言进行字符串替换
const RE_DOLLAR_PREFIX = /(?<=\$)foo/g;
'$foo %foo foo'.replace(RE_DOLLAR_PREFIX, 'bar');
// '$bar %foo foo'




/**
* 具名组匹配
*/
// ES2018 引入了具名组匹配（Named Capture Groups），允许为每一个组匹配指定一个名字，既便于阅读代码，又便于引用。
// 语法： ?<name>

const reg5 = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;

const resObj = reg5.exec('1999-12-31');
const year = resObj.groups.year; // 1999
const month = resObj.groups.month; // 12
const day = resObj.groups.day; // 31


// 实例：使用解构赋值直接从具名匹配结果上为变量赋值。
let {groups: {one, two}} = /^(?<one>.*):(?<two>.*)$/u.exec('foo:bar');
one  // foo
two  // bar

// 实例：使用具名匹配结果对字符串进行替换
let re = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/u;
'2015-01-02'.replace(re, '$<day>/$<month>/$<year>');
// 02/01/2015



/**
* String.matchAll()
*/
// 如果一个正则表达式在字符串里面有多个匹配，现在一般使用g修饰符或y修饰符，在循环里面逐一取出。
var reg6 = /t(e)(st(\d?))/g;
var str6 = 'test1test2test3';
var matches = [];
var match;
while (match = reg6.exec(str6)) {
    // 把所有的匹配结果都放进matches数组中，如此即可获得到所有的匹配结果
    matches.push(match);
}

// 目前有一个提案，增加了String.prototype.matchAll方法，可以一次性取出所有匹配。不过，它返回的是一个遍历器（Iterator），而不是数组。
const matchIterator = str6.matchAll(reg6);
// matchAll()返回一个遍历器，而不是数组
// 再使用for...of即可遍历到所有的匹配结果

// 如何把遍历器转化为数组？
// 方案1
[...matchIterator]
// 方案2
Array.from(matchIterator);

// for...of遍历器，比数组循环遍历，更节省资源
