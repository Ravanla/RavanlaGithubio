---
title: JavaScript判断设备类型的实现
tags:
  - JavaScript
categories: coding学习
abbrlink: 841d6521
date: 2023-02-02 13:25:08
updated: 2023-02-09 22:00:00
---

项目中碰到前端某个页面提供APP的不同设备版本下载，需要在用户打开的时候识别用户设备并跳转到对应的选项卡，Js代码如下：

```javascript
<script>
  // 判断不同设备的方法
  var isMac = /macintosh|mac os x/i.test(navigator.userAgent);
  var isAndroid = /(Android)/i.test(navigator.userAgent);
  var isWin = /(win32|win64)/i.test(navigator.userAgent);
  var isIos = /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent);
  if(isWin) {
    // 通过id获取标签
    var twin = document.getElementById("tab_windows");
    var pwin = document.getElementById("pill_windows");
    // 为该标签添加class类名
    twin.classList.add("active");
    pwin.classList.add("active");
  }else if(isAndroid) {
    var tand = document.getElementById("tab_android");
    var pand = document.getElementById("pill_android");
    tand.classList.add("active");
    pand.classList.add("active");
  }else if(isIos) {
    var tios = document.getElementById("tab_ios");
    var pios = document.getElementById("pill_ios");
    tios.classList.add("active");
    pios.classList.add("active");
  }else if(isMac) {
    var tmac = document.getElementById("tab_macos");
    var pmac = document.getElementById("pill_macos");
    tmac.classList.add("active");
    pmac.classList.add("active");
  }else {
    var twin = document.getElementById("tab_windows");
    var pwin = document.getElementById("pill_windows");
    twin.classList.add("active");
    pwin.classList.add("active");
  }
</script>
```

参考：

- [通过js添加class名的三种方式](https://www.jianshu.com/p/127081862e15)
- [JavaScript判断设备类型的实现](https://cloud.tencent.com/developer/article/1967148)