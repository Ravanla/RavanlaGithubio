---
title: 利用@media screen实现网页布局的自适应
tags:
  - CSS
  - Stylus
  - 前端
categories: coding学习
abbrlink: ff876b6e
date: 2021-04-24 22:45:00
swiper_index: 10 #置顶轮播图顺序，非负整数，数字越大越靠前
---
## <u>前言</u>

这几天搭建博客，顺便做了一些美化，但我是一个追求尽善尽美的人，有些地方看着不舒服心里就怪难受的，这要是我去做美工前端不得叼死我╮(╯▽╰)╭

## 问题

为了使背景的颜色和特效能够直观无碍地展现出来，我设置了卡片的半透明，但是我发现在移动端下透明会使目录栏的内容和背景重叠，导致看不清目录，就像以下这样：

![](https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/20210424125426.png)

## 解决

- 通过查找度娘，我发现可以利用`@media screen`[实现CSS网页布局的自适应](https://blog.csdn.net/gtlishujie/article/details/81975157)

  所以我想出的解决方案是令目录卡片在移动端的时候不透明，在桌面端的时候才透明。

- 由于我使用的主题CSS采用了`Stylus`，查了一下[API文档](https://stylus.bootcss.com/docs/media.html)

  ```css
  @media screen and (min-width: 600px)
      padding 20px
  
  转换为：  
   
  @media screen and (min-width: 600px) {
    .widget {
      padding: 20px;
    }
  }
  ```

- 接着找到需要修改的文件，先从页面入手

  ![](https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/20210424214959.png)

  在mac文件管理器搜这个id，可以直接找到相关文档，不得不说mac这点做得比隔壁win好太多了

  ![](https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/20210424220932.png)

- 代码如下:

  ```css
  #card-toc
    @media screen and (max-width: 900px)
      background: rgb(255,255,255)
  ```

## 结果

![](https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/20210424221555.png)

快乐(\*^▽^\*)