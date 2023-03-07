---
title: async-await
tags:
  - JavaScript
  - ES6
  - 前端
categories:
  - coding学习
mathjax: true
abbrlink: 8756431c
swiper_index: 9
date: 2021-04-27 20:37:24
updated: 2021-04-30 22:00:00
description:
---

### async

作为一个关键字放在函数的前面，表示该函数是一个异步函数，意味着该函数的执行不会阻塞后面代码的执行 异步函数的调用跟普通函数一样。

异步函数返回的是一个`Promise`对象

```js
async function timeout(){
    return "helloworld";
}

console.log(timeout());  // Promise { 'helloworld' }

timeout().then((result)=>{
    console.log(result); // helloworld
});
```

> `async`的内部实现原理就是：如果该函数中有一个返回值，当调用该函数时，默认会在内部调用`Promise.solve()` 方法把它转化成一个`Promise` 对象作为返回，若函数内部抛出错误，则调用`Promise.reject()`返回一个`Promise` 对象

### await

- `await`即等待，用于等待一个`Promise`对象。它只能在异步函数 `async function`中使用，否则会报错。

- 它的返回值不是`Promise`对象而是`Promise`对象处理之后的结果。

- `await`表达式会暂停当前 `async function`的执行，等待`Promise` 处理完成。

- 若 `Promise` 正常处理`(fulfilled)`，其回调的`resolve()`函数参数作为 `await` 表达式的值，继续执行 `async function`；

  若 `Promise` 处理异常`(rejected)`，`await` 表达式会把 `Promise` 的异常原因抛出。

- 如果 `await` 操作符后的表达式的值不是一个 `Promise`，那么该值将被转换为一个已正常处理的 `Promise`

```js
// async await方式
async function doIt() {
    console.time("doIt");
    const time1 = 300;
    const time2 = await step1(time1);
    const time3 = await step2(time2);
    const result = await step3(time3);
    console.log(`result is ${result}`);
    console.timeEnd("doIt");
}
doIt();
```

> 与Promise对比
> 1、不再需要多层.then方法
> 	假设一个业务分很多步骤完成，并且每个步骤都是异步，依赖上一个步骤的结果。
>
> 2、可以对Promise进行并行处理

