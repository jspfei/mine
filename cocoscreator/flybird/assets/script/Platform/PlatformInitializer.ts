import { IAccount } from "./Account";
import { ccAccount } from "./Default/ccAccount";
import { IAffiliate } from "./Affiliate";
import { ccAffiliate } from "./Default/ccAffiliate";
import { IFoundation } from "./Foundation";
import { ccFoundation } from "./Default/ccFoundation";
import { IReport } from "./Report";
import { ccReport } from "./Default/ccReport";
import { IServer } from "./Server";
import { ccServer } from "./Default/ccServer";
import { h5Account } from "./H5Wx/h5Account"
import { h5Report } from "./H5Wx/h5Report"
import { h5Affiliate } from "./H5Wx/h5Affiliate"
import { h5Foundation } from "./H5Wx/h5Foundation"
import { h5Server } from "./H5Wx/h5Server"
import { initializePlatform } from "./Platform"
 
let _account: IAccount = new ccAccount();
let _aff: IAffiliate = new ccAffiliate();
let _foundation: IFoundation = new ccFoundation();
let _report: IReport = new ccReport();
let _server: IServer = new ccServer(); 

window.CC_H5WXGAME = false;

if(window.CC_H5WXGAME){
    _account = new h5Account()
    _aff = new h5Affiliate()
    _foundation = new h5Foundation()
    _report = new h5Report()
    _server = new h5Server()
}

initializePlatform(_account,_aff,_foundation,_report,_server)
