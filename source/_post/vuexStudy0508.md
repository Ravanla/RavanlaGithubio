---
title: 简单学一下Vuex
date: 2021-05-09 15:59:30
tags: [vue,前端]
categories: coding学习
cover: https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/20210511185521.png
---

众所周知在vue中，组件之间传递数据需要一步一步接着传递，这样写起来很麻烦，也会使代码晦涩难懂。因此，**vuex**诞生了！

## vuex is what？

**Vuex 是一个专为 Vue.js 应用程序开发的`状态管理模式`。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。**

说白了，vuex就是一个**仓库**，用来存储**状态**(也就是数据)，这些状态可以在不同组件中很方便地获取到。

## vuex的使用

### 目录

先来看vuex的目录基本结构。先建一个store文件夹，文件夹下有两个主要的文件(夹)，一个是`index.js`，一个是`modules`文件夹。

![](https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/20210508161145.png)

- index.js：vuex的入口，用于注册`module`，常规的写法通常将store分成几个**模块**(module)，再在入口文件里统一注册

  ![](https://baozi-blog.oss-cn-shenzhen.aliyuncs.com/images/20210508161632.png)

- modules：每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块

  ```js
  const moduleA = {
    state: () => ({ ... }),
    mutations: { ... },
    actions: { ... },
    getters: { ... }
  }
  ```

接下来对模块的各个方法进行详细介绍

### 状态（state）

state可以看做组件的**data**，用于存储状态对象

```js
// 示例
const state = {
  count:0
}
```

#### **在Vue 组件中展示状态**

```js
// 示例：一个 Counter 组件
const Counter = {
  template: `<div>{{ count }}</div>`,
  computed: {
    count () {
      return store.state.count // 这里
    }
  }
}
```

#### `mapState` 辅助函数

当一个组件需要获取多个状态的时候，我们一个一个写显得很不美观，这时候可以用`mapState` 辅助函数帮助我们生成计算属性，~~也显得b格比较高大上~~

```js
import { mapState } from 'vuex'

export default { // 对象展开运算符
    computed: {
      ...mapState([
    	// 映射 this.count 为 store.state.count
    	'count'
    ]),
      otherComputed () { /* ... */ },
  }
}
```

### Getter

有时候我们并不是直接想要一个数据，比如需要对列表进行过滤并计数：

```js
computed: {
  doneTodosCount () {
    return this.$store.state.todos.filter(todo => todo.done).length
  }
}
```

在多个组件中复制这个函数不是很理想，这时候就可以用到`getter`

就像计算属性一样，`getter` 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。

```js
const store = new Vuex.Store({
  state: {
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
  },
  getters: {
    doneTodos: state => { // Getter 接受 state 作为其第一个参数
      return state.todos.filter(todo => todo.done)
    }
  }
})
```

#### `mapGetters` 辅助函数

```js
import { mapGetters } from 'vuex'

export default {
  // ...
  computed: {
  // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      'doneTodosCount',
      'anotherGetter',
      // ...
    ])
  }
}
```

### Mutation

**更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。**

```js
const state = {
	count:0
}

const mutations = {
 increment (state) {
 	// 变更状态
 	state.count++
 }

 SET_COUNT: (state, payload) => {
 	// 提交载荷（Payload）
 	state.count = payload
 }
}

// other.vue
this.$store.commit('increment')
this.$store.commit('SET_COUNT', 10)
```

 一条重要的原则就是要记住**Mutation 必须是同步函数**

#### `mapMutations` 辅助函数

```js
import { mapMutations } from 'vuex'

export default {
  // ...
  methods: {
    ...mapMutations([
      'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`

      // `mapMutations` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
    ]),
    ...mapMutations({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    })
  }
}
```

### Action

Action 类似于 mutation，不同在于：

- Action **提交**的是 **mutation**，而不是直接变更状态。
- Action 可以包含任意**异步**操作。

```js
const state = {
	count:0
}

const mutations = {
 increment (state) {
 	// 变更状态
 	state.count++
 }
}

const actions = {
  incrementAsync ({ commit }) { // 模拟异步操作
    setTimeout(() => {
      commit('increment')
    }, 1000)
  }
}

// other.vue
this.$store.dispatch('incrementAsync')
```

购物车示例，涉及到**调用异步 API** 和**分发多重 mutation**：

```js
actions: {
  checkout ({ commit, state }, products) {
    // 把当前购物车的物品备份起来
    const savedCartItems = [...state.cart.added]
    // 发出结账请求，然后乐观地清空购物车
    commit(types.CHECKOUT_REQUEST)
    // 购物 API 接受一个成功回调和一个失败回调
    shop.buyProducts(
      products,
      // 成功操作
      () => commit(types.CHECKOUT_SUCCESS),
      // 失败操作
      () => commit(types.CHECKOUT_FAILURE, savedCartItems)
    )
  }
}
```

#### `mapActions` 辅助函数

```js
import { mapActions } from 'vuex'

export default {
  // ...
  methods: {
    ...mapActions([
      'increment', // `this.increment()`  / 'this.increment(amount)'
      ]),
  }
}
```

Action 通常是异步的，那么如何知道 action 什么时候结束呢？

建议看官网文档！https://vuex.vuejs.org/zh/guide/actions.html

