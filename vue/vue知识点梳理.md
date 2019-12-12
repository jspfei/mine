## 知识点梳理

### 基础知识

#### v-bind   

属性绑定，用 ：作为缩写。绑定的值是 Vue 对象的属性。 

v-bind是处理HTML中的标签属性的，例如

就是一个标签，也是一个标签，我们绑定上的src进行动态赋值。



:src  : 图片路径

:href  : 跳转地址

:class  : css 样式

### v-html  

绑定 html ，例如：vue 的属性是html  “<a href='https://www.taobao.com'>tabbao</a>”。

尽力少用，会引起 xss 攻击，提交表单的时候不要使用

```html
<p>
      <!-- <a v-bind:href="website">baidu</a> -->
    <a :href="website">baidu</a>
    </p>
    <p v-html="websiteTag"> </p>
    <p><input type="text" v-bind:value="inputtip"></p>
```

#### v-text

可以解决网速慢的时候，当message有值的时候才会显示

#### v-on 

事件绑定，用  @ 作为缩写。属性值是 methods 的属性

click 点击事件 

dblclick 双击事件

mousemove 鼠标移动事件

.once  事件只执行一次（事件修饰符）

```html
   <!-- <button @click="age++">add a year</button>
    <button v-on:click="age--">subtract a year</button> -->
    <button @click.once="add(1)">add a year</button>
    <button v-on:click="subtract(1)">subtract a year</button>
    <button @dblclick="add(10)">add 10 year</button>
    <button v-on:dblclick="subtract(10)">subtract 10 year</button>
    <p>{{age}}</p>

    <!-- mousemove event事件 -->
    <div id="canvas" v-on:mousemove="updateXY">
      {{ x }} , {{ y }}
    </div>

```

```js
    add(inc) {
      this.age += inc;
    },
    subtract(dec) {
      this.age -= dec;
    },
    updateXY(event) {
      this.x = event.offsetX;
      this.y = event.offsetY;
    },
```

#### ref 

注册可以 通过 this.$refs.注册名字  获取对应 document 元素对象

```html
	<p>
      <label>姓名</label>
      <input ref="name" type="text" @keyup="getNames" />
      <span>{{ name }}</span>
      <label>年龄</label>
      <input type="text" ref="age" @keyup="getAges" />
      <span>{{ age }}</span>
    </p>
```

```js
	getNames() {
      console.log(this.$refs);
      this.name = this.$refs.name.value;
    },
    getAges() {

    }
```



#### watch  

用来监听属性，方法先后变化的，但是会影响性能。（不建议使用）可以用来做调试大于。如果真的要使用(建议少用)

#### v-if |v-else | v-show



#### v-model

为绑定数据源。就是把数据绑定在特定的表单元素上，可以很容易的实现双向数据绑定。

绑定控件 input 、 textarea、checkbox

v-model.lazy  : 失去焦点的时候才会生效。

v-model.number : 显示只能输入数字才会生效。

v-model.trim : 将前后空格去掉。

#### v-pre

原样输出。不进行数据解析

{{message}} 输出还是{{message}} ，不会解析输出message的值

#### v-cloak

渲染完成后，才显示！

#### v-once

只在第一次才会渲染



### 全局API

### Vue.directive

一、自定义指令中传递的三个参数

- el: 指令所绑定的元素，可以用来直接操作DOM。
- binding: 一个对象，包含指令的很多信息。
- vnode: Vue编译生成的虚拟节点。

```js
 Vue.directive("jf", (el, binding) => {
      // console.log(el);
      // console.log(binding)
      // console.log(binding.name);
      // console.log(binding.value);
      el.style = "color:" + binding.value;

      //五个钩子函数
    })
```



二、自定义指令的生命周期

自定义指令有五个生命周期（也叫钩子函数），分别是 bind,inserted,update,componentUpdated,unbind

1. bind:只调用一次，指令第一次绑定到元素时调用，用这个钩子函数可以定义一个绑定时执行一次的初始化动作。
2. inserted:被绑定元素插入父节点时调用（父节点存在即可调用，不必存在于document中）。
3. update:被绑定于元素所在的模板更新时调用，而无论绑定值是否变化。通过比较更新前后的绑定值，可以忽略不必要的模板更新。
4. componentUpdated:被绑定元素所在模板完成一次更新周期时调用。
5. unbind:只调用一次，指令与元素解绑时调用。

挂载钩子函数

```js
 Vue.directive("jf", {
      bind: function () {//被绑定
        console.log('1 - bind');
         el.style = "color:" + binding.value;
      },
      inserted: function () {//绑定到节点
        console.log('2 - inserted');
      },
      update: function () {//组件更新
        console.log('3 - update');
      },
      componentUpdated: function () {//组件更新完成
        console.log('4 - componentUpdated');
      },
      unbind: function () {//解绑
        console.log('1 - bind');
      }
    })
```

三、外部调用解绑

```js
//解绑
    function unbind() {
      app.$destroy();
    }
```

#### Vue.extend

Vue.extend 返回的是一个“扩展实例构造器”,也就是预设了部分选项的Vue实例构造器。经常服务于Vue.component用来生成组件，可以简单理解为当在模板中遇到该组件名称作为标签的自定义元素时，会自动调用“扩展实例构造器”来生产组件实例，并挂载到自定义元素上。

#### Vue.set

Vue.set 的作用就是在构造器外部操作构造器内部的数据、属性或者方法。

#### Component 

组件注册的是一个标签，而指令注册的是已有标签里的一个属性。



#### $mount

$mount方法是用来挂载我们的扩展的

