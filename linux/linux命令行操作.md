## linux 命令行操作

### 准备 

1、win10 安装 linux 

2、window + R 进入运行

3、输入 powershell 进入 powershell 控制台

4、输入 bash 进入 linux 系统下

### 一、练习一

#### 需求：

1、创建 文件夹 go

2、创建子文件夹 image,并存放 img1.png

3、创建 index.html 文件

4、index.html 中显示 img1.png

5、将go 打包成压缩包 移动当 mine /linux/example 文件夹中


#### 使用到的命令：

```linux
//创建文件夹
mkdir go 
mkdir image

//创建文件
touch index.html

//打包名
tar -zcvf go.tar go 

//移动
mv go.tar /mnt/d/github/linux

```



