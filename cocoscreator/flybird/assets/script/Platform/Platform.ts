import { IAccount } from "./Account"
import { IAffiliate } from "./Affiliate"
import { IFoundation } from "./Foundation"
import { IReport } from "./Report"
import { IServer } from "./Server"

export let account : IAccount = null;
export let affiliate : IAffiliate = null;
export let foundation : IFoundation = null;
export let report : IReport = null;
export let server : IServer = null;

export function initializePlatform(_acc, _aff, _found, _rep, _svr){
    account = _acc;
    affiliate = _aff;
    foundation = _found;
    report = _rep;
    server = _svr;
}