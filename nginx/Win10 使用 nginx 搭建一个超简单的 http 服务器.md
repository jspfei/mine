# Win10 使用 nginx 搭建一个超简单的 http 服务器

1.引言
据我所知，网页都是使用 url 的形式（http://IP地址:端口号/路径/1.jpg）来访问服务器的文件，所以现在我用 nginx 搭建一个超简单的 http 服务器。

2.材料
1.Windows10

2.nginx

3.一个文件夹，里面放着任何文件，这里我的路径为：D:\CTL\FTP\StudentManagementSystem

3.具体流程
下载好 nginx 后打开 安装目录/conf/nginx.conf 文件，只要修改它的内容就能实现一个 http 服务器。

listen 是端口号；

server_name 是域名，这个我没改过，但是应该是跟你本地电脑主机的 dns 服务器对应的；

autoindex on 代表开启文件索引，很多小伙伴配置完后可以根据指定文件的 url（例如：http://127.0.0.1/dir/1.jpg）能访问到文件，但是访问整个文件夹（例如：http://127.0.0.1/dir/）就会报 403 ，就是没设置这个的问题；

root 代表根文件夹，就是输入 IP 地址后（例如：http://127.0.0.1/）所显示内容的根目录；

配置好后重启 nginx 服务器应该就可以了，注意每次修改 nginx.conf 文件后都要重启 nginx 才能够奏效，可以在浏览器输入 url 来验证配置正确性。


4.拓展
我们可以自己配置根目录名称，比如原来的 url 是 “http://127.0.0.1” 修改后是 “http://127.0.0.1/miaobo/”，虽然链接不一样，但是他们都代表同一个根目录。

实现它只需要新建一个 location ，将它的 “root” 修改为 “alias”，因为同一个 server 里面只能有一个 root 存在，之后再把 “location /” 修改为 “location /miaobo”。

```js
  server {
        listen       80;
        server_name  localhost;

        #charset koi8-r;

        #access_log  logs/host.access.log  main;

        location / {
            root   html;
            index  index.html index.htm;
        }

        location /miaobo {
        	autoindex on;
        	alias D://workspace;
        }
```



配置好后重启 nginx 就可以使用 “http://127.0.0.1” 和 “http://127.0.0.1/haha/” 访问服务器了。


 