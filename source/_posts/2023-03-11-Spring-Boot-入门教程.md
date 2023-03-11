---
title: Spring Boot 入门教程
tags:
  - null
categories:
  - null
mathjax: true
abbrlink: ac8c232s
date: 2023-03-11 09:17:46
description:
---
# 博主跟学视频
<div class="about_page">
  <div align=center class="aspect-ratio">
      <iframe src="https://www.bilibili.com/video/BV1Lq4y1J77x/?spm_id_from=333.337.search-card.all.click&vd_source=4ae9f2a80a07a640db3fdaff67882919" 
      scrolling="no" 
      border="0" 
      frameborder="no" 
      framespacing="0" 
      high_quality=1
      danmaku=1 
      allowfullscreen="true"> 
      </iframe>
  </div>
</div>

<br>

---

# 入门教程

## 准备工作
> 在开始学习Spring Boot之前，我们需要确保我们已经安装好Java和一个IDE。本教程使用的是IntelliJ IDEA作为IDE，因此您需要在计算机上安装它。如果您还没有安装Java和IntelliJ IDEA，请根据您的操作系统的要求安装它们。

## 创建Spring Boot应用程序
打开IntelliJ IDEA并单击“Create New Project”按钮。

选择“Spring Initializr”作为项目类型。

选择项目的语言，本教程使用Java。

输入项目的名称和位置。

选择您需要的Spring Boot版本。

单击“Next”按钮。

选择您需要的依赖项。本教程使用的是Web依赖项，这将允许我们创建一个Web应用程序。

单击“Finish”按钮。

IntelliJ IDEA将会为您创建一个新的Spring Boot应用程序。

## 创建一个简单的Web应用程序
1. 在项目的src/main/java目录下，创建一个名为“HelloController”的新类。
2. 在HelloController类中添加一个简单的GET请求处理程序。
```kotlin
@RestController
public class HelloController {

    @GetMapping("/")
    public String hello() {
        return "Hello World!";
    }
}
```

这个处理程序使用@RestController注释来指示它是一个RESTful Web服务，并使用@GetMapping注释来指示它应该处理HTTP GET请求。它返回一个字符串“Hello World!”，这将作为Web服务的响应。
3. 在项目的src/main/java目录下，创建一个名为“Application”的新类。
4. 在Application类中添加@SpringBootApplication注释。
```typescript
@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```
这个类使用@SpringBootApplication注释，这将为Spring Boot应用程序提供所需的配置。它还包含一个名为“main”的方法，该方法启动Spring Boot应用程序。
6. 运行应用程序。
7. 打开Web浏览器并导航到http://localhost:8080/。您应该看到一个“Hello World！”消息。
8. 这样就完成了java spring boot 的入门教程

## 小结
> 在本教程中，我们介绍了如何使用Spring Boot创建一个简单的Web应用程序。我们编写了一个简单的Web服务来响应HTTP GET请求，并使用@SpringBootApplication注释为Spring Boot提供所需的配置。希望这篇文章对您有所帮助，并可以帮助您开始

---

# SpringBooti起步依赖原理分析

> Spring Boot的起步依赖是其最显着的特点之一，它允许您仅使用一行代码就能快速集成各种功能模块。在本文中，我们将介绍Spring Boot起步依赖的原理，以及为什么它能够如此有效地简化应用程序开发。

## 起步依赖是什么？
Spring Boot起步依赖是一组预定义的依赖项集合，可将常见的库和框架集成到应用程序中，从而提高了开发人员的生产力。Spring Boot提供了许多不同类型的起步依赖，如Web、JPA、Security等，每个起步依赖都提供了一个特定的功能集。

## 起步依赖的原理
Spring Boot的起步依赖利用了Maven和Gradle中的一项功能，称为“依赖管理”。当您向Maven或Gradle添加依赖项时，它们会检查这些依赖项所需的其他依赖项，并将它们自动添加到项目中。

Spring Boot的起步依赖就是利用了这个机制。每个起步依赖都是一个特定的功能集合，它们定义了必需的依赖项列表。当您向Maven或Gradle添加一个Spring Boot起步依赖时，它会自动将该依赖所需的所有依赖项添加到项目中。

例如，如果您添加了Spring Boot的Web起步依赖项，它将自动添加Spring MVC、Tomcat和其他必需的依赖项，以便您可以使用Spring MVC框架创建Web应用程序。这使得使用Spring Boot的应用程序变得非常简单，并且可以显着提高开发人员的生产力。

## 起步依赖的优势
Spring Boot的起步依赖提供了许多优势，使其成为现代Java应用程序开发的首选框架之一。

1. 快速开发：Spring Boot的起步依赖使应用程序开发变得更加简单和快速。它们自动将所需的依赖项添加到项目中，从而减少了开发人员的工作量。
2. 一致性：Spring Boot的起步依赖提供了一致的构建方式和配置方式，使得应用程序的开发和部署变得更加容易。
3. 可伸缩性：Spring Boot的起步依赖是高度可扩展的，可以根据应用程序的需求添加新的依赖项和功能。
4. 开箱即用：Spring Boot的起步依赖提供了许多功能，如安全、数据访问、日志记录等，这些功能都是开箱即用的，

---

# SpringBoot配置-配置文件分类

> 在Spring Boot中，我们可以使用多种方式来配置我们的应用程序。其中之一是使用配置文件。在本文中，我们将介绍Spring Boot中的配置文件分类以及如何使用它们来配置应用程序。

配置文件分类
Spring Boot中的配置文件可以分为以下几类：

## 应用程序属性文件
这是最常见的配置文件类型，通常用于配置应用程序的一般属性，如端口号、数据库连接信息等。这些属性通常存储在名为application.properties或application.yml的文件中。这些文件应该位于应用程序的classpath路径下。

application.properties文件的示例：

```bash
# 配置端口号
server.port=8080

# 配置数据库连接信息
spring.datasource.url=jdbc:mysql://localhost:3306/mydb
spring.datasource.username=root
spring.datasource.password=password
```
application.yml文件的示例：

```yaml
# 配置端口号
server:
  port: 8080

# 配置数据库连接信息
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/mydb
    username: root
    password: password

```

## 应用程序配置文件
应用程序配置文件通常用于配置不同的环境，如开发、测试、生产等。这些文件应该位于应用程序的classpath路径下，并按照以下命名规则命名：


```
application-{profile}.properties
application-{profile}.yml
```
其中，{profile}是配置文件的环境名称，例如：


application-dev.properties: 配置开发环境下的属性
application-test.yml: 配置测试环境下的属性
application-prod.properties: 配置生产环境下的属性
可以使用spring.profiles.active属性来设置当前激活的配置文件。例如，在开发环境中，我们可以将application-dev.properties配置文件设置为活动配置文件：

```java
spring.profiles.active=dev
```
## 外部配置文件
Spring Boot还支持从外部文件中读取配置。这些文件可以是文件系统、操作系统环境变量、系统属性、JNDI等。外部配置文件的位置和名称可以使用spring.config.name和spring.config.location属性进行配置。

例如，我们可以将外部配置文件的位置和名称配置为/opt/myapp/myapp.properties：

```java
spring.config.name=myapp
spring.config.location=file:/opt/myapp/
```
## 小结
> Spring Boot的配置文件非常灵活，可以轻松地配置应用程序的各种属性。通过使用不同的配置文件类型，我们可以为不同的环境提供不同的配置。此外，Spring Boot还支持从外部文件中读取配置，使应用程序配置更加灵活和可扩展。

---

# SpringBoot配置-yaml基本语法

> 在Spring Boot中，我们可以使用YAML（YAML Ain't Markup Language）格式来编写配置文件。YAML是一种简洁、可读性高的数据格式，它的语法规则相对于XML和JSON来说更加简单，同时也支持嵌套结构和列表。

在本文中，我们将介绍YAML的基本语法，以便您能够更好地编写Spring Boot的配置文件。

## 基本语法

### 键值对

在YAML中，键值对使用冒号“:”来分隔，键和值之间要有一个空格。例如：

```yaml
name: John Smith
age: 30

```

### 嵌套结构

在YAML中，可以使用缩进来表示嵌套结构。例如：

```yaml
server:
  port: 8080
  host: localhost

```

### 列表

在YAML中，可以使用“-”来表示一个列表项。例如：

```yaml
fruits:
  - apple
  - orange
  - banana

```

### 多行字符串

在YAML中，可以使用“|”或“>”表示多行字符串。其中，“|”表示保留字符串中的空格和换行符，“>”表示将字符串中的换行符替换为一个空格。例如：

```yaml
description: |
  This is a multi-line
  description.

```

```yaml
description: >
  This is a multi-line
  description.

```

### 引用

在YAML中，可以使用“&”和“\*”来表示引用。例如：

```yaml 
person: &person
  name: John
  age: 30

person1: *person

```

在上面的例子中，我们定义了一个名为“person”的引用，然后在“person1”中使用了这个引用。

### 注释

在YAML中，可以使用“#”表示注释。例如：

```yaml
# This is a comment
name: John

```

## 小结

> YAML是一种简洁、可读性高的数据格式，它的语法规则相对于XML和JSON来说更加简单，同时也支持嵌套结构和列表。在Spring Boot中，我们可以使用YAML格式来编写配置文件。通过掌握YAML的基本语法，您可以更好地编写Spring Boot的配置文件。

---

# SpringBooti配置-yaml数据格式

> 在Spring Boot中，我们可以使用YAML（YAML Ain't Markup Language）数据格式来编写配置文件。相对于传统的属性文件，YAML更加易读、易写、易于维护。本文将介绍如何使用YAML格式来编写Spring Boot的配置文件。

## 基本语法

### 键值对

在YAML中，键值对使用冒号“:”来分隔，键和值之间要有一个空格。例如：

```yaml
server:
  port: 8080
  context-path: /demo

```

在上面的例子中，我们使用了两个键值对，分别为“server.port”和“server.context-path”。

### 列表

在YAML中，可以使用“-”来表示一个列表项。例如：

```yaml
fruits:
  - apple
  - orange
  - banana

```

在上面的例子中，我们定义了一个名为“fruits”的列表，它包含了三个水果。

### 嵌套结构

在YAML中，可以使用缩进来表示嵌套结构。例如：

```yaml
server:
  port: 8080
  servlet:
    context-path: /demo

```

在上面的例子中，我们定义了一个名为“server”的嵌套结构，它包含了两个键值对，其中“servlet”又包含了一个键值对。

### 引用

在YAML中，可以使用“&”和“\*”来表示引用。例如：

```yaml
person: &person
  name: John
  age: 30

person1: *person

```

在上面的例子中，我们定义了一个名为“person”的引用，然后在“person1”中使用了这个引用。

### 多行字符串

在YAML中，可以使用“|”或“>”表示多行字符串。其中，“|”表示保留字符串中的空格和换行符，“>”表示将字符串中的换行符替换为一个空格。例如：

```yaml
description: |
  This is a multi-line
  description.

```

```yaml
description: >
  This is a multi-line
  description.

```

## 高级特性

### 环境相关配置

在Spring Boot中，我们可以使用不同的配置文件来适应不同的环境，例如application.yml、application-dev.yml、application-prod.yml等。当我们在不同的环境中启动应用程序时，Spring Boot会自动加载对应的配置文件。例如，在开发环境中，Spring Boot会自动加载application-dev.yml文件。

### 导入其他配置文件

在YAML中，可以使用“$include”关键字来导入其他的YAML配置文件。例如：

```yaml
$include: common.yml

server:
  port: 8080

```

在上面的例子中，我们使用“$include”关键字来导入了一个名为“common.yml”的配置文件。

### 引用环境变量

在YAML中，可以使用“${}”语法来引用环境变量。例如：

```yaml
server:
  port: ${SERVER_PORT:8080}

```

在上面的例子中，我们使用“${}”语法来引用一个名为“SERVER\_PORT”的环境变量，如果没有定义该环境变量，则使用默认值8080。

###  使用属性文件

在Spring Boot中，我们也可以使用属性文件（.properties）来编写配置文件。当我们在同一目录下同时存在application.yml和application.properties文件时，Spring Boot会优先使用application.properties文件中的配置。属性文件的语法与YAML略有不同，例如：

```
propertiesCopy codeserver.port=8080
server.context-path=/demo

```

在上面的例子中，我们使用了两个键值对，分别为“server.port”和“server.context-path”。

## 小结

> YAML是一种易读、易写、易于维护的数据格式，在Spring Boot中被广泛使用。在本文中，我们介绍了YAML的基本语法和一些高级特性，包括环境相关配置、导入其他配置文件、引用环境变量和使用属性文件。通过掌握YAML的基本语法和高级特性，我们可以更加灵活地编写Spring Boot的配置文件，提高开发效率。

---

