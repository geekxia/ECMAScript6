/**
*   二进制数组
*/
// ArrayBuffer对象、TypedArray视图和DataView视图是 JavaScript 操作二进制数据的一个接口。这些对象早就存在，属于独立的规格（2011 年 2 月发布），ES6 将它们纳入了 ECMAScript 规格，并且增加了新的方法。它们都是以数组的语法处理二进制数据，所以统称为二进制数组。

// 这个接口的原始设计目的，与 WebGL 项目有关。所谓 WebGL，就是指浏览器与显卡之间的通信接口，为了满足 JavaScript 与显卡之间大量的、实时的数据交换，它们之间的数据通信必须是二进制的，而不能是传统的文本格式。

// 二进制数组就是在这种背景下诞生的。它很像 C 语言的数组，允许开发者以数组下标的形式，直接操作内存，大大增强了 JavaScript 处理二进制数据的能力，使得开发者有可能通过 JavaScript 与操作系统的原生接口进行二进制通信。


/**
*   二进制数组由三类对象组成
*/
/*
    （1）ArrayBuffer对象：代表内存之中的一段二进制数据，可以通过“视图”进行操作。“视图”部署了数组接口，这意味着，可以用数组的方法操作内存。

    （2）TypedArray视图：共包括 9 种类型的视图，比如Uint8Array（无符号 8 位整数）数组视图, Int16Array（16 位整数）数组视图, Float32Array（32 位浮点数）数组视图等等。

    （3）DataView视图：可以自定义复合格式的视图，比如第一个字节是 Uint8（无符号 8 位整数）、第二、三个字节是 Int16（16 位整数）、第四个字节开始是 Float32（32 位浮点数）等等，此外还可以自定义字节序。
*/

// 简单说，ArrayBuffer对象代表原始的二进制数据，TypedArray 视图用来读写简单类型的二进制数据，DataView视图用来读写复杂类型的二进制数据。

// 注意，二进制数组并不是真正的数组，而是类似数组的对象。

// 很多浏览器操作的 API，用到了二进制数组操作二进制数据，下面是其中的几个。
/*
    File API
    XMLHttpRequest
    Fetch API
    Canvas
    WebSockets
*/



/**
*   ArrayBuffer
*/
// ArrayBuffer对象代表储存二进制数据的一段内存，它不能直接读写，只能通过视图（TypedArray视图和DataView视图)来读写，视图的作用是以指定格式解读二进制数据。

// ArrayBuffer也是一个构造函数，可以分配一段可以存放数据的连续内存区域。



/**
*   TypedArray
*/
// ArrayBuffer对象作为内存区域，可以存放多种类型的数据。同一段内存，不同数据有不同的解读方式，这就叫做“视图”（view）。ArrayBuffer有两种视图，一种是 TypedArray 视图，另一种是DataView视图。前者的数组成员都是同一个数据类型，后者的数组成员可以是不同的数据类型。



/**
*   DataView
*/
// 如果一段数据包括多种类型（比如服务器传来的 HTTP 数据），这时除了建立ArrayBuffer对象的复合视图以外，还可以通过DataView视图进行操作。

// DataView视图提供更多操作选项，而且支持设定字节序。本来，在设计目的上，ArrayBuffer对象的各种 TypedArray 视图，是用来向网卡、声卡之类的本机设备传送数据，所以使用本机的字节序就可以了；而DataView视图的设计目的，是用来处理网络设备传来的数据，所以大端字节序或小端字节序是可以自行设定的。



/**
*   二进制数组的应用
*/
// 大量的 Web API 用到了ArrayBuffer对象和它的视图对象。

// AJAX
// Canvas
// WebSocket
// Fetch API
// File API



/**
*   SharedArrayBuffer
*/
// JavaScript 是单线程的，Web worker 引入了多线程：主线程用来与用户互动，Worker 线程用来承担计算任务。每个线程的数据都是隔离的，通过postMessage()通信。

// 创建主线程
const w = new Worker('myworder.js');
