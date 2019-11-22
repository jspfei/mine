//底层相关行为
export interface IFoundation {
    //存储-本地
    setStorage: (key: string, value: string) => void

    /**
     * 网络协议接口
     */
    httpRequest(action: string, kv : {[ key :string] : any } ,url?: string, method?: string, success?: (res: any) 
    => void, failed?: (res: any) => void)
}