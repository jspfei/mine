import { IFoundation } from "../Foundation"
import { LogInfo } from "../../Util/LogUtil"

const TAG:string = "ccFoundation"
export class ccFoundation implements IFoundation {
   //存储-本地
   setStorage (key: string, value: string){
      LogInfo(TAG,`setStorage  key : ${key}   value: ${value}`)
   }

   /**
    * 网络协议接口
    */
   httpRequest(action: string, kv : {[ key :string] : any } ,url?: string, method?: string, success?: (res: any) 
   => void, failed?: (res: any) => void){
      LogInfo(TAG,`setStorage  action : ${action}   kv: ${kv}`)
   }
}