## 对平台接口实现方案

为了应对多平台授权和用户数据接口不统一，需要设计正对不同平台设计相应的接口

### 一、设计的主要思路

接口(Api) --> 实现(Implementation) --> 根据不同的平台实现对象(Object) --> 通用平台接口实现(统一的全局调用对象)

### 二、平台接口设计

每个平台全面的模块化设计

用户数据相关模块、广告模块、底层接口模块、数据统计模块、协议服务模块


#### 1.Account.ts 用户数据接口

```ts

//定义用户对象属性
export interface IUserPrivateInfo {
   head?: string,
   id?:int,
   ...
}
//定义用户信息模块接口
export interface IAccount{
    //定义基本属性
    token:string
    //定义基本接口
    login(data?:any, success(data:any) => void,failed(data:any)  => void, target?: Object) =>void
}

```

#### 2.Affiliate.ts 广告联盟相关的接口

```ts
// 广告联盟相关的接口
export interface IAffiliate {
    // 创建'横幅'广告位
    createBanner: (id: string, left: number, right: number, width: number, height: number, err?: (msg: string) => void, target?: Object) => string
    // 销毁'横幅'广告位
    removeBanner: (id: string) => void
    // 横幅广告位显隐控制
    setVisible: (id: string, visible: boolean) => void
    // 视频广告(创建就显示!)
    createVideo: (id: string, success?: (isEnd: boolean) => void, failed?: () => void, target?: Object) => void
}

```

#### 3.Foundation.ts 系统底层的一些行为

```ts
export interface IFoundation {
    /**
     * 数据存储相关
     */
    // 存储-本地
    setStorage: (key: string, value: string) => void
    // 读取-本地
    getStorage: (key: string) => string
    // 删除-本地
    removeStorage: (key: string) => string
     /**
     * 生命周期
     */
    // 关闭
    exit()
    // 前台
    onShow(callback: (res: any) => void, target?: Object)
    // 切换到后台
    onHide(callback: () => void, target?: Object)
     /**
     * HTTPs
     * 请求
     */
    httpRequest(action: string, kv: { [key: string]: any }, url?: string, method?: string, success?: (res: any) => void, failed?: () => void, target?: any)
   
    /**
     * 初始化
     */
    initialize()
    // 加载配置
    loadConfig(callback?: (failed: boolean) => void, target?: any)
    // 显示警告
    alert(title: string, content: string, cb: () => void, target?: any)
}

```

#### 4.Report.ts 数据统计相关

```ts
// 上报数据信息
export interface IReportData {
    [key: string]: any
}

// 数据收集和上报的处理
export interface IReport {
    /**
     * 数据收集分析相关
     */
    // 分享信息收集
    reportShare(content: string | { [key: string]: any }, success: boolean)
    // 获取分享字符串
    getShareReport(id: string, pos: EReportType, channel: string, p: any): string
    // 打开app收集
    reportLaunch(id: string)
    // 视频广告收集
    reportVideo()
    /**
     * 外部流程API
     */
    initialize()
}
```

#### 5.Server.ts  通用的'服务器'API相关

```ts
export interface IServer {
    /**
     * 个人信息相关
     */
     // 保存个人信息到服务器
    saveToServer(data: IServerUserBaseInfo)
    //等等
}

```

### 三、根据不同平台实现相应接口

现在一款游戏实现 发表到不同的平台如：测试、微信、QQ、Fackbook、Google、H5 等等不同的平台。所以根据不同的平台创建相应的文件夹。在对应文件夹中实现上面的接口。

例如实现接口如以下文件结构

```ts
Platform 
   Default //默认平台
        ccAccount.ts
        ccAffiliate.ts
        ccFoundation.ts
        ccReport.ts
        cc.Server.ts
    H5Wx   //微信平台
        h5Account.ts
        h5Affiliate.ts
        h5Foundation.ts
        h5Report.ts
        h5.Server.ts
    Account.ts
    Affiliate.ts
    Foundation.ts
    Report.ts
    Server.ts
    Platform.ts
    PlatformInitializer.ts
```

具体实现接口 例如 h5Account.ts

```ts
export class h5Account implements IAccount {


     login(data: any, success: (id: string, isnew?: boolean, launchdata?: any, player?: IUserPrivateInfo) => void, failed?: () => void, target?: Object) {

        //具体的业务逻辑
        if (success) {
            if (target) {
                success.call(target, "1", false, {})
            } else {
                success("1", false, {})
            }
        }
     }

     ...
   
}

```

### 四、Platform.ts  通用平台定义

在项目中定义通用平台，模块接口对象。这样处理方便代码的管理，也方便代码整洁性。

```ts
import { IAccount } from "./Account";
import { IAffiliate } from "./Affiliate";
import { IFoundation } from "./Foundation";
import { IReport } from "./IReport";
import { IServer } from "./Server";

// 通用的平台层对象定义
export let account: IAccount = null
export let aff: IAffiliate = null
export let foundation: IFoundation = null
export let report: IReport = null
export let server: IServer = null

//初始化平台
export function initializePlatform(_acc, _aff, _found, _rep, _svr) {
    account = _acc
    aff = _aff
    foundation = _found
    report = _rep
    server = _svr
}


```

### 五、PlatformInitializer.ts 平台初始化

根据不同平台 对应子类实例 依赖。我们将根据不同的平台定义 实现不同的对象

```ts
import { ccAccount } from "./Default/ccAccount";
import { IAccount, IKVData } from "./Account";
import { IAffiliate } from "./Affiliate";
import { ccAffiliate } from "./Default/ccAffiliate";
import { IFoundation } from "./Foundation";
import { ccFoundation } from "./Default/ccFoundation"; 
import { IReport } from "./IReport";
import { ccReport } from "./Default/ccReport"; 
import { defined } from "../Core/Define";
import { initializePlatform, account } from "./Platform";
import { h5Account } from "./H5wx/h5Account";
import { h5Affiliate } from "./H5wx/h5Affiliate";
import { h5Foundation } from "./H5wx/h5Foundation";
import { h5Report } from "./H5wx/h5Report";
import { IServer } from "./Server";
import { ccServer } from "./Default/ccServer"; 
import { h5Server } from "./H5wx/h5Server";  

let _account: IAccount = new ccAccount()
let _aff: IAffiliate = new ccAffiliate()
let _foundation: IFoundation = new ccFoundation()
let _report: IReport = new ccReport()
let _server: IServer = new ccServer()

window.CC_H5WXGAME = true;

if (window.CC_H5WXGAME) {
    _account = new h5Account()
    _aff = new h5Affiliate()
    _foundation = new h5Foundation()
    _report = new h5Report()
    _server = new h5Server()
}

// 初始化调用
_foundation.initialize()
_report.initialize()

initializePlatform(_account, _aff, _foundation, _report, _server)

```