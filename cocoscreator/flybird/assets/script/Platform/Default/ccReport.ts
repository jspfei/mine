import { IReport } from "../Report"
import { LogInfo } from "../../Util/LogUtil"

const TAG:string = "ccServer"
export class ccReport implements IReport {

    reportShare(content: string | { [key: string]: any }, success: boolean){
        LogInfo(TAG,"reportShare")
    }
    /**
    * 外部流程API
    */
    initialize(){

    }
}