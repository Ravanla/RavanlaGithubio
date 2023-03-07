---
title: SpringMvc快速入门
tags:
  - SpringMvc
  - 后端
categories: coding学习
abbrlink: aca092a7
date: 2023-02-15 15:25:00
updated: 2023-02-30 22:00:00
swiper_index: 10 #置顶轮播图顺序，非负整数，数字越大越靠前
---

## 概述

SpringMVC是一种基于]ava实现MVC模型的轻量级Web框架

优点

- 使用简单，开发便捷（相比于Servlet)

- 灵活性强

![image-20230219152600100](https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/202302191526170.png)

## 入门案例

1. 使用SpringMVC技术需要先导入SpringMVC坐标与Servlet坐标

   ```xml
   <!--SpringMVC-->
   <dependency>
       <groupId>org.springframework</groupId>
       <artifactId>spring-webmvc</artifactId>
       <version>5.2.10.RELEASE</version>
   </dependency>
   
   <dependency>
       <groupId>javax.servlet</groupId>
       <artifactId>javax.servlet-api</artifactId>
       <version>3.0.1</version>
       <scope>provided</scope>
   </dependency>
   ```

2. 创建SpringMVC控制器类（等同于Servlet功能）

   ```java
   @Controller
   public class UserController {
   	@RequestMapping("/save")
   	@ResponseBody
   	public String save(){
   		System.out.println("user save ...") ；
   		return "{'info':springmvc'}";
   	}
   }
   ```

3. 初始化SpringMVC环境（同Spring环境），设定SpringMVC加载对应的bean

   ```java
   @Configuration
   @ComponentScan("com.itheima")
   public class SpringMvcConfig {
   }
   ```

4. 初始化Servlet：容器，加载SpringMVC环境，并设置SpringMVC技术处理的请求

   ```java
   public class ServletContainersInitConfig extends AbstractDispatcherServletInitializer {
     // 将Spring注册到Tomcat服务器
   	protected WebApplicationContext createServletApplicationContext() {
   		AnnotationConfigWebApplicationContext ctx new = AnnotationConfigWebApplicationContext();
   		ctx.register(SpringMvcConfig.class);
   		return ctx;
     }
     
     // 拦截所有请求到Spring
     protected String[] getServletMappings() { 
       return new String[]{"/"};
     }
     
     protected WebApplicationContext createRootApplicationContext() { 
       return null;
     }
   }
   ```

   进阶版：

   ```java
   public class ServletContainersInitConfig extends AbstractAnnotationConfigDispatcherServletInitializer {
   
       // 加载spring容器配置
       @Override
       protected Class<?>[] getRootConfigClasses() {
           return new Class[]{SpringConfig.class};
       }
   
       // 加载springMVC容器配置
       @Override
       protected Class<?>[] getServletConfigClasses() {
           return new Class[]{SpringMvcConfig.class};
       }
   
       // 设置哪些请求归属springMVC处理
       @Override
       protected String[] getServletMappings() {
           return new String[]{"/"};
       }
   }
   ```

{% note info no-icon %}

使用lDEA的maven创建一个tomcat后，启动时遇到如下问题：

- 提示build success，但是tomcat却无法启动。

其实问题出在这行提示：在项目没有打成war包时，tomcat默认无法启动。

解决方法是：告诉Tomcat插件，当前不是使用war包装。在pom.xml的tomcat plugin的configuration中加入 `<ignorePackaging>true</ignorePackagin>`，即告诉tomcat，启动时忽略当前是否有war包，再次运行tomcat7:run命令，tomcat即可正常启动。

{% endnote %}

## 请求

### GET 和 POST

- SpringMVC中`GET`和`POST`请求在同一个方法中，不像servlet一样分为两个方法
- 接受参数直接写在方法的参数里面

```java
@Controller
@RequestMapping("/user")
public class UserController {

    @RequestMapping("/save")
    @ResponseBody
    public String save(String name) {
        System.out.println("user save..." + name);
        return "{'module':"+name+"}";
    }
}
```

### POST乱码处理

在`ServletContainersInitConfig`里面写了如下的：

```java
// POST乱码处理
@Override
protected Filter[] getServletFilters() {
    CharacterEncodingFilter filter = new CharacterEncodingFilter();
    filter.setEncoding("UTF-8");
    return new Filter[]{filter};
}
```

### URL请求 @RequestParam

请求的参数与实际的形参名字不相同，可以用`@RequestParam`注解

```java
@RequestMapping("/save")
@ResponseBody
public String save(@RequestParam("name") String userName) {
    System.out.println("user save..." + userName);
    return "{'module':"+userName+"}";
}
```

### JSON请求 @RequestBody

![image-20230221202826353](https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/202302212028456.png)

1. 导入Json坐标

   ```xml
   <dependency>
       <groupId>com.fasterxml.jackson.core</groupId>
       <artifactId>jackson-databind</artifactId>
       <version>2.9.0</version>
   </dependency>
   ```

2. 在`SpringMvcConfig`添加功能 **@EnableWebMvc**

   ```java
   @Configuration
   @ComponentScan("com.itheima.controller")
   @EnableWebMvc
   public class SpringMvcConfig {
   }
   ```

3. 在ApiFox发送**Body带Json数据**的请求

   ```json
   {
       "name":"baozi",
       "age":18,
       "address":{
           "province":"Guangdong",
           "city":"Shantou"
       }
   }
   ```

4. 请求参数加上`@RequestBody`

   ```java
   @RequestMapping("/Json")
   @ResponseBody
   public String ParamForJson(@RequestBody User user) {
       System.out.println("user save..." + user);
       return "{'module':'JsonOK'}";
   }
   ```

还可以接收数组哦！

```java
@RequestMapping("/JsonList")
@ResponseBody
public String ParamForJsonList(@RequestBody List<User> users) {
    System.out.println("users save..." + users);
    return "{'module':'JsonOK'}";
}
```

```json
{
    {"name":"baozi","age":18},{"name":"runrun","age":18}
}
```

### @RequestParam 和 @RequestBody 区别

- 区别

  - `@RequestParam`用于接收url地址传参，表单传参【application/x-www-form-urlencoded】

  - `@RequestBody`用于接收json数据【application/json】

- 应用

  - 后期开发中，发送json格式数据为主，`@RequestBody`应用较广

  - 如果发送非json格式数据，选用`@RequestParam`接收请求参数

### 日期类型参数处理

![image-20230221213521449](https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/202302212135475.png)

- 日期类型数据基于系统不同格式也不尽相同

  - 2088-08-18
  - 2088/08/18
  - 08/18/2088

- 接收形参时，根据不同的日期格式设置不同的接收方式

  ```java
  @RequestMapping("/dataParam")
  @ResponseBody
  public String dataParam(Date date,
                          @DateTimeFormat(pattern "yyyy-MM-dd")Date date1,
                          @DateTimeFormat(pattern "yyyy/MM/dd HH:mm:ss")Date date2){
    System.out.println("参数传递date=>"+date);
    System.out.printIn("参数传递date(yyyy-MM-dd)=>"+date1);
    System.out.println("参数传递date(yyyy/MM/ddHH:mm:ss)=>"+date2);
    return "{'module':'data param'}";
  }
  ```

  此时的URL：

  ```
  http://1oca1host/dataParam?date=2088/88/08&date1=2088-08-18&date2=2088/08/28 8:08:08
  ```

{% note info no-icon %}

Tips：

类型转换依赖的接口是`Converter`接口，里面有丰富的转换方法，比如上面的日期格式转换。

注意该接口某些方法依赖：`@EnableWebMvc`，请务必将其开启

{% endnote %}

## 响应

![image-20230221224215135](https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/202302212242179.png)

{% note info no-icon %}

Tips：

@ResponseBody 类型转换依赖的接口是`HttpMessageConcerter`接口

注意该接口某些方法依赖：`Jackson-databind`，请务必导入该坐标

{% endnote %}

**返回pojo对象数据**

![image-20230221225652515](https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/202302212256542.png)

**返回List数据**

![image-20230221225814462](https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/202302212258502.png)

## REST风格

### 简介

![image-20230222195451585](https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/202302221954638.png)

![image-20230222195710518](https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/202302221957547.png)

{% note info no-icon %}

上述行为是约定方式，约定不是规范，可以打破，所以称REST风格，而不是REST规范

描述模块的名称**通常使用复数**，也就是加s的格式描述，表示此类资源，而非单个资源，例如：users、books、accounts。…

{% endnote %}

实现区分行为动作的功能需要用到`@RequestMapping`

![image-20230222200609625](https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/202302222006653.png)

### 入门案例

主要就两个点：

- 设定http请求动作 `method`
- 设定请求参数（路径变量：`@PathVariable`）

![image-20230222200235493](https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/202302222002524.png)

![image-20230222200344414](https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/202302222003448.png)

### 形参注解 @PathVariable

![image-20230222200502240](https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/202302222005270.png)

### 快速开发

- 俩注解合二为一

![image-20230222202128648](https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/202302222021686.png)

- Mapping快速写

![image-20230222202220074](https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/202302222022101.png)

## 三种接受参数的区别

![image-20230222201029565](https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/202302222010597.png)

## 前端显示目录放行

因为我们用`SpringMvc`拦截了所有路径的请求，会导致放在`webApp`的前端页面无法被请求到

所以需要定义一个放行类来放行对应的目录（**白学**！后续可以一起定义在`SpringMvcConfig`里面）

1. 定义该放行类，在`Confing`包下

   ```java
   @Configuration
   public class SpringMvcSupport extends WebMvcConfigurationSupport {
       @Override
       protected void addResourceHandlers(ResourceHandlerRegistry registry) {
         	// 映射路径/pages/**到/pages目录下
           registry.addResourceHandler("/pages/**").
                   addResourceLocations("/pages/");
         	// 以下同理
           registry.addResourceHandler("/css/**").
                   addResourceLocations("/css/");
           registry.addResourceHandler("/js/**").
                   addResourceLocations("/js/");
           registry.addResourceHandler("/plugins/**").
                   addResourceLocations("/plugins/");
       }
   }
   ```

2. 别忘了在`SpringMvc`扫描上面的配置类

   ```java
   @Configuration
   @ComponentScan({"com.itheima.controller", "com.itheima.config"})
   @EnableWebMvc
   public class SpringMvcConfig {
   }
   ```

## 表现层与前端协议

就是与前端约定一种返回数据的格式，懂的都懂，我就不细说了

## 异常处理

程序运行时有时候不可避免会出现异常，出现异常现象的常见位置与常见诱因如下：

- 框架内部抛出的异常：因使用不合规导致

- 数据层抛出的异常：因外部服务器故障导致（例如：服务器访问超时）

- 业务层抛出的异常：因业务逻辑书写错误导致（例如：遍历业务书写操作，导致索引异常等） 
- 表现层抛出的异常：因数据收集、校验等规则导致（例如：不匹配的数据类型间导致异常） 
- 工具类抛出的异常：因工具类书写不严谨不够健壮导致（例如：必要释放的连接长期未释放等）

### 异常处理器

Spring给我们定义了异常处理器，方便我们集中的、统一的处理项目中出现的异常

```java
@RestControllerAdvice
public class ProjectExceptionAdvice {
  @ExceptionHandler(Exception.class) 
  public Result doException(Exception ex){ 
		return new Result(666,null);
  }
} 
```

- `@RestControllerAdvice`

  作用：用于声明该类是异常处理器类，前面加的`Rest`说明是用REST风格

  位置：专用于异常处理类上方

- `@ExceptionHandler`

  作用：设置指定异常的处理方案，功能等同于控制器(`Controller`)方法，出现异常后终止原始控制器执行，并转入当前方法执行

  位置：专用于异常处理的控制器方法上方

  说明：此类方法可以根据处理的异常不同，制作多个方法分别处理对应的异常

### 异常处理方案

1. 业务异常（BusinessException）
   - 发送对应消息传递给用户，提醒规范操作
2. 系统异常（SystemException）
   - 发送固定消息传递给用户安抚用户
   - 发送特定消息给运维人员，提醒维护
   - 记录日志
3. 其他异常（Exception）
   - 发送固定消息传递给用户，安抚用户
   - 发送特定消息给编程人员，提醒维护（纳入预期范围内）
   - 记录日志

```java
@RestControllerAdvice
public class ProjectExceptionAdvice {

    @ExceptionHandler(SystemException.class)
    public Result doSystemException(SystemException ex) {
        System.out.println("处理系统异常！");
        //1. 记录日志
        //2. 发送消息给运维
        //3. 发送消息（ex对象）给开发人员
        return new Result(ex.getCode(), ex.getMessage(), null); //4. 返回给前端
    }

    @ExceptionHandler(BusinessException.class)
    public Result doBusinessException(BusinessException ex) {
        System.out.println("处理业务异常！");
        //可以不记录日志
        //这类异常不需要发送消息提醒
        return new Result(ex.getCode(), ex.getMessage(), null); // 返回给前端
    }

    // 不能省略，用于处理其他异常
    @ExceptionHandler(Exception.class)
    public Result doException(Exception ex) {
        System.out.println("处理其他异常！");
        //1. 记录日志
        //2. 发送消息给运维
        //3. 发送消息（ex对象）给开发人员
        return new Result(Code.SYSTEM_UNKNOW_ERR, "系统繁忙", null); //4. 返回给前端
    }
}
```

### 异常处理编写步骤

1. 自定义（系统级|业务级|...）异常

   ![image-20230223172701250](https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/202302231727492.png)

2. 自定义异常编码（持续补充）

   ![image-20230223172810803](https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/202302231728938.png)

3. 将可能出现异常的地方进行包装（可以使用AOP快速开发）

   ![image-20230223172924696](https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/202302231729727.png)

4. 拦截并处理异常

   ![image-20230223173001729](https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/202302231730862.png)

## 拦截器

### 概念

官方：拦截器(Interceptor)是一种动态拦截方法调用的机制，在SpringMVC中动态拦截控制器方法的执行

人话：拦截器是在进入Spring框架主体的 前面 与 出去之后 做的行为

![image-20230223203446294](https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/202302232034406.png)

作用：

- 在指定的方法调用前后执行预先设定的代码
- 阻止原始方法的执行

### 拦截器与过滤器区别

归属不同：Filter属于Servlet技术，Interceptor属于SpringMVC技术

拦截内容不同：Filter对所有访问进行增强，Interceptor仅针对SpringMVC的访问进行增强

### 入门案例

1. 声明拦截器的bean，并实现HandlerInterceptor接口**（注意：扫描加载bean）**

   路径：`/controller/interceptor`

   ```java
   @Component
   public class ProjectInterceptor implements HandlerInterceptor {
       @Override
       public boolean preHandle(...) throws Exception {
           System.out.println("preHandle...");
         	// 这里返回false后面直接不执行，结束
           return true;
       }
   
       @Override
       public void postHandle(...) throws Exception {
           System.out.println("postHandle...");
       }
   
       @Override
       public void afterCompletion(...) throws Exception {
           System.out.println("afterCompletion...");
       }
   }
   ```

2. 定义配置类，继承WebMvcConfigurationSupport，实现addInterceptor方法（注意：扫描加载配置）

   路径：`/Config`

   ```java
   @Configuration
   public class SpringMvcSupport extends WebMvcConfigurationSupport {
       @Autowired
       private ProjectInterceptor projectInterceptor;
   
       // 过滤访问路径的静态资源
       @Override
       protected void addResourceHandlers(ResourceHandlerRegistry registry) {
           ...
       }
   		
     	// 配置类
       @Override
       protected void addInterceptors(InterceptorRegistry registry) {
         // 添加拦截器并设定拦截的访问路径，路径可以通过可变参数设置多个
           registry.addInterceptor(projectInterceptor)
             .addPathPatterns("/books", "/books/*");
       }
   }
   ```

{% note warning no-icon %}

Interceptor可以定义在`SpringMvcConfig`，需要实现WebMvcConfigurer接口（注意：侵入式较强）

代码如下：

{% endnote %}

```java
@Configuration
@ComponentScan({"com.itheima.controller"})
@EnableWebMvc
public class SpringMvcConfig implements WebMvcConfigurer {
    @Autowired
    private ProjectInterceptor projectInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(projectInterceptor).addPathPatterns("/books", "/books/*");
    }
}
```

### 执行顺序

preHandle

- **return true**
  - controller
  - postHandle
  - afterCompletion

- **return false**
  - 结束

### 拦截器链

由多个拦截器组成的叫做拦截器链

![image-20230223220730061](https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/202302232207213.png)
