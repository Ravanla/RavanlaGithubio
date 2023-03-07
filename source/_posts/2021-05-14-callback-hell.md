---
title: 回调地狱
tags:
  - JavaScript
  - 前端
categories:
  - coding学习
mathjax: true
abbrlink: 2c85a4d8
swiper_index: 7
date: 2021-05-14 11:44:40
updated: 2021-06-30 22:00:00
description:
---

​		这周学到一个新的词，叫做`callback hell`，中文名：回调地狱。说到回调，首先想到就是js里经常会用到的大量异步回调，其中例如使用`axios`请求，或者`setTimeout`的函数。通常情况下回调函数的写法就是在将一个函数作为参数传递给另个函数，可是当回调的次数多了，这就会导致有多层嵌套，代码看起来很混乱，这就是回调地狱。

![](https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/20210523112336.png)

​		如何解决回调地狱呢？我经常用的是ES6中的Promise，中文翻译过来是承诺，就是承诺了你会在未来某一个时间点返回数据给你。Promise写法获取数据可以用then，当我调用完一个接口后，在后面加上.then()，括号里写下回调函数，这样子代码逻辑看起来也比较明了。

![](https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/20210523112404.png)

​		但是.then依旧不是最完美的方法，我发现当我请求完一个接口，还要接着请求的时候，又得继续在里面写下一层then，作为一个完美主义者来说这样看起来有点不舒服，于是我就请出了ES7新增的async/await（异步/等待)

![](https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/20210523112453.png)

​		多么贴切的名字！以后对于Promise对象，不用再在屁股后面跟上then了，直接在前面加个await，意思是等待当前函数运行完，本质上是将异步对象转换为同步对象，当有多个异步对象的时候我就经常用await将他们组合起来，麻麻再也不用担心我代码写得乱糟糟的了。

​		经过这段时间的项目实战，我发现写代码最终不是给自己看的，而是给别人看的，在使用git协作的时候这种感觉尤为突出，所以合理运用各种设计模式各种代码风格很重要，为了让别人能清楚得明白这个代码究竟是做了什么，出bug的时候能快速定位。