---
title: 获取华师砺儒云cookie和sessKey
date: 2022-03-29 19:24:28
tags: [Pyhton]
categories: 实用工具
cover: https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fp7.itc.cn%2Fimages01%2F20210130%2Fa8ccee999e31447980a2ce7fce98925b.jpeg&refer=http%3A%2F%2Fp7.itc.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1651145158&t=8ce0e01e8c8bf79b6cca273c970b0d6c
---

# 四史自动刷课脚本说明

主要是要获取两个值：`cookie`和`sessKey`，下面讲获取方式：

1. 打开砺儒云网页，进入四史，随便选择一个视频页面进入

   ![](https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/202203291034984.png)

2. 按F12打开控制台，选择网络(network)栏

   ![](https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/202203291035892.png)

3. 点击播放视频，然后再点击暂停视频，这时找到左边请求网址为`\service.php`的信息

   ![](https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/202203291037475.png)

4. 在URL里找到`sesskey`，下拉在请求标头(request header)里找到`cookie`，解析出名为`MoodleSession`的值

   ![](https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/202203291040448.png)

   ![](https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/202203291041052.png)

5. 将找到的`cookie`和`sessKey`填入Python脚本，执行Python脚本，挂后台就可以了

   



