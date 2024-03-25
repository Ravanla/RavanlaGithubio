---
title: SpringBoot配置-获取数据
tags:
  - null
categories:
  - null
mathjax: true
abbrlink: fa896af7
date: 2023-03-11 18:57:23
description:
---

# 导入

> spring boot读取自定义的配置内容有什么用？
在实际开发中，我们通常需要在应用程序中读取一些配置参数，以便在程序中根据这些参数做出不同的处理。比如：

* 数据库连接配置信息：在应用程序中需要连接数据库时，需要读取数据库连接配置信息，如数据库的IP地址、端口号、用户名、密码等。

* 日志级别配置：日志是一个非常重要的组件，它可以帮助我们记录应用程序的运行状态。通过读取日志级别配置信息，我们可以控制日志的输出级别，从而避免产生过多的日志，减少系统负担。

* 业务参数配置：在实际的业务场景中，我们经常需要根据业务需求动态调整一些参数的值。通过读取自定义配置文件，我们可以灵活地修改这些参数，而不需要修改代码。

例如，假设我们有一个在线商城的网站，我们需要根据不同的促销活动设置不同的折扣。通过读取自定义配置文件，我们可以在不修改代码的情况下，灵活地配置不同的折扣，从而满足不同促销活动的需求。

# 开始

## 读取自定义的配置内容的三种方式

> Spring Boot 提供了很多种方式来读取自定义的配置内容，包括通过 application.properties 或 application.yml 配置文件、通过命令行参数、通过系统环境变量等。在这里，我们将介绍三种常见的读取自定义配置内容的方式：使用 @Value 注解、使用 @ConfigurationProperties 注解和使用 Environment 对象。

## @Value注解
首先，我们来看第一种方式：使用 @Value 注解。

`@Value` 注解可以用来直接注入配置文件中的值，具体做法是在需要读取配置内容的属性上使用该注解，并指定该属性在配置文件中的键名。例如，我们有一个配置文件 `application.properties`，其中定义了一个名为 test.message 的属性：

```
test.message=Hello Spring Boot!

```

在 Java 代码中，我们可以使用 · 注解读取该属性的值：

```java
@Value("${test.message}")
private String message;

```

这里的 `${test.message}` 表示使用属性名为 `test.message` 的值，将其注入到 message 字段中。在运行时，Spring Boot 会自动读取 `application.properties` 文件中的 test.message 属性，并将其注入到 message 字段中。

需要注意的是，在使用 @Value 注解读取配置内容时，属性类型和配置内容的类型需要匹配，否则会导致类型转换异常。例如，如果 test.message 的值为一个整数，而我们在 Java 代码中将其注入到一个 String 类型的属性中，就会出现类型转换异常。此外，@Value 注解还支持 SpEL 表达式，可以实现更加灵活的配置读取方式。

---
## @ConfigurationProperties注解
接下来我们来看第二种方式：使用 `@ConfigurationProperties` 注解。

`@ConfigurationProperties` 注解也可以用来读取配置文件中的内容，但相较于 `@Value` 注解而言，它更加强大和灵活。使用该注解需要定义一个与配置文件对应的 Java 类，并在类上使用该注解，指定该类与配置文件中的哪些属性对应。

假设我们有一个配置文件 `application.yml`，其中定义了如下的属性：

```yaml
my:
  message: Hello Spring Boot!
  timeout: 5000
  maxAttempts: 3

```

为了读取这些属性，我们可以定义一个与之对应的 Java 类：

```java
@ConfigurationProperties(prefix = "my")
public class MyConfig {
    private String message;
    private int timeout;
    private int maxAttempts;
    
    // 省略 getter 和 setter 方法
}

```

在这个类上，我们使用了 `@ConfigurationProperties` 注解，并指定了 `prefix` 属性为 my，这表示该类中的属性都与配置文件中以 my 开头的属性对应。接着，我们在类中定义了三个属性：`message`、`timeout` 和 `maxAttempts`，它们分别与配置文件中的 my.message、my.timeout 和 my.maxAttempts 属性对应。

最后，在我们需要使用这些配置的地方，我们可以直接注入该类的实例：

```java
@Service
public class MyService {
    @Autowired
    private MyConfig myConfig;
    
    public void doSomething() {
        System.out.println(myConfig.getMessage());
        System.out.println(myConfig.getTimeout());
        System.out.println(myConfig.getMaxAttempts());
    }
}

```

在这个例子中，我们在 `MyService` 类中使用了 `@Autowired` 注解注入了 `MyConfig` 类的实例，并使用其 `getter` 方法来获取配置内容。在运行时，Spring Boot 会自动读取 `application.yml` 文件中以 my 开头的属性，并将其注入到 MyConfig 类的实例中。

需要注意的是，在使用 `@ConfigurationProperties` 注解时，我们需要为该类的属性提供 getter 和 setter 方法，否则 Spring Boot 无法注入该类的实例。此外，我们还可以在配置文件中定义嵌套的属性和 List 类型的属性，只需要在 Java 类中相应地定义即可。

---

## @Configuration 注解

第三种方式是使用 @Configuration 注解。

这种方式与第二种方式类似，同样需要定义一个与配置文件对应的 Java 类。但与第二种方式不同的是，我们使用 @Configuration 注解来标注该类，表示该类中的所有 Bean 都与配置文件对应。具体来说，我们可以在这个类中定义各种 Bean，并使用 @Value 注解或 @ConfigurationProperties 注解来获取配置文件中的属性值。

假设我们有一个配置文件 application.yml，其中定义了如下的属性：

```yaml
my:
  message: Hello Spring Boot!
  timeout: 5000
  maxAttempts: 3

```

我们可以定义一个与之对应的 Java 类，用于获取这些属性：

```java
@Configuration
public class MyConfig {
    @Value("${my.message}")
    private String message;
    
    @Value("${my.timeout}")
    private int timeout;
    
    @Value("${my.maxAttempts}")
    private int maxAttempts;
    
    @Bean
    public MyService myService() {
        return new MyService(message, timeout, maxAttempts);
    }
}

```

在这个类中，我们使用了 `@Configuration` 注解标注该类，并在其中定义了三个属性：message、timeout 和 maxAttempts，它们分别与配置文件中的 my.message、my.timeout 和 my.maxAttempts 属性对应。接着，我们使用 @Value 注解来注入这些属性。

最后，我们还定义了一个名为 `myService` 的 Bean，用于创建一个 `MyService` 类的实例，并将 message、timeout 和 `maxAttempts` 作为参数传入。在这个例子中，我们并没有使用 `@Autowired` 注解来注入 `MyConfig` 类的实例，而是在 myService 方法中直接使用了 message、timeout 和 maxAttempts，这是因为我们只需要这三个属性的值来创建 MyService 类的实例，没有必要注入整个 `MyConfig` 类。

需要注意的是，当我们使用 @Configuration 注解来标注一个类时，该类中定义的 Bean 可以直接在其他地方使用，无需通过 `@Autowired` 注解来注入。而如果我们需要在其他类中注入该类的实例，则需要使用` @Autowired` 注解来注入该类的 Bean，而不是类本身。