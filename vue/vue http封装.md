### Http封装

#### 1、安装插件

1、axios 插件

```js
npm install axios --save
```

2、crypto-js 插件

```
npm install crypto-js --save
```



### 2、加密文件

crypto.js

```js
/**
* 通过crypto-js实现 加解密工具
* AES、HASH(MD5、SHA256)、base64
*/
import CryptoJS from 'crypto-js'
const KP = {
  key: '1234567812345678', // 秘钥 16*n:
  iv: '1234567812345678' // 偏移量
}
const KEYS = {
  register: '', // 32位注册使用加密密钥
  live: '' // 32位登录成功以后加密密钥
}
const KEYTYPE = {
  REGISTER: 'register',
  LIVE: 'live'
}
function getAesString (data, key, iv) { // 加密
  key = CryptoJS.enc.Utf8.parse(key)
  // alert(key）;
  iv = CryptoJS.enc.Utf8.parse(iv)
  const encrypted = CryptoJS.AES.encrypt(data, key,
    {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    })
  return encrypted.toString() // 返回的是base64格式的密文
}
function getDAesString (encrypted, key, iv) { // 解密
  key = CryptoJS.enc.Utf8.parse(key)
  iv = CryptoJS.enc.Utf8.parse(iv)
  const decrypted = CryptoJS.AES.decrypt(encrypted, key,
    {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    })
  return decrypted.toString(CryptoJS.enc.Utf8) //
}
// 注册加密
function registerEncryptECB (word) {
  var key = CryptoJS.enc.Utf8.parse(KEYS.register)
  var srcs = CryptoJS.enc.Utf8.parse(word)
  var encrypted = CryptoJS.AES.encrypt(srcs, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 })

  return encrypted.toString()
}
// 注册解密
function registerDecryptECB (word) {
  var key = CryptoJS.enc.Utf8.parse(KEYS.register)
  var decrypt = CryptoJS.AES.decrypt(word, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 })
  return CryptoJS.enc.Utf8.stringify(decrypt).toString()
}

// 在线加密
function liveEncryptECB (word) {
  var key = CryptoJS.enc.Utf8.parse(KEYS.live)
  var srcs = CryptoJS.enc.Utf8.parse(word)
  var encrypted = CryptoJS.AES.encrypt(srcs, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 })

  return encrypted.toString()
}
// 在线解密
function liveDecryptECB (word) {
  var key = CryptoJS.enc.Utf8.parse(KEYS.live)
  var decrypt = CryptoJS.AES.decrypt(word, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 })
  return CryptoJS.enc.Utf8.stringify(decrypt).toString()
}
// AES 对称秘钥加密
const aes = {
  en: (data) => getAesString(data, KP.key, KP.iv),
  de: (data) => getDAesString(data, KP.key, KP.iv),
  registerEncryptECB: (data) => registerEncryptECB(data),
  registerDecryptECB: (data) => registerDecryptECB(data),
  liveEncryptECB: (data) => liveEncryptECB(data),
  liveDecryptECB: (data) => liveDecryptECB(data)
}
// BASE64
const base64 = {
  en: (data) => CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(data)),
  de: (data) => CryptoJS.enc.Base64.parse(data).toString(CryptoJS.enc.Utf8)
}
// SHA256
const sha256 = (data) => {
  return CryptoJS.SHA256(data).toString()
}
// MD5
const md5 = (data) => {
  return CryptoJS.MD5(data).toString()
}

/**
* 签名
* @param token 身份令牌
* @param timestamp 签名时间戳
* @param data 签名数据
*/
const sign = (token, timestamp, data) => {
  // 签名格式： timestamp + token + data(字典升序)
  const ret = []
  for (const it in data) {
    let val = data[it]
    if (typeof val === 'object' && //
        (!(val instanceof Array) || (val.length > 0 && (typeof val[0] === 'object')))) {
      val = JSON.stringify(val)
    }
    ret.push(it + val)
  }
  // 字典升序
  ret.sort()
  const signsrc = timestamp + token + ret.join('')
  return md5(signsrc)
}
export {
  aes,
  md5,
  sha256,
  base64,
  sign,
  KEYTYPE
}

```

#### 3、http封装

```js
/**
 *  http封装
 */
/** axios封装
 * 请求拦截、相应拦截、错误统一处理
 */
import axios from 'axios'

import { aes } from './crypto' 
var root = ''//服务器地址

// 环境的切换
if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = root
} else if (process.env.NODE_ENV === 'debug') {
  axios.defaults.baseURL = ''
} else if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = root
}

// 请求超时时间
axios.defaults.timeout = 10000

// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

// 请求拦截器
axios.interceptors.request.use(
  config => {
  // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
  // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断

    return config
  },
  error => {
    return Promise.error(error)
  })

// 响应拦截器
axios.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return Promise.resolve(response)
    }
    return Promise.reject(response)
  },
  // 服务器状态码不是200的情况
  error => {
    if (error.response.status) {
      switch (error.response.status) {
        // 401: 未登录
        // 未登录则跳转登录页面，并携带当前页面的路径
        // 在登录成功后返回当前页面，这一步需要在登录页操作。
        case 401:

          break
          // 403 token过期
          // 登录过期对用户进行提示
          // 清除本地token和清空vuex中token对象
          // 跳转登录页面
        case 403:

          break
          // 404请求不存在
        case 404:

          break
          // 其他错误，直接抛出错误提示
        default:
      }
      return Promise.reject(error.response)
    }
  }
)
/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get (url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 * @param {String} type [加密类型参数]
 */
export function post (url, params, type) {
  return new Promise((resolve, reject) => {
    if (type === 'register') {
      params = aes.registerEncryptECB(JSON.stringify(params))
    } else if (type === 'live') {
      params = aes.liveEncryptECB(JSON.stringify(params))
    }
    console.log('register ', params)
    // var ecode = aes.registerDecryptECB(params)
    // console.log('register ecode ', ecode)
    axios.post(url, params)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}
/**
 * post方法，对应post请求  ----文件上传
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 * @param {String} type [加密类型参数]
 */
export function post1(url, params, type) {//post不加密或者之前加密
  return new Promise((resolve, reject) => {
    //console.log('params===========', params);
    //let param = QS.stringify(params);
    let config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
    axios.post(url, params, config)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}

```

#### 4、调用get 或者post

1、定义账号接口文件account.js

```js
/**
 * 账号相关http封装接口
 */

import { post } from './http'
import { KEYTYPE } from './crypto'

export const hotList = params => get('接口', params)
// 获取注册码
export const checkPhone = params => post('接口', params, KEYTYPE.REGISTER)
 

```


