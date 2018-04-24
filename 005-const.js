// const实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址不得改动。对于简单类型的数据（数值、字符串、布尔值），值就保存在变量指向的那个内存地址，因此等同于常量。但对于复合类型的数据（主要是对象和数组），变量指向的内存地址，保存的只是一个指针，const只能保证这个指针是固定的，至于它指向的数据结构是不是可变的，就完全不能控制了。因此，将一个对象声明为常量必须非常小心。


const PI = 3.14;
// PI = 4;   报错

const OBJ = {};
OBJ.name = 'geek';   // 不报错
console.log(OBJ);


// 冻结对象
const foo = Object.freeze({});  // foo被冻结，将无法再被改变
foo.name = 'geek';  // 该行代码不起作用、或者会报错
console.log(foo);


/**
* 功能封装：冻结一个对象及其所有后代中的对象属性
*/
var constantize = (obj) => {
    Object.freeze(obj);
    Object.keys(obj).forEach((key,i)=>{
        if (typeof obj[key] === 'object') {
            // 递归
            constantize(obj[key]);
        }
    });
}
