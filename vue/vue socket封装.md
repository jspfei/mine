### Vue 封装socket

#### 1、文件结构

在src 目录下创建一下文件结构

```js
socket
	modules
    	Analysis.js
		Assemble.js
		MsgHandle.js
	index.js		
```

### 2、实现index.js

```js
/**
 * socket 管理模块
 */

/* eslint-disable no-undef */
import store from '../store/index'
import MsgHandle from '../socket/modules/MsgHandle'// 消息处理类
import Assemble from '../socket/modules/Assemble'// 数据组装
import Analysis from '../socket/modules/Analysis'// 数据解析
/**
 * 客户端定义
 */
// eslint-disable-next-line no-unused-vars
const clientDefine = {
  clientDefine_connect_timeout: 1000,
  clientDefine_timeout: 30000,
  clientDefine_headmsg_timeout: 13000,
  clientDefine_max_reconnect_times: 1
}
/**
* 网络连接状态
*/
const NetWorkState = {
  NetWorkState_NONE: 'NetWorkState_NONE',
  NetWorkState_CONNECTING: 'NetWorkState_CONNECTING',
  NetWorkState_CONNECTED: 'NetWorkState_CONNECTED',
  NetWorkState_ERROR: 'NetWorkState_ERROR',
  NetWorkState_CLOSE: 'NetWorkState_CLOSE',
  NetWorkState_TIMEOUT: 'NetWorkState_TIMEOUT',
  NetWorkState_MAX: 'NetWorkState_MAX'
}
const socket = {
  _ws: null,
  _msgHandle: null,//消息处理模块
  _assemble: null,//发送消息组装模块
  _analysis: null,//收到消息分析模块
  hostArray: [],
  sm_cDstIp: "", // 连接服务器地址
  sm_eNetWorkState: NetWorkState.NetWorkState_NONE, // 当前网络状态
  sm_bIsSendHeard: true, // 发送心跳
  sm_bReciveHeadMsg: false, // 是否发送心跳中
  sm_nHeartbeatNum: -1, // 心跳句柄
  sm_bIsHoldClose: false, // 是否是手动关闭
  sm_nConnectGameServerNum_1: -1, // 连接逻辑服务句柄
  sm_bIsAutoConnect: false, // 是否自动连接
  sm_bIsSendCloseMsg: false, // 手动关闭时候是否发生结束消息
  sm_nConnectCount: false, // 当前连接的次数（用于判断重连的提示，比如连接三次都没连接上就提示玩家检查网络)
  data: {
    userAccount: {}// 用户信息
  },
  /**
   *  获取msghandler
   */
  getMsgHandle () {
    return this._msgHandle
  },
  /**
   * socket 对外入口
   * @param {} dstIP
   * @param {*} isSendHeard
   */
  init (dstIP, isSendHeard) {
    this._analysis = new Analysis(this)
    this._assemble = new Assemble(this)
    this._msgHandle = new MsgHandle(this) 
    // 初始化状态
    this.sm_eNetWorkState = NetWorkState.NetWorkState_NONE
    this.sm_bReciveHeadMsg = false
    this.sm_bIsSendCloseMsg = true
    this.sm_nHeartbeatNum = -1
    this.sm_nConnectNum = -1

    this.connect(dstIP, isSendHeard)
  },
  /**
     * 开始连接并赋值 ip
     * @param dstIP ip ws://127.0.0.1:3000/
     * @param isSendHeard 是否发生心跳包
     * @expample
     * this.co
     */
  connect (dstIP, isSendHeard) {
    this.sm_cDstIp = "ws地址"
    console.log('')
    this.sm_bIsSendHeard = isSendHeard

    return this.doConnect()
  },
  /**
     * 使用上次ip 继续连接
     */
  doConnect () {
    if (this.getNetWorkState() === NetWorkState.NetWorkState_CONNECTED || this.getNetWorkState() === NetWorkState.NetWorkState_CONNECTING) {
      console.error('already connect to server. state = ' + this.getNetWorkState())
      return false
    }

    if (!(this.sm_cDstIp && this.sm_cDstIp.length > 0)) {
      console.error('dstIP is null')
      return false
    }
    if (this._ws) {
      this._ws.close()
    }

    this._ws = null
    this.sm_nConnectCount++
    this.sm_eNetWorkState = NetWorkState.NetWorkState_CONNECTING

    this._ws = new WebSocket(this.sm_cDstIp)
    this._ws.binaryType = 'arraybuffer'// 设置发生接受二进制
    this._ws.onopen = this.onOpen.bind(this)
    this._ws.onclose = this.onClose.bind(this)
    this._ws.onerror = this.onError.bind(this)
    this._ws.onmessage = this.onMessage.bind(this)

    if (this.sm_nConnectGameServerNum_1 !== -1) {
      clearTimeout(this.sm_nConnectGameServerNum_1)
    }
    this.sm_nConnectGameServerNum_1 = setTimeout(() => {
      if (!this.isConnect()) {
        // console.log("doConnect")
        this.sm_pSocket && this.closeNetWork(false)
      }
    }, clientDefine.clientDefine_timeout)

    return true
  },
  // store 保存登录状态
  saveState () {
    store.dispatch('socketData/setState', this.sm_eNetWorkState)
  },
  // socket 打开
  onOpen () {
    if (this.sm_nConnectGameServerNum_1 !== -1) {
      clearTimeout(this.sm_nConnectGameServerNum_1)
    }
    console.log('onOpen')
    this.sm_nConnectCount = 0
    // 打开
    // 发送心跳，设置当前网络状态，
    this.sm_eNetWorkState = NetWorkState.NetWorkState_CONNECTED
    this.saveState()
    this.sm_bIsSendHeard && this.doSendHeadBet()
  },
  // socket收到消息处理
  onMessage (msg) {
    // 接受消息
    var data = msg.data

    var handle = new Uint32Array(data, 0, 3)
    console.log('<==', handle[1])
    this._msgHandle.msgHandle(handle[1], data)
  },
  //socket 关闭
  onClose (ev) {
    console.log('onClose ' + ev)
    if (this.sm_nConnectGameServerNum_1 !== -1) {
      clearTimeout(this.sm_nConnectGameServerNum_1)
    }
    this.sm_pSocket = null
    this.sm_eNetWorkState = NetWorkState.NetWorkState_CLOSE

    // 手动关闭才发送服务连接断开消息。如果自动重连 不发生。
    this.saveState()
    if (!this.sm_bIsHoldClose) {
      this.timeOutConnect()
    } else {
      if (this.sm_bIsSendCloseMsg) {
        this.saveState()
      }
    }
  },
  onError (ev) {
    console.log('onError ' + ev)
    if (this.sm_nConnectGameServerNum_1 !== -1) {
      clearTimeout(this.sm_nConnectGameServerNum_1)
    }
    this.sm_eNetWorkState = NetWorkState.NetWorkState_ERROR
    this.saveState()
  },
  /**
 * 设置是否自动连接
 * @param is 是否自动连接
 */
  setAutoConnect (is) {
    this.sm_bIsAutoConnect = is
  },
  /**
   * 获取当前网络状态
   */
  getNetWorkState () {
    return this.sm_eNetWorkState
  },
  /**
   *
   * 当前网络是否连接
   */
  isConnect () {
    return this.getNetWorkState() === NetWorkState.NetWorkState_CONNECTED
  },
  /**
     * 发生消息
     * @param bufferRes  需要发生的消息
     * @param command 消息ID
     */
  sendMsg (bufferRes, command) {
    if (this.isConnect()) {
      this._ws.send(bufferRes)

      return true
    }
    // console.log("send msg error. state = " + this.getNetWorkState())

    return false
  },

  /**
     *  手动关闭连接
     * @param flag
     */
  closeNetWork (isHoldClose) {
    this.sm_cDstIp = ''

    // console.log('手动关闭 state ： ', state)
    this.sm_bIsHoldClose = isHoldClose
    if (this._ws) {
      this._ws.onopen = () => { }
      this._ws.onclose = () => { }
      this._ws.onerror = () => { }
      this._ws.onmessage = () => { }
      this._ws.close()
    }

    this.onClose(null)
  },
  /**
     * 延迟重新连接
     */
  timeOutConnect () {
    console.log('timeOutConnect')
    if (!this.sm_bIsAutoConnect) {
      return
    }
    // 自动连接超过 3次 手动断开连接
    if (this.sm_nConnectCount > clientDefine.clientDefine_max_reconnect_times) {
      this.closeNetWork(true)
      return
    }
    // 先手动关闭上次连接
    this.sm_pSocket && this.closeNetWork(false)
    // 如果不是手动关闭，自动连接
    if (!this.sm_bIsHoldClose) {
      if (this.sm_nConnectNum !== -1) {
        clearTimeout(this.sm_nConnectNum)
      }
      this.sm_nConnectNum = setTimeout(() => {
        // console.log("--------timeOutConnect-----------")
        if (!this.connect(this.sm_cDstIp, false)) {
          // console.log('cancle doConnect.');
        }
      }, clientDefine.clientDefine_connect_timeout)
    }
  },
  /**
     * 重新设置服务器连接地址
     */
  resetDstIp (dstIP) {
    this.sm_cDstIp = dstIP
  },
  /**
   * 发送心跳包
   */
  doSendHeadBet () {
    if (!this.isConnect()) {
      this.timeOutConnect()
      return ''
    }
    this.sm_bReciveHeadMsg = true
    this.sendMsg(this._assemble.heartbeat())

    if (this.sm_nHeartbeatNum !== -1) {
      clearTimeout(this.sm_nHeartbeatNum)
    }
    this.sm_nHeartbeatNum = setTimeout(() => {
      if (this.sm_bReciveHeadMsg) {
        this.doSendHeadBet()
      } else {
        this.timeOutConnect()
      }
    }, clientDefine.clientDefine_headmsg_timeout)
  }
}

export default socket

```

### 3、MsgHandle.js

```js
import store from '../../store/index'

/**
 * 消息处理类
 */ 
class MsgHandle {
  _socket;
  _analysis;
  _assemble;
  _roomData;
  _userData;

  constructor (socket) {
    this._socket = socket
    this._analysis = socket._analysis
    this._assemble = socket._assemble
  }

  // 根据协议号自动处理该消息
  msgHandle (num, data) { // 协议号/数据包
    // var funName = this.agreementArry.find((itme) => { return itme.num == num }).agreement;
    const arrybuff = this._analysis.analysis(num, data)
    if (typeof this['mh' + num] === 'function') {
      this['mh' + num](arrybuff)
    }
  }

  // 打印日志
  logInfo (num, data) {
    console.log(`==>${num} ${data}`)
  }

  /**
   *
   *房间信息
   */
  setRoomData (roomData) {
    this._roomData = roomData
  }

  /***
   * ---------------消息处理模块---------------
   */
  // 心跳协议
  mh20008 () {

  }

  // 登录成功
  mh10007 (userInfo) {
    this.logInfo(10007, JSON.stringify(userInfo)) 
    //store保存数据，vue组件可以通过将setUserInfo 对应参数变化，收到登录数据
    store.dispatch('user/setUserInfo', userInfo)
  }
  
  /**
   * -------------------发送协议模块-----------------
   */
  // socket登录
  LoginSend (params) {
    console.log('===>> 10001  ' + JSON.stringify(params))
    this._socket.sendMsg(this._assemble.userLoginRoom(params))
  }
}

export default MsgHandle

```

### 4、Assemble.js

```js
/**
 * 消息组装类
 */ 
class Assemble {
  _socket;
  constructor (socket) {
    this._socket = socket
  }

  // 将字符串填充到buff(要填充的字符串,目标buff,偏移起始位置)
  arryFillStr (str, buf, offset) {
    var uint8array = new TextEncoder().encode(str)
    var strLen = uint8array.length
    var bufView = new Uint8Array(buf, offset, strLen)
    for (var i = 0; i < strLen; i++) {
      bufView[i] = uint8array[i]
    }
  }

  // 创建arrybuff(整个buff长度，协议号)
  newSendData (len, agreement) {
    var sendData = new ArrayBuffer(12 + len)
    var headArry = new Int32Array(sendData, 0, 3)
    headArry[0] = 12 + len
    headArry[1] = agreement
    headArry[2] = 0
    return sendData
  }

  //= ================================以下为协议对应组装方法，===========================================//
  // 心跳
  heartbeat () {
    return this.newSendData(0, 20008)
  }

  // 登录房间({用户名，用户密码，房间idx,主播idx})
  userLoginRoom (parame) {
     
  }
}

export default Assemble

```

### 5、Analysis.js

```js
/**
 * 数据解析类
 * */ 
class Analysis {
  _socket;

  constructor (socket) {
    this._socket = socket
  }

  // 根据协议号自动调用对应解析方法
  analysis (num, data) { // 协议号/数据包
    // var funName = this.agreementArry.find((itme) => { return itme.num == num }).agreement;
    if (typeof this['ay' + num] === 'function') {
      return this['ay' + num](data)
    }
    return null
  }

  // 去除空格
  arryTostrTrim (str) {
    var num = str.indexOf('\0')
    if (num > 0) { str = str.substring(0, num) } else if (num === 0) {
      // 递归去除 str前面有 \u0000
      str = str.substring(1)
      str = this.arryTostrTrim(str)
    }
    return str
  }

  // 获取int 型数据
  getIntTypeData (arrayBuffer, offset, size) {
    const intArray = new Uint32Array(arrayBuffer, offset, size)
    var data = intArray[0]
    return data
  }

  // 获取int多位数组
  getIntsTypeData (arrayBuffer, offset, size) {
    const intsArray = new Uint32Array(arrayBuffer, offset, size)

    return intsArray
  }

  // 获取char 型数据
  getCharTypeData (arrayBuffer, offset, size) {
    var charArray = new Uint8Array(arrayBuffer, offset, size)
    var data = this.arryTostrTrim(new TextDecoder().decode(charArray))
    return data
  }

  //= ================================以下为协议对应解析方法，以ay+协议号命名===========================================//
  // 解析登录成功消息
  ay10007 (arrayBuffer) {
      return {
          //解析数据返回
      }
  }
}

export default Analysis

```

### 6、初始化定义全局socket

在 main.js 中创建全局socket对象

```js
import websoket from './socket/index'
/**
 * 初始化socket 并绑定全局socket 对象
 */
const socket = websoket
socket.init('', true)
socket.setAutoConnect(true)
Vue.prototype.$socket = socket
```

### 7、Vue组件中发送登录请求

```js
 var params = {
       
      };
 this.$socket.getMsgHandle().LoginSend(params);
```

### 8、组件中通过vuex 的mapGetters监听到登录数据

```js
import { mapGetters } from "vuex";

export default {
  name: "Login",
  computed: {
    ...mapGetters(["userInfo"])
  },
  watch: {
    // 成功监听到登录信息
    userInfo(data) {
      console.log("login watch userInfo " + JSON.stringify(data)); 
    } 
  }   
}
```

### 9、APP.vue 中通过vuex的 mapGetters 监听网络状态

```js
import { mapGetters } from 'vuex'

export default {
  name: 'app',
  computed: {
    ...mapGetters([
      'socketState' 
    ])
  },
   watch: {
         //监听socket状态
    socketState (state) {
      console.log('app.vue  state', state)
      //网络重连监听
      if (state === 'NetWorkState_CONNECTED') {
      }
       
   }
    
}
```

