## 一、安装与配置

### 1.安装 vscode

### 2.下载插件 

​	1、插件live server --保存以后浏览器自带更新

​	2、插件 Vetur --vue语法高亮

​    3、插件  Vue.js with TypeScript Snippets for VSCode

​    4、插件 View In Browser 



### 3.配置Vscode settings.json

vs 左下角 设置按钮--->settings -->右上角文件按钮打开 settings.json

添加配置

```json
 "emmet.includeLanguages": {
        "javascript": "javascriptreact"
    },
    "emmet.syntaxProfiles": {
        "javascript": "jsx",
        "javascript": "html"
    },
    "window.zoomLevel": 1.5,
"editor.fontSize": 26,
 "editor.tabSize":2,
 "editor.wordWrap": "on",
 "editor.lineNumbers": "on",
 "editor.formatOnType": true,//保存以后自带格式化
 "editor.formatOnSave": true,
 "view-in-browser.customBrowser": "chrome"
```

## 二、vscode编程技巧

### 1、自动生成 标准html 代码

​            一、先输入一个 !

​            二、点击 tab 键

​            三、自动生成标准的html代码（见图）



### 2、自定义代码块

File -->Preferences -->use snippets -->New global snippets file 

文件名定义 javascript.json

```json

{
	"Print to console": {
		"scope": "javascript,typescript",
		"prefix": "log",
		"body": [
			"console.log('$1');",
			"$2"
		],
		"description": "Log output to console"
	},
	"for of ": {
		"scope": "javascript,typescript",
		"prefix": "fof",
		"body": [
			"for(let item of $1){",
			"\t$2",
			"}"
		],
		"description": "快速循环数组"
	}
}

```

### 3、emmet写法

div#vue-app 回车

自动生成

<div id="vue-app"></div>



## 三、编写vue cdn

创建 index.html

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  <title>Vue cdn</title>

</head>

<body>
  <div id="vue-app">
    <h1>Hello, {{name}}</h1>
    <p>你的QQ是：{{qq}}</p>
  </div

  <script src="app.js"></script>
</body>

</html>
```

创建 app.js

```js
new Vue({
  el: '#vue-app',
  data() {
    return {
      name: 'kkks',
      qq: '22223333'
    }
  }
})
```

## 四、运行

在 index.html 鼠标右键 选择 open with live server