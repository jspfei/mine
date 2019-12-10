//实例化vue对象
new Vue({
  el: '#vue-app',
  data() {
    return {
      name: 'kkks',
      qq: '22223333',
      website: 'https://www.baidu.com/',
      websiteTag: "<a href='https://www.taobao.com'>tabbao</a>",
      inputtip: "你好",
      age: 30,
      x: 0,
      y: 0
    }
  },
  methods: {
    // greet: function () {
    //   return "Good night " + this.name;
    // }
    greet(time) {
      // return `good night ${this.name}`
      return `good ${time} ${this.name}`
    },
    haveLuanch() {
      return `吃过午饭了吗？`
    },
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
    handlerClick() {
      alert("hello")
    },
    logName() {
      console.log("input name ...")
    },
    logAge() {
      console.log("input age ...")
    },
    getNames() {
      console.log(this.$refs);
      this.name = this.$refs.name.value;
    },
    getAges() {

    }
  },
  watch: {
    name(val, oldVal) {
      console.log(val, oldVal)
    }
  },
})