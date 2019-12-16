## Vuex

### 1.初出茅庐 来个小Demo 

1、创建项目

```
vue init webpack testvuex
```

2、安装vuex

```
npm install vuex --save
```

3、编写全局状态文件store.js

```js
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const state = {
  count: 3
}
const mutations = {
  add(state) {
    state.count++;
  },
  reduce(state) {
    state.count--;
  }
}
export default new Vuex.Store({
  state,
  mutations
})

```

4、编写也Count.vue 组件 引入 store.js

```vue
<template>
  <div>
    <h2>{{msg}}</h2>
    <hr />
    <h3>{{$store.state.count}}</h3>
    <p>
      <button @click="$store.commit('add')">add</button>
      <button @click="$store.commit('reduce')">reduce</button>
    </p>
  </div>
</template>
<script >
import store from "@/vuex/store";
export default {
  data() {
    return {
      msg: "Hello World"
    };
  },
  store
};
</script>

<style scoped>
</style>
```

5、将Count.vue 加入路由router/index.js 中

```js
import Count from '@/components/Count'
```

```js
,
    {
      path: '/count',
      component: Count
    }
```

6、启动项目

```
npm run dev
```

7、在浏览器的Url 添加  count 显示 Count.vue 界面



### 2.state访问状态对象

目的：在Count.vue 可以通过 {{count}} 显示 state中 count

1、通过computed的计算属性直接赋值

```
computed:{
    count(){
        return this.$store.state.count;
    }
}
```



2、通过mapState的对象来赋值

```
import {mapState} from 'vuex';
```

```
computed:mapState({
        count:state=>state.count
 })
```

3、通过mapState的数组来赋值 （常用方法）

```
 computed:mapState(["count"])
```



### 3、Mutations修改状态

方法一：

1、设置接受参数

```
const mutations = {
  add(state, num) {
    state.count += num;
  },
  reduce(state) {
    state.count--;
  }
}
```

2、设置传递参数

```vue
 <button @click="$store.commit('add',10)">add</button>
```

方法二、

绑定mapMutations

```

import { mapState, mapMutations } from "vuex";
```

```
methods: mapMutations(["add", "reduce"])
```

```
 <button @click="reduce">reduce</button>
```

### 4、getters计算过滤操作 

```
const getters = {
    count:function(state){
        return state.count +=100;
    }
}
```

```
export default new Vuex.Store({
    state,mutations,getters
})
```

简写

```
import { mapState,mapMutations,mapGetters } from 'vuex';
```

```
...mapGetters(["count"])
```



### 5、actions异步修改状态 

```
const actions ={
    addAction(context){
        context.commit('add',10)
    },
    reduceAction({commit}){
        commit('reduce')
    }
}
```

- `context`：上下文对象，这里你可以理解称store本身。
- `{commit}`：直接把commit对象传递过来，可以让方法体逻辑和代码更清晰明了。

```
<p>
  <button @click="addAction">+</button>
  <button @click="reduceAction">-</button>
</p>
```

```
methods:{
    ...mapMutations([  
        'add','reduce'
    ]),
    ...mapActions(['addAction','reduceAction'])
},
```

### 6、module模块组 

```
const moduleA={
    state,mutations,getters,actions
}
```

```
export default new Vuex.Store({
    modules:{a:moduleA}
})
```

```
<h3>{{$store.state.a.count}}</h3>
```

```
computed:{
    count(){
        return this.$store.state.a.count;
    }
},
```