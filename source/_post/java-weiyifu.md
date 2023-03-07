---
title: Java中的移位运算符：<<,>>,>>>
date: 2022-11-11 17:00:00
tags: [Java]
categories: coding学习
cover: https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/202211171308466.png
---

Java中有三种移位运算符

<<    :   左移运算符，num << 1,相当于num乘以2

\>>    :   右移运算符，num >> 1,相当于num除以2

\>>>   :   无符号右移，忽略符号位，空位都以0补齐

| 二进制 | 十进制 | 备注     | 代码                  |
| ------ | ------ | -------- | --------------------- |
| 1010   | 10     | 原始数   | number                |
| 1010   | 20     | 左移一位 | number = number << 1; |
| 1010   | 10     | 右移一位 | number = number >> 1; |

用代码看一下具体实现：

```java
public class Test {
12 
13     public static void main(String[] args) {
14         int number = 10;
15         //原始数二进制
16         printInfo(number);
17         number = number << 1;
18         //左移一位
19         printInfo(number);
20         number = number >> 1;
21         //右移一位
22         printInfo(number);
23     }
24     
25     /**
26      * 输出一个int的二进制数
27      * @param num
28      */
29     private static void printInfo(int num){
30         System.out.println(Integer.toBinaryString(num));
31     }
32 }
```

运行结果为：

```
1010
10100
1010
```

#### 对于：>>>

无符号右移，忽略符号位，空位都以0补齐

value >>> num     // num：指定要移位值value 移动的位数。

无符号右移的规则只记住一点：忽略了符号位扩展，0补最高位 无符号右移运算符>>> 只是对32位和64位的值有意义

详情请参考官方文档：

**[https://docs.oracle.com/javase/tutorial/java/nutsandbolts/op3.html ](https://docs.oracle.com/javase/tutorial/java/nutsandbolts/op3.html)**

区别：

[**https://stackoverflow.com/questions/2811319/difference-between-and**](https://stackoverflow.com/questions/2811319/difference-between-and)