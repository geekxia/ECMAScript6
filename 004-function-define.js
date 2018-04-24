/**
* 知识点： S6 引入了块级作用域，明确允许在块级作用域之中声明函数。ES6 规定，块级作用域之中，函数声明语句的行为类似于let，在块级作用域之外不可引用。
*/

// 函数声明语句
{
    let a = 1;
    function f() {
        return a;
    }
}


// 函数表达式
{
    let a = 2;
    let f = function() {
        return a;
    }
}
