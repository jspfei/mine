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

```html
<p>
      <!-- <a v-bind:href="website">baidu</a> -->
    <a :href="website">baidu</a>
    </p>
    <p v-html="websiteTag"> </p>
    <p><input type="text" v-bind:value="inputtip"></p>
```



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



