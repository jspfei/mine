import { IAccount } from "../Account";
import { LogInfo } from "../../Util/LogUtil"

const  TAG:string = "h5Account"
export class h5Account implements IAccount{
   
    id:string = ""

    login(data?:any, success?:(data:any) => void,failed?:(data:any)  => void, target?: Object ) {
        LogInfo(TAG,"login")
    }
}