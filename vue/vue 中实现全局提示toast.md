## 实现全局单行提示toast

### 1、文件结构

在src中创建一下文件结构

```js
toast
	index.js
	toast.vue
```

### 2、index.js

```js
import vue from 'vue'

// 这里就是我们刚刚创建的那个静态组件
import toastComponent from './toast.vue'

// 返回一个 扩展实例构造器
const ToastConstructor = vue.extend(toastComponent)

function showToast (text, duration = 4000) {
  const toastDom = new ToastConstructor({
    el: document.createElement('div'),
    data () {
      return {
        text: text,
        showWrap: true, // 是否显示组件
        showContent: true // 作用:在隐藏组件之前,显示隐藏动画
      }
    }
  })
  document.body.appendChild(toastDom.$el)

  // 提前 250ms 执行淡出动画(因为我们再css里面设置的隐藏动画持续是250ms)
  setTimeout(() => { toastDom.showContent = false }, duration - 1250)
  // 过了 duration 时间后隐藏整个组件
  setTimeout(() => { toastDom.showWrap = false }, duration)
}

// 注册为全局组件的函数
function registryToast () {
  // 将组件注册到 vue 的 原型链里去,
  // 这样就可以在所有 vue 的实例里面使用 this.$toast()
  vue.prototype.$toast = showToast
}

export default registryToast

```

### 3、toast.vue

```js
<!--
    公共提示信息界面
-->
<template>
  <div class="toast_wrap" v-if="showWrap" :class="showContent ?'fadein':'fadeout'">{{text}}</div>
</template>

<style scoped>
  .toast_wrap{
    position: fixed;
    left: 50%;
    top:50%;
    background: rgba(222,241,255,1);
    padding: 30px;
    border-radius: 20px;
    font-size: 30px;
    transform: translate(-50%,-50%);
    color:#666666;
  }
  .fadein {
    animation: animate_in 0.25s;
  }
  .fadeout {
    animation: animate_out 0.25s;
    opacity: 0;
  }
  @keyframes animate_in {
    0% {
      opacity: 0;
    }
    100%{
      opacity: 1;
    }
  }
  @keyframes animate_out {
    0% {
      opacity: 1;
    }
    100%{
      opacity: 0;
    }
  }
</style>

```

### 4、main.js 定义全局toast

```js

import toastRegistry from './toast/index'
// 这里也可以直接执行 toastRegistry()
Vue.use(toastRegistry)
```

### 5、全局调用toast

```js
this.$toast("提示")
```

