首先，我们看一下用Cocos Creator构建发布后的mobile-web页面请求图：

![WX20170728-210429@2x.png](https://segmentfault.com/img/remote/1460000010403268)

在页面首次出现之前，需要发起4个请求，并且这4个请求都是小文件，其实是没有必要的，特别是在服务器端还有gzip压缩的情况，更理想的情况是一个请求就能完成所有的工作。

另外这4个文件都没有经过代码压缩，例如html文件：

![cocos-creator-source.png](https://segmentfault.com/img/remote/1460000010403269)

这里也有不少优化空间。

综上所述，我们有了压缩合并的方案，这里可以通过gulp实现

有些同学会问：webpack更酷更流行为什么不用webpack？答：因为webpack本质上是模块化打包方案，我们这里只是简单对代码做一些构建处理，用gulp更轻量更合适。

gulp安装请访问：<https://gulpjs.com/>

nodejs安装请访问：<http://nodejs.org/>

另外需要安装gulp相关插件：[gulp-file-inline](https://github.com/Lanfei/gulp-file-inline) [gulp-htmlmin](https://github.com/jonschlinkert/gulp-htmlmin)

思路如下：

1. 通过gulp-file-inline把style-mobile.css，settings.js，main.js inline到html文件，减少请求
2. 通过gulp-htmlmin把html文件压缩，减少空格，压缩代码量，减少文件体积

gulpfile文件代码：

```
var gulp = require('gulp');
var fileInline = require('gulp-file-inline');
var htmlmin = require('gulp-htmlmin');

gulp.task('htmlmin', function(cb) {
  gulp.src('./build/web-mobile/*.html')
  .pipe(fileInline())
  .pipe(htmlmin({
      collapseWhitespace:true,
      removeComments: true
  }))
  .pipe(gulp.dest('./build/web-mobile/')
  .on('end', cb));
});
```

在命令行里面执行`gulp`，大功告成！压缩后的请求如下图：

![cocos-creator-min.png](https://segmentfault.com/img/remote/1460000010403270)

大家可以看到，原来的4个请求只剩下build一个请求了，而且经过服务器的gizp压缩，还能缩小到2-3kb的大小，如果配合cdn策略，基本上能让你的H5游戏首页秒开。

完整代码可以访问：[https://github.com/babyzone20...](https://github.com/babyzone2004/cocosMd5)，这个示例包含了Cocos Creator图片压缩优化，减少首次文件请求，html压缩，动态更新定制loading图等功能哦。