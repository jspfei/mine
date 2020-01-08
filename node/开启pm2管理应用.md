### 使用 pm2 管理应用

1. 在服务上安装 pm2

   ```
   npm i pm2 -g
   ```

   

2. 启动项目

   ```
   pm2 start 脚本 --name 自定义名称
   ```

   例如：

   ```
   pm2 start .\app.js --name web_vueshop
   ```

   

3. 查看运行项目

   ```
   pm2 ls
   ```

   

4. 重启项目

   ```
   pm2 restart 自定义名称（管理项目id）
   ```

   

5. 停止项目

   ```
   pm2 stop 自定义名称（管理项目id）
   ```

   

6. 删除项目

   ```
   pm2 delete 自定义名称（管理项目id）
   ```

   