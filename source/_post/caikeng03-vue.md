---
title: 踩坑记录（三）
date: 2021-05-09 14:57:53
tags: [vue]
categories: 踩坑记录
cover: https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/20210511180257.png
---

​		上周解决了一个对象的拷贝问题，这周本来可以开开心心地继续写了，没想到上周解决的bug又生出了一个新的bug！！

​		困扰了我五一假期后的三四天，具体是从一个组件的显示错误开始，我按照问题反反复复看了几遍，都没有看出来我写的代码问题在哪里，但是他就是不显示出来，到最后实在没办法了，我打算求助公司的技术人员。

![](https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/20210511175927.png)

​		当我把代码发给技术人员的时候，她给我的反馈就像是看了一份晦涩难懂的代码(捂脸)，第二天给我答复：“我不知道你为什么要写这么复杂”，“明明可以很简单的写，你写这么复杂[捂脸]”，“你这个问题，我昨晚看了一晚，也没找出问题”....{% inlineImg https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/071199eaebeeb0ee64dd4c3c74595a76.jpeg 150px %}

​		好吧，不仅有bug，而且我的代码规范也严重不达标，这方面我还得继续加强一下。当我准备放弃的时候，一个不起眼的地方引起了我的注意，这是一个warning：`Failed to mount component: template or render function not defined.`

​		令人百思不得其解的是，如果不强制路由，直接使用组件，页面却可以正确显示，为什么这里会提示“模板或渲染函数未定义”呢？渲染函数在这里又代表什么意思呢？于是我顺便查了一下vue的概念。

​		说到 Vue 的概念，不得不说起 Vue 实例，这是一个使用 Vue 构造函数创建的 JavaScript 对象，创建 Vue 实例时，传递给 Vue 构造函数的参数是一个包含若干属性和方法的对象，被称为 Vue 实例选项对象，用于声明所创建的 Vue 实例对象所要挂载的目标元素、data 数据、计算属性、模板/渲染函数、实例方法以及各种生命周期钩子回调函数等选项。

![](https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/20210511180257.png)

​		创建的 Vue 实例既然是一个 JavaScript 对象，那么也必然拥有属性和方法。当我展开一个正常显示的组件的时候，可以看到里面包含编译生成的render 渲染函数，Vue 构造函数在创建 Vue 实例时会将 template 编译成 render 渲染函数。

![](https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/20210511180351.png)

**但是当我展开导入到路由的组件，发现渲染函数消失了！！**

![](https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/20210511180909.png)

​		这是我突然醍醐灌顶，似乎发现了问题的所在之处，但是渲染函数是在哪里消失的呢？这不得不回到我一开始写的代码，当时因为引用拷贝的问题，我修改成深拷贝(**[Json拷贝](https://segmentfault.com/a/1190000020297508)**)：

`let data = JSON.parse(JSON.stringify(findRouterMap(topBar.name)))`

​		那时我只是知道了这种方式，没有深入研究其中的原理，然后现在一百度，原来如此！！这种拷贝方式只能拷贝对象，数组，不能拷贝函数的！导致了一个致命的问题——渲染函数没有拷贝过来...组件渲染错误继而引发了一系列的错误。

​		这虽然不是一个很难的项目，但如果不深入地去理解 Vue 的基本概念以及编译、挂载相关的过程，再甚者一句方法里面的原理，仍有可能踩到无数的坑。这次学习的机会是十分宝贵的，让我不仅学到了新的知识，还发现了不少学习上的方法，和自身的一些问题，将此记录下来，以此来提醒自己。