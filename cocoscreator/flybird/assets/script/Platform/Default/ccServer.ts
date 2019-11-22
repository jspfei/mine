import { IServer } from "../Server"
import { LogInfo } from "../../Util/LogUtil"

const TAG:string = "ccServer"
export class ccServer implements IServer {

    saveToServer(data: any){
        LogInfo(TAG,"saveToServer")
    }
}