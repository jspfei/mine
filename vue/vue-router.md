## vue-router

### 1、创建页面和配置路由

1、创建页面 hi.vue

```vue
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'hi',
  data () {
    return {
      msg: 'Hi, I am JSPang'
    }
  }
}
</script>


<style scoped>

</style>
```

2、引入 Hi组件，我们在router/index.js文件的上边引入Hi组件

```
import Hi from '@/components/Hi'
```

3、增加路由配置：在`router/index.js`文件的routes[]数组中，新增加一个对象，代码如下。

```js
{
path:'/hi',
name:'Hi',
component:Hi
}
```

### 2、**router-link制作导航**

```
 <router-link to="/">[显示字段]</router-link>
```

在 src/App.vue文件中的template里加入下面代码，实现导航。

```
<p>导航 ：
   <router-link to="/">首页</router-link>
   <router-link to="/hi">Hi页面</router-link>
</p>
```

### 3、子路由

1、App.vue代码添加子路由导航

```html
<p>导航 ：
      <router-link to="/">首页</router-link> | 
      <router-link to="/hi">Hi页面</router-link> |
      <router-link to="/hi/hi1">-Hi页面1</router-link> |
      <router-link to="/hi/hi2">-Hi页面2</router-link>
</p>
```

2、改写Hi.vue页面

把Hi.vue改成一个通用的模板，加入`<router-view>`标签，给子模板提供插入位置。“Hi页面1” 和 “Hi页面2” 都相当于“Hi页面”的子页面，有点想继承关系。我们在“Hi页面”里加入`<router-view>`标签。

3、在components目录下新建Hi1.vue 和Hi2.vue

```vue
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>
<script>
export default {
  name: 'hi',
  data () {
    return {
      msg: 'Hi, I am Hi1!' // Hi2
    }
  }
}
</script>
<style scoped>

</style>
```

4、修改router/index.js代码，添加chidren字段

```json
,{
      path:'/hi',
      component:Hi,
      children:[
        {path:'/',component:Hi},
        {path:'hi1',component:Hi1},
        {path:'hi2',component:Hi2},
      ]
    }
```

### 4、vue-router如何参数传递 

1、设置传递参数

```vue
 <router-link :to="{name:'hi1',params:{username:'js',id:111}}">hi1页面</router-link>|
```

2、接受参数

```vue
  <div>{{msg}} --{{$route.params.username}} ---{{$route.params.id}}</div>
```

### 5、单页面多路由区域操作 

```vue
 <router-view />
    <router-view name="left" style="float:left;width:50%;height:300px;background-color:#eee"></router-view>
    <router-view name="right" style="float:right;width:50%;height:300px;background-color:#c0c"></router-view>
```

```js
 {
      path: '/',
      name: 'HelloWorld',
      components: {
        default: HelloWorld,
        left: Hi1,
        right: Hi2
      }
    },
```



### 6、vue-router 利用url传递参数 

1、定义传递数据接口

```js
 {
      path: '/params/:newsId(\\d+)/:newsContent',
      name: 'HelloWorld',
      component: Params
    },
```

2、设置传递参数

```js
<router-link to="/params/111/我几分减减肥">参数</router-link>
```

3、显示参数

```js
 <div>
    <p>newsId: {{$route.params.newsId}}</p>
    <p>newsContent: {{$route.params.newsContent}}</p>
 </div>
```



### 7、vue-router 的重定向-redirect

1、设置重定向

```json
,
 {
      path: '/goHome',
      redirect: '/'
 }
```

2、调用重定向

```vue
<router-link to="/goHome">返回</router-link>
```

3、重定向传递参数

```js
,
    {
      path: '/goParams/:newsId(\\d+)/:newsContent',
      redirect: '/params/:newsId(\\d+)/:newsContent'
    }
```

4、调用重定向传递参数

```vue
  <router-link to="/goParams/2222/阿斯顿发生">重定向传递参数</router-link>
```

### 8、alias别名的使用 

1、设置alias

```js
,
    {
      path: "/hi",
      component: Hi1,
      alias: '/jspfei'
    }
```

2、使用alias跳转

```vue
 <router-link to="/hi">Hi</router-link>|
      <router-link to="/jspfei">jspfei</router-link>|
```

** 填个小坑： ** 别名请不要用在path为’/’中，如下代码的别名是不起作用的。

** redirect和alias的区别 **

- redirect：仔细观察URL，redirect是直接改变了url的值，把url变成了真实的path路径。
- alias：URL路径没有别改变，这种情况更友好，让用户知道自己访问的路径，只是改变了`<router-view>`中的内容。



### 9、路由的过渡动画 

1、设置动画属性

```vue
  <transition name="fade" mode="out-in">
      <router-view />
    </transition>
```

2、配置css

```css
.fade-enter {
  opacity: 0;
}
.fade-leave {
  opacity: 1;
}
.fade-enter-active {
  transition: opacity 0.5s;
}
.fade-leave-active {
  opacity: 0;
  transition: opactiy 0.5s;
}
```



### 10、mode的设置和404页面的处理 

1、new Route设置 mode

```js
new Router({
  mode:"history", // hash
    
})
```

2、设置 404界面

设置路由

```js
,
    {
      path: "*",
      component: Error
    }
```

创建 Error.vue 404 页面

```vue
<template>
  <div>此也页面不存在 {{msg}}</div>
</template>
<script>
export default {
  name: "hi",
  data() {
    return {
      msg: "Error,404"
    };
  }
};
</script>

<style scoped>
</style>
```

### 11、路由中的钩子 

1、路由配置文件中的钩子函数 

```js
{
      path:'/params/:newsId(\\d+)/:newsTitle',
      component:Params,
      beforeEnter:(to,from,next)=>{
        console.log('我进入了params模板');
        console.log(to);
        console.log(from);
        next();
},
```

三个参数：

1. `to`:路由将要跳转的路径信息，信息是包含在对像里边的。
2. `from`:路径跳转前的路径信息，也是一个对象的形式。
3. `next`:路由的控制参数，常用的有next(true)和next(false)。

2、写在模板中的钩子函数

配置文件中的钩子函数，只有一个钩子-beforeEnter，如果我们写在模板中就可以有两个钩子函数可以使用：

- beforeRouteEnter：在路由进入前的钩子函数。
- beforeRouteLeave：在路由离开前的钩子函数。

```js
export default {
  name: 'params',
  data () {
    return {
      msg: 'params page'
    }
  },
  beforeRouteEnter:(to,from,next)=>{
    console.log("准备进入路由模板");
    next();
  },
  beforeRouteLeave: (to, from, next) => {
    console.log("准备离开路由模板");
    next();
  }
}  
```

### 12、编程式导航 

```vue
 <button @click="goBack">返回</button>
      <button @click="goTo">前进</button>
      <button @click="goHome">首页</button>
```



1、代码设置后退

```vue
   goBack() {
      this.$router.go(-1);
    },
```

2、代码设置向前

```js
 goTo() {
      this.$router.go(1);
    },
```

3、代码设置指定页面

```js
 goHome() {
      this.$router.push("/");
 }
```

