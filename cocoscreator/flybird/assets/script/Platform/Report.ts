//统计相关接口
export interface IReport {
    
    reportShare(content: string | { [key: string]: any }, success: boolean)
    /**
    * 外部流程API
    */
    initialize()
}