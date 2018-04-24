/**
* 知识点：var 变量提升
*/
var tmp = new Date();

function f() {
    console.log(tmp);
    if (false) {
        // var tmp 变量提升
        var tmp = 'hello world';
    }
}

// f 函数等价于 f1函数
function f1() {
    var tmp;
    console.log(tmp);
    if(false) {
        tmp = 'hello world';
    }
}

f();   // undefined
f1();  // undefined




for(var i=0; i<10; i++) {
    // ....
}
console.log(i);  // i 是一个全局变量
