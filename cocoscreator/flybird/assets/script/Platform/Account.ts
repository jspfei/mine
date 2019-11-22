 //用户相关接口
 export interface IAccount { 
    
    id:string

    login:(data?:any, success?:(data:any) => void,failed?:(data:any)  => void, target?: Object) => void
 }