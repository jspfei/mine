### 使用Jest对应Vue组件进行单元测试

1. 安装 npm
2. 全局安装 @vue/cli
3. 开启vue ui
4. 创建个应用--预设（手动）--功能（开启 UnitTesting）--配置（Jest）

   然后在`components`目录下创建`Counter.vue`，代码如下：

```js
<template>
  <div>
     <div>{{computedCount}}</div>
    <button id="add" @click="inc">加</button>
    <button  id="dec" @click="dec">减</button>
    <button  id="reset" @click="reset">重置</button>
  </div>
</template>

<script>
export default {
  name: 'Counter',
  props: {
    factor: { type: Number, default: 1 }
  },
  data () {
    return {
      count: 0
    }
  },
  methods: {
    inc () {
      this.count++
    },
    dec () {
      this.count--
    },
    reset () {
      this.count = 0
    }
  },
  computed: {
    computedCount () {
      return this.count * this.factor
    }
  }
}
</script>

<style  scoped>
.add{
  width: 100px;
  height: 100px;
}
</style>

```

在`unit`目录下创建`Counter.spec.js`，代码如下：

```js
import { mount } from '@vue/test-utils'

import Counter from '@/components/Counter.vue'

describe('Counter.vue', () => {
  it('渲染Counter组件', () => {
    const wrapper = mount(Counter)
    expect(wrapper.element).toMatchSnapshot()
  })

  it('初始化之为0', () => {
    const wrapper = mount(Counter)
    expect(wrapper.vm.count).toEqual(0)
  })

  it('加1', () => {
    const wrapper = mount(Counter)
    wrapper.vm.inc()
    expect(wrapper.vm.count).toEqual(1)
  })

  it('减1', () => {
    const wrapper = mount(Counter)
    wrapper.vm.dec()
    expect(wrapper.vm.count).toEqual(-1)
  })

  it('重置', () => {
    const wrapper = mount(Counter)
    wrapper.vm.reset()
    expect(wrapper.vm.count).toEqual(0)
  })

  it('因素为10加1操作', () => {
    const wrapper = mount(Counter, { propsData: { factor: 10 } })
    wrapper.vm.inc()
    expect(wrapper.vm.computedCount).toEqual(10)
  })

  it('测试点击add', () => {
    const wrapper = mount(Counter)
    const createScheme = wrapper.findAll('#add')
    createScheme.trigger('click')
    expect(wrapper.vm.count).toEqual(1)
  })
})

```

执行：

1 、打开控制台，进入项目根目录，运行`npm test:unit`

2、在vue-cli图形开发工具--任务--test:unit--运行 