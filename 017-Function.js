/**
* 函数参数的默认值
*/
function log(x, y='world') {
    console.log(x,y);
}

function Point(x = 0, y = 0) {
    this.x = x;
    this.y = y;
}

// 参数变量是默认声明的，所以不能用let或const再次声明。
function foo(x = 5) {
    // let x = 1;    // error
    // 函数参数不能再次被声明
}
