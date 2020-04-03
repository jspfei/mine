##  Android 环境搭建

### 1、下载 Java SDK （JDK）

检查java环境

```
java -version
```

### 2、下载安装 Android Studio 

```
http://www.android-studio.org/
```

下载最新版本

 Android Studio 的安装目录为：

```
D:\project\Android Studio
```



### 3、下载发布 Android 平台所需的 SDK 

#### 一、下载sdk

File-->Setting-->Appearance&Behavior-->SystemSettings-->Android SDK

比如：sdk下载目录为 

```
d:\project\tool\Android\Android-SDK
```



1、下载 SDK Platforms 

​	下载 api 23 | 28 |29

2、下载SDK tools



取消 选择 HideObsolete Packages 

选中 ShowPackage Details (展示分支)

Android SDK Build-Tools 选择 28.0.3|28.0.2 |26.0.2

NDK  选择 17 | 18 |19 其中一个版本（可以选择19.0.5232133）

Android Emulator 选择 

Android SDK Platform-Tools

Android SDK Tools

Android Support Library,rev20

#### 二、配置Project Structure

File-->Project Structure

1、配置Project  

Android Gradle Plugin Version : 3.2.0 (必须是这个版本)

Gradle Version : 5.6.4 （根据升级情况）

2、配置SDK Location

 Android SDK location

```
D:\project\tool\Android\Android-SDK
```

 Android NDK location

```
D:\project\tool\Android\Android-SDK\ndk\19.0.5232133
```

JDK location

```
D:\project\Android Studio\jre
```

3、配置Modules

module： game

Compile Sdk Version :26

Build Tools Version : $PROP_BUILD_TOOLS_VERSION :28.0.3

Source Compatibility : 1.8 (jdk)

Target Compatibility  ：1.8 (jdk)



module： instantapp

Compile Sdk Version :26

Build Tools Version : $PROP_BUILD_TOOLS_VERSION :28.0.3

Source Compatibility : 1.8 (jdk)

Target Compatibility  ：1.8 (jdk)

### 三、配置proj.android-studio

```
  classpath 'com.android.tools.build:gradle:3.2.0'
```

### 四、配置 gradle.properties

在 gradle.properties中添加

```
android.useAndroidX=true
android.enableJetifier=true
```

解决 androidX 不可使用

```
RELEASE_STORE_FILE=D\:/project/Coc
```

D盘符后面会少一个 \  要加上



## CocosCreator 配置原生开发环境

文件-->设置--> 原生开发环境

NDK 路径：

```
D:\project\tool\Android\Android-SDK\ndk\19.0.5232133
```

Android SDK 路径

```
D:\project\tool\Android\Android-SDK
```

