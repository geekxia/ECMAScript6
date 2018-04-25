// 模板字符串（template string）是增强版的字符串，用反引号（`）标识。它可以当作普通字符串使用，也可以用来定义多行字符串，或者在字符串中嵌入变量。

let name = 'geek';
let str = `hello ${name}'\n',
how are you?
`;


// 在模板字符串中使用反引号  \`
let str2 = `a\`bcde`;


// 所有模板字符串的空格和换行，都是被保留的，比如<ul>标签前面会有一个换行。如果你不想要这个换行，可以使用trim方法消除它。
$('#list').html(`
<ul>
    <li>first</li>
    <li>seconde</li>
</ul>
`.trim());
 // trim()用于删除空格和换行


// 模板字符串嵌入js变量或表达式
`abb${3>2 ? 1 : 0}ccd`;

`${ fn() }`;

`${ obj }`;  // 大括号中是一个对象时，将默认调用对象的toString方法。



// 模板字符串，可以嵌套
const tmpl = addrs => `
<table>
${
addrs.map(addr => `
<tr><td>${addr.name}</td></tr>
<tr><td>${addr.age}</td></tr>
`).join('');
}
</table>
`



// 如果需要引用模板字符串本身，在需要时执行，可以像下面这样写。
// 写法一
let str = 'return ' + '`Hello ${name}!`';
let func = new Function('name', str);
func('Jack') // "Hello Jack!"

// 写法二
let str = '(name) => `Hello ${name}!`';
let func = eval.call(null, str);
func('Jack') // "Hello Jack!"



/**
* 模板编译
*/
let template = `
<ul>
<%
for(let i = 0; i<data.names.length; i++) {
    <li>
        <%= data.names[i] %>
    </li>
}
%>
</ul>
`;

// <%...%> 用于放置 JavaScript 代码
// <%= ... %> 用于输出 JavaScript 表达式的结果

// 封装模板编译函数
function compile(template) {
    const expr = /<%([\s\S]+?)%>/g;
    const evalExpr = /<%=(.+?)%>/g;

    template = template.replace(evalExpr, '`); \n echo($1); \n echo(`').replace(expr, '`); \n $1 \n echo(`');

    template = 'echo(`'+template+'`);';

    let script = `
        (function parse(data){
            let output = "";
            function echo(html) {
                output += html;
            }
            ${template}
            return output;
        })
    `;

    return script;
}

// 测试模板编译函数
let parse = eval(compile(template));
div.innerHTML = parse({names: ['geek', 'lucy', 'david']});



/**
* 标签模板
*/
alert`123`;
// 等同于
alert(123);




// String.raw()
// String.raw方法，往往用来充当模板字符串的处理函数，返回一个斜杠都被转义（即斜杠前面再加一个斜杠）的字符串，对应于替换变量后的模板字符串。

String.raw`Hi\n${2+3}!`;
// 返回   "Hi\\n5!"

// String.raw的源码实现
String.raw = function(strings, ...values) {
    let output = '';
    for(let index = 0; index < values.length; index++) {
        output += strings.raw[index] + values[index];
    }
    output += strings.raw[index];
    return output;
}
