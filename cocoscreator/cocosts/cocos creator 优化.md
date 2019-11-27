cocos creator 内存优化、性能优化和包体优化

## 一、内存优化

#### 1、优化双份纹理（必做！)

在你的项目中添加如下代码，就可以减少大量内存：

![img](https://ask.qcloudimg.com/http-save/2156395/13h093hkkn.jpeg?imageView2/2/w/1620)

这里面的原理是，当Creator使用DOM的Image对象去加载一个图片资源的时候，微信底层的引擎会解码图片数据，同时往[GPU](https://cloud.tencent.com/product/gpu?from=10680)上传一份纹理，然后引擎的Sprite在渲染的时候会使用这个DOM Image再生成一份GPU纹理并上传，导致GPU里面存在双份纹理。使用 Image.scr = '' 可以释放掉GPU里面多出来的一份纹理，同时也会释放CPU端解码的纹理内存。所以，基本上对 Image对象调用了 src = '' 这个操作，这个Image对象占用的内存就释放干净了。

之前尝试使用DOM Image pool，当一个图片资源解码成功并且上传GPU以后，把这个Image对象的src置空后放入池子，然后重复利用。不过对比了一下内存占用，感觉 src = '' 之后内存立即就释放了，优化作用并不是很明显。

**2、优化图集**

最好对所有的碎图资源进行图集合并（Creator自带一个自动图集合并工具），并且最大限度填满图集，不要留有太多空白。图集的大小尽可能限制在1024*1024以下，因为有些图片有不少透明像素，合并图集的时候可以trim掉这些透明像素。另外合图还可以优化Drawcall，减少图片读取和解码操作，对性能也有一定优化。

另外，对于显示效果要求不高的界面，可以适当降低图片的尺寸。

**3、优化Label**

Creator1.9.3之前的版本，每创建一个系统字体就会生成一个离屏的Canvas对象，然后保存这个Canvas对象的context，每次draw一个系统字体的时候会调用这个context的fillText方法生成一张纹理并渲染。1.9.3以后我提交了一个优化，所有的系统字体渲染共享一个离屏Canvas，这样大概可以优化30M左右的内存（不同的项目效果不一样）。

老引擎参考PR地址：

optimization label memory #2693 fix label rendering issue #2880 （这个PR主要是Bug修复）

**4、优化资源释放**

对于二级弹框和场景资源释放，可以使用cc.loader.release接口配合场景的“自动释放”属性来实现 。

对于一个二级面板，我们可以约定这个二级面板引用的资源范围。我们把游戏中共用的资源放到Common图集中，把每个二级面板的资源放到自己的图集中。当释放资源的时候，我们可以通过 cc.loader.getDependsRecursively(‘prefab url’) API拿到面板Prefab所引用的所有资源，然后对这个返回的资源数组做资源释放。

比如，在我们的项目里面，释放资源的时候，我排除了Common，Main，Game/FX目录下面的图集资源：

![img](https://ask.qcloudimg.com/http-save/2156395/7400om24rm.jpeg?imageView2/2/w/1620)

 场景的资源释放只需要勾选一个属性就可以了：

![img](https://ask.qcloudimg.com/http-save/2156395/ehvihx5mnn.png?imageView2/2/w/1620)





 

## 二、性能优化

目前小游戏的性能瓶颈大多在JS层面，可以使用Chrome先去profiles性能热点，然后针对性地去做优化。

这里给出几点优化建议：

1、游戏中频繁更新的文字，推荐使用BMFont，系统字体会比较消耗性能。

2、优化Drawcall，尽可能减少Drawcall数量。

3、减少Mask组件的使用，该组件会导致游戏中的Drawcall数量变多。

4、禁用引擎的culling，禁用方法cc.macro.ENABLE_CULLING = false。

5、如果使用物理引擎，可以把物理引擎的step间隔调大。

6、优化节点树，减少节点数量。

7、场景中不要挂载过多的Prefab，可适当将一些Prefab变成动态加载的。 

### 1、cocos creator 性能优化之减少drawcall数量

1、官方方法：

最快的办法就是合并碎图成图集，然后同一图集的按照顺序摆放节点，中间不能插入其他图集的节点。

2、需要注意的几点：

1.默认字体的每一个label都会产生一个drawcall.所以不能使用默认字体，需要使用bmfont工具制作位图字体。

2.修改图片默认颜色会增加drawcall

3.图片类型为九宫格会增加drawcall

4.修改图片默认透明度会增加drawcall

5.默认的纯色图片会增加drawcall

优化方案:最好让美术把图片和字体直接做成想要的颜色和透明度，不要在cocos修改。

button不要使用变色功能



## 三、包体优化

因为微信小游戏对于包体有4M的限制，最近才刚开始升到8M，但是必须要分包，而且每一个分包的大小还是不能超过4M。

下面给出一些优化建议：

1、首包中不要包含过多的资源，如果一定要包含，请务必压缩。对于背景图片可以使用JPG，PNG图片可以使用png8进行压缩。

2、代码必须使用uglify进行压缩，尤其是第三方库，游戏代码如果使用release构建引擎有做uglify。如果想进一步压缩代码体积，需要考虑使用Google Closure Compiler进行高级压缩。

3、不需要动态加载的图片资源不要放到resources目录，放到此目录的资源在构建导出的时候，会生成资源映射关系到Settings.js中，会导致该Settings.js文件变大。另外为了防止缓存问题，需要使用md5，此时Settings.js文件会进一步膨胀。过气的活动Prefab也可以移出resources目录，所以定期资源清理也是必要的。

4、Settings.js文件优化，可以自己写脚本把md5Map里面的rawAssets的md5映射存到原本的rawAssets中，然后在boot.js里面还原md5Map即可。优化之后的Settings.js长这个样子：

![img](https://ask.qcloudimg.com/http-save/2156395/aykr5rvynp.png?imageView2/2/w/1620)

boot.js里面还原**md5AssetMap**的的代码：

![img](https://ask.qcloudimg.com/http-save/2156395/snbmduiret.jpeg?imageView2/2/w/1620)

5、一定要使用release模式构建，这种方式构建出来的json资源会压缩，Settings.js也会优化。

6、对于引擎不使用的模块进行裁剪，这个可以减少引擎大小。





 