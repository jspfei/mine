import { IServer } from "../Server"
import { LogInfo } from "../../Util/LogUtil"

const TAG:string = "h5Server"
export class h5Server implements IServer {

    saveToServer(data: any){
        LogInfo(TAG,"saveToServer")
    }
}