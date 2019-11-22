import { IReport } from "../Report"
import { LogInfo } from "../../Util/LogUtil"

const TAG:string = "h5Server"
export class h5Report implements IReport {

    reportShare(content: string | { [key: string]: any }, success: boolean){
        LogInfo(TAG,"reportShare")
    }
    /**
    * 外部流程API
    */
    initialize(){

    }
}