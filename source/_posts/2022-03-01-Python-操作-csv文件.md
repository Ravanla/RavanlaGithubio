---
title: Python 操作.csv文件
tags:
  - Python
  - csv
categories:
  - coding学习
mathjax: true
abbrlink: f1a8c323
date: 2022-03-01 16:14:18
description:
---

# Python 操作.csv文件

Python对表格操作支持是非常完善的，工作学习中简单写个代码就可以批量处理表格，本节让我们学习一下如何使用Python 操作`.csv`文件

## 读取

### 1、`reader` 

第一种简单读取的方法，先用`csv.reader()`函数读取文件的句柄f生成一个csv的句柄，其实就是一个**迭代器**，我们看一下这个reader的源码：

![](https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/20220225124735.png)

传给reader一个文件或可迭代对象，然后返回一个可迭代对象

![](https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/20220225131151.png)

- 首先读取csv 文件，然后用csv.reader生成一个csv迭代器f_csv
- 然后利用迭代器的特性，next(f_csv)获取csv文件的头，也就是表格数据的头，顺便将指针直到下一行
- 接着利用for循环，一行一行打印row的内容，也就是表格数据的身体

![](https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/20220225131239.png)

### 2、`nametuple`

用`reader`读取csv是最简单的一种方法，下面介绍第二种：用`nametuple`生成包含row的数据对象

![](https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/20220225153014.png)

- nametuple其实是一个非常有用的类，这个类属于collections模块，而这个模块简直就是一个百宝箱里面有非常多的牛逼的库；`from collections import namedtuple`
- 这里我们用next(f_csv)其实就是获取表格的头部来初始化这个Row；
- 然后循环来构造这个Row的数据，把我们表格里面的每一行的数据都喂成nametuple格式的row_info;
- 这样做的好处就是你可以随心所欲的访问这个row_info里面的数据，就想访问类(对象)数据一样，比如row_info.name

### 3、`DictReader`

上面用的`nametuple`其实也是一个数据的映射，有没有什么方法可以直接把csv 的内容用映射的方法读取，直接出来一个字典，还真有的，来看一下代码：

![](https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/20220225153624.png)

代码十分地简洁！原来csv模块直接内置了DictReader()，按照字典的方法进行读取，然后生成一个有序的字典。

> 这里介绍3种常用的csv读取方法，如果还有数据清洗要求，可以用tuple类型转换的方式，这里就不详细介绍了。
>
> 参考链接 ：
>
> 用[Python](https://so.csdn.net/so/search?q=Python&spm=1001.2101.3001.7020)读取CSV文件的5种方式：https://mp.weixin.qq.com/s/cs4buSULva1FgCctp_fB6g



## 写入

#### 1、`writer`

写入的方法也很简单，先用`csv.writer()`函数读取文件的句柄f，然后用`csv.writerow()`写入

![](https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/20220301084321.png)

> csv.writerow([1, 2, 3])
>
> | 1    | 2    | 3    |
> | ---- | ---- | ---- |
>
> 

> csv.writerows([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
>
> | 1    | 2    | 3    |
> | ---- | ---- | ---- |
> | 4    | 5    | 6    |
> | 7    | 8    | 9    |
>
> 
