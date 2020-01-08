### 通过 node 创建 web 服务器

创建node 项目 并安装 express，通过epxress 快速创建web服务器，将vue 打包生成的dist 文件夹，托管为静态资源即可，关键代码

1. 创建文件夹 web_vueshop

2. 将vue打包的dist文件夹复制到web_vueshop
3. 创建 app.js ,代码如下

app.js

```js
const express = require('express')
//导入gizp
const compression = require('compression')
//创建web服务器
const app = express()
//绑定gizp
app.use(compression())
//托管静态资源
app.use(express.static('./dist'))
//启动web服务器
app.listen(8802,()=>{
	
	console.log('server running at http://127.0.0.1')
})
```

4. win+r 进入cmd 进入web_vueshop 文件目录

5. 创建项目 

   ```
   npm init -y
   ```

   

6. 安装 express

   ```
   npm i express -S
   ```

   

7. node 启动项目

   ```
   node .\app.js
   ```

8. 验证项目

   浏览器中运行 127.0.0.1:8802