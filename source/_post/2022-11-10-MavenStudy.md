---
title: Maven快速入门
tags:
  - Maven
categories: coding学习
abbrlink: 5d242951
date: 2022-11-10 21:25:00
updated: 2022-12-26 22:00:00
swiper_index: 10 #置顶轮播图顺序，非负整数，数字越大越靠前
---

# 认识Maven

## 没有Maven管理项目会出现的问题

1. 很多模块，模块之间没有关系，手动管理关系，比较繁琐
2. 需要很多第三方功能，需要很多jar文件，需要手动从网络中获取各个jar包
3. 需要管理jar的版本
4. 管理jar文件之间的依赖。项目中a.jar需要用到b.jar里面的类

## Maven的用处

人工管理项目很麻烦，于是maven就来了，用maven有如下好处：

1. maven可以管理jar文件
2. 自动下载jar和他的文档，源代码
3. 管理jar直接的依赖，a.jar需要b.jar，maven会自动下载b.jar
4. 管理需要的jar版本
5. 编译、打包、测试、部署程序

## Maven的构建

构建主要包含项目的编译、测试、运行、打包、部署等，Maven支持的构建包括：

1. 清理(clean)，把之前的项目编译的东西删除，为新的编译代码做准备

2. 编译(compile)，把程序源代码**批量**编译为执行代码

3. 测试(test)，maven可以执行测试程序代码，验证你的功能是否正确，并生成测试报告

4. 打包(package)，把你的项目中所有的class文件，配置文件等所有资源放到一个压缩文件中

   这个压缩文件就是项目的结果文件，通常java程序，压缩文件是jar扩展名的

   对于web应用，压缩文件扩展名是.war

5. 安装(install)，把4中生成的文件jar，war安装到本机仓库

6. 部署(deploy)，把程序安装好可以执行（一般这步不交给maven）

# Maven进阶

## 依赖

### 依赖传递

### 可选依赖

可选依赖指对外隐藏当前所依赖的资源——不透明（你的东西给别人用）

设置`<optional>`为true之后，父级引用该资源的时候，不会看到该资源的下级依赖

![image-20230224101417628](https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/202302241014656.png)

### 排除依赖

排除依赖指主动断开依赖的资源，被排除的资源**无需指定版本**——不需要（你用别人的东西）

设置`<exclusions>`后，不会引用子级依赖其中的指定依赖

![image-20230224101608175](https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/202302241016194.png)

## 聚合

### 概念

聚合：将多个模块组织成一个整体，同时进行项目构建的过程称为聚合

聚合工程：通常是一个不具有业务功能的「空」工程（有且仅有一个pom文件)

作用：使用聚合工程可以将多个工程编组，通过对聚合工程进行构建，实现对所包含的模块进行同步构建

- 当工程中某个模块发生更新（变更）时，必须保障工程中与已更新模块关联的模块同步更新，此时可以使用聚合工程来解决批量模块同步构建的问题

![image-20230224103842584](https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/202302241038607.png)

### 步骤

聚合项目只有一个`pom`文件

1. 先声明该项目为聚合项目：创建Maven模块，设置打包类型为pom

   ![image-20230224104338556](https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/202302241043578.png)

2. 关联相应的其他项目：设置当前聚合工程所包含的子模块名称

   ![image-20230224104426305](https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/202302241044438.png)

   

## 继承

### 发现问题

![image-20230224104838334](https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/202302241048353.png)

1. 模块中有某些依赖是**全部**都有的，能不能简化？
2. 模块中有某些依赖是**部分**都有的，能不能简化？
3. 我要**升级**某一个的版本号，如何快速传播到所有的模块？

### 概念

概念：继承描述的是两个工程间的关系，与java中的继承相似，子工程可以继承父工程中的配置信息，常见于依赖关系的继承

作用：

- 简化配置

- 减少版本冲突

### 步骤

1. 创建Maven模块，设置打包类型为pom（聚合工程）

   ![image-20230224104338556](https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/202302241057380.png)

2. 在**父工程**的pom文件中配置依赖关系（子工程将沿用父工程中的依赖关系)

   ![image-20230224105924614](https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/202302241100164.png)

3. 在**父工程**中配置子工程中可选的依赖关系

   ![image-20230224110407890](https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/202302241104034.png)

4. 在**子工程**中配置当前工程所继承的父工程

   ![image-20230224110620617](https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/202302241106639.png)

5. 在**子工程**中配置使用父工程中可选依赖的坐标

   ![image-20230224110659103](https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/202302241106121.png)

    {% note warning no-icon %}

   子工程中使用父工程中的可选依赖时，仅需要提供群组id和项目id，**无需提供版本**，版本由父工程统一提供，避免版本冲突子工程中还可以定义父工程中没有定义的依赖关系

   {% endnote %}

## 聚合和继承的区别

作用

- 聚合用于快速构建项目

- 继承用于快速配置

相同点：

- 聚合与继承的pom.xml文件**打包方式**均为`pom`，可以将两种关系制作到同一个pom文件中

- 聚合与继承均属于设计型模块，并无实际的模块内容（无代码）

不同点：

- 聚合是在当前模块中配置关系，聚合可以感知到参与聚合的模块有哪些

- 继承是在子模块中配置关系，父模块无法感知哪些子模块继承了自己

## 属性

Maven中也可以定义类似Java的变量，叫做属性

```xml
<!--1.定义属性-->
<properties>
  <!--这里的标签名自定义-->
	<spring.version>5.2.10.RELEASE</spring.version>
  <junit.version>4.12</junit.version>
</properties>

<!--2.引用属性-->
...
	<version>${spring.version}</version>
...
```

## 版本管理

工程版本：

- SNAPSHOT(快照版本)

  - 项目开发过程中临时输出的版本，称为快照版本

  - 快照版本会随着开发的进展不断更新

- RELEASE(发布版本)
  - 项目开发到进入阶段里程碑后，向团队外部发布较为稳定的版本，这种版本所对应的构件文件是稳定的，即便进行功能的后续开发，也不会改变当前发布版本内容，这种版本称为发布版本

发布版本：

- alpha版
- beta版
- 纯数字版

## 多环境开发

maven提供配置多种环境的设定，帮助开发者使用过程中快速切换环境（白雪警告）

![image-20230224114247864](https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/202302241142888.png)

1. 定义多环境

   ![image-20230224114607057](https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/202302241146225.png)

2. 使用多环境（构建过程）

   ![image-20230224114641169](https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/202302241146191.png)

## 跳过测试

- 应用场景
  - 功能还没编写完
  - 快速打包
  - ...

如何执行？

1. 点击idea的Maven的闪电符号

2. 使用命令行

   ![image-20230224115135963](https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/202302241151984.png)

3. 细粒度控制跳过测试

   ![image-20230224115212507](https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/202302241152533.png)

 
