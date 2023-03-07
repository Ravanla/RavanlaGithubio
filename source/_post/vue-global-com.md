---
title: Vue全局注册组件
date: 2021-04-26 17:10:58
tags: [vue,前端]
categories: coding学习
cover: https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/vue001.jpeg
---

今天在看main.js文件里面的代码，发现全局注册有两种方式，一种是用`Vue.component()`，另一种是用`Vue.use()`，于是上网搜了一下两者的区别。

### Vue.component()

`component()`是Vue**组件**注册方式，分为全局注册和局部注册：

#### 全局注册

在`main.js`里面注册，注册之后可以用在任何新创建的 Vue 根实例 的模板中。

```vue
import BetterScroll from './components/BetterScroll'  // 组件路径

Vue.component('BetterScroll', BetterScroll)
```

#### 局部注册

当一个组件只在特定区域使用，你可以将它注册在你想用的实例当中：

```vue
import ComponentA from '....'

export default {
  components: {
    'component-a': ComponentA
  }
}

// 使用
<component-a></component-a>
```

注意：**局部注册的组件在其子组件中*不可用***，如果想要在子组件中用，需要在子组件再注册一次。

### Vue.use()

Vue.use()是全局注册**插件**

> 在一篇文章[Vue.use自定义自己的全局组件](https://www.cnblogs.com/yesyes/p/6658611.html)中，提到自定义好组件后，对组件又进行了封装，封装成了插件，在方法中通过Vue.component对自定义的组件进行了全局注册。

