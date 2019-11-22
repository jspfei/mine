import { IAccount } from "../Account";
import { LogInfo } from "../../Util/LogUtil"

const  TAG:string = "ccAccount"
export class ccAccount implements IAccount{
   
    id:string = ""

    login(data?:any, success?:(data:any) => void,failed?:(data:any)  => void, target?: Object ) {
        LogInfo(TAG,"login")
    }
}