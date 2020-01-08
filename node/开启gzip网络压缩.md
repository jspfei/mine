### 开启 gizp配置

1. 安装compression 包

   ```
   npm install compression -D
   ```

   

2. 导入包

   ```
   const compression = require('compression')
   ```

   

3. 启动中间件

   ```
    
   app.use(compression())
   ```

   