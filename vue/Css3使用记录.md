### css3记录

#### 1、创建动画

```html
<div class="spinner">
    <div></div>
    <div></div>
  </div>
```

```
.spinner{
  width: 60px;
  height: 60px;
  position: relative;
  margin: 100px auto;
}
.spinner > div{
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #67cf22;
  opacity: 0.6;
  position: absolute;
  top:0px;
  left: 0px;
  animation: mya 2.0s infinite ease-out;
}
.spinner > div:nth-child(2){
  animation-delay: -1s;
}

@keyframes mya{
  0%,100% { transform: scale(0.0);}
  50% { transform: scale(1.0);}
}
```

#### 2、文字效果

1、设置 单行文字 ...

```css
  
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
```

2.超出范围不显示 

```css
 text-overflow: clip;
  overflow: hidden;
```

#### 3、字体大小

px 

em --相对父标签的大小 

rem --相对根标签的大小

```css
html{
  font-size: 62.5%;
}

body{
  font-size: 1.4rem;
}
h1{
  font-size: 2.4rem;
}
```

#### 4、查看前缀是否支持

网站： caniuse.com

-webkit-       chrome浏览器

-o-         苹果 safri

-ms-

#### 5、透明设置

rgba 透明 不改变文字的透明

opacity 会改变背景也会改变文字的透明度

```html
 <ul>
      <li>1</li>
      <li>0.8</li>
      <li>0.6</li>
      <li>0.4</li>
      <li>0.2</li>
    </ul>
```



```css
.content{
  margin:0 auto; //自动居中
  clear: both;
}
.content li{
  list-style: none; //删除 li原来的 样式 去掉前面的 .
  width:30px;
  height: 30px;
  float:left;
  padding: 10px;
  background-color: red;
  margin:3px;
}
.opactiy li:nth-child(1){  opacity: 1;}  //opactiy //下 查找li 的第一个对象
.opactiy li:nth-child(2){  opacity: 0.8;}
.opactiy li:nth-child(3){  opacity: 0.6;}
.opactiy li:nth-child(4){  opacity: 0.4;}
.opactiy li:nth-child(5){  opacity: 0.2;}
.rgba li:nth-child(1){background-color: rgba(255,0,0,1);}
.rgba li:nth-child(2){background-color: rgba(255,0,0,0.8);}
.rgba li:nth-child(3){background-color: rgba(255,0,0,0.6);}
.rgba li:nth-child(4){background-color: rgba(255,0,0,0.4);}
.rgba li:nth-child(5){background-color: rgba(255,0,0,0.2);}
```







#### 6、阴影

```
 box-shadow: 2px 2px 3px #aaa;
```

#### 7、改变形状scale rotate

```
.rotate_left{
    float: left;
    transform: rotate(7deg);
    -o-transform: rotate(7deg);
    -webkit-transform: rotate(7deg);
    -ms-transform: rotate(7deg);
  }
```



#### 8、浮动设置 

```
float:left
```



#### 9、线性渐变

```
background-image: linear-gradient(to left,green);
```



#### 10、径向渐变

```
 .cricle{
    background-image: radial-gradient(20px,  orange,green,red);
  }

  .ellipse{
    background-image: radial-gradient(50px 30px ,orange,green,red );
  }
```

