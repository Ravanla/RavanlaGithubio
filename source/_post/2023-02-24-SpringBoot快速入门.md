---
title: SpringBoot快速入门
tags:
  - SpringBoot
  - 后端
categories: coding学习
abbrlink: 4ccc97e8
date: 2023-02-24 20:00:00
updated: 2023-02-30 22:00:00
swiper_index: 10 #置顶轮播图顺序，非负整数，数字越大越靠前
---

# SpringBoot起步依赖

**Starter**

- SpringBoot中常见项目名称，定义了当前项目使用的所有项目坐标，以达到减少依赖配置的目的

![image-20230224165211103](https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/202302241652310.png)

**parent**

- 所有SpringBoot项目要继承的项目，定义了若干个坐标版本号（依赖管理，而非依赖），以达到减少依赖冲突的目的
- spring-boot-starter-parent（2.5.0)与spring-boot-starter-parent（2.4.6)共计57处坐标版本不同

**实际开发**

- 使用任意坐标时，仅书写GAV中的G和A，V由SpringBoot提供
- 如发生坐标错误，再指定version(要小心版本冲突)

# SpringBoot程序启动

**启动方式**

SpringBoot的引导类是项目的入口，运行成main方法就可以启动项目

![image-20230224165604898](https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/202302241656917.png)

- SpringBoot在创建项目时，采用`jar`的打包方式

**更变起步依赖（starter）**

使用maven依赖管理变更起步依赖项

![image-20230224170254618](https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/202302241702635.png)

- Jetty比Tomcat更轻量级，可扩展性更强（相较于Tomcat)，谷歌应用引擎(GAE)已经全面切换为Jetty

# 基础配置

## 配置格式

SpringBoot提供了多种属性配置方式

- application.**properties**

  ```properties
  server.port=80
  ```

- application.**yml**（主流）

  ```yml
  server:
  	port:81
  ```

- application.**yaml**（其实和yml是同个东西）

  ```yaml
  server:
  	port:82
  ```

SpringBoot配置文件加载顺序（了解）

- application.**properties** > application.**yml** > application.**yaml**

{% note warning no-icon %}

SpringBoot核心配置文件名为application

SpringBoot内置属性过多，且所有属性集中在一起修改，在使用时，通过提示键+关键字修改属性

{% endnote %}

## 读取yaml配置

- 使用@Value读取单个数据，属性名引用方式：**${一级属性名。二级属性名…}**

  ![image-20230224174750501](https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/202302241747544.png)

- 封装全部数据到Environment对象

  ![image-20230224174811741](https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/202302241748763.png)

- 自定义对象封装指定数据

  ![image-20230224174900276](https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/202302241749299.png)

  自定义对象封装数据警告解决方案

  ```xml
  <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-configuration-processor</artifactId>
      <optional>true</optional>
  </dependency>
  ```

## 多环境开发

### yaml文件多环境启动

**在yaml里**，用`---`（三个划线）区分不同环境配置

![image-20230224180117829](https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/202302241801856.png)

![image-20230224180148751](https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/202302241801786.png)

### properties文件多环境启动

![image-20230224180238326](https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/202302241802363.png)

### 命令行多环境启动

{% note warning no-icon %}

打包前注意 clean

{% endnote %}

- 带参数启动SpringBoot

![image-20230224202358657](https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/202302242023684.png)

## 配置文件分级

![image-20230224204144087](https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/202302242041120.png)

# Junit

直接运行就OK啦

```java
@SpringBootTest
class SpringBoot01QuickstartApplicationTests {

    @Autowired
    private BookService bookService;

    @Test
    void testSave() {
        bookService.save();
    }

}
```

# Mybatis

1. 在初始化包时，勾选上Mybatis依赖和Jdbc依赖

2. 在yml配置里设置数据源参数

   ![image-20230224211944300](https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/202302242119334.png)

   ![image-20230224211957897](https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/202302242119923.png)

3. 在dao里定义数据层接口与映射配置

   ![image-20230224212032325](https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/202302242120355.png)

4. 测试类中注入dao接口，测试功能

   ![image-20230224212107319](https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/202302242121345.png)

   