/**
 * Created by Vovan on 31.12.2016.
 */
import { hashHistory } from "react-router";

export function processTempToken() {
    const access_token = getParam(hashHistory.getCurrentLocation().pathname, "access_token");
    if(access_token){
        hashHistory.push("");
    }
    return access_token;
}


function getParam(str, param) {
    const res = str.match(new RegExp(param + "=([^&]+)"));
    if(!res || res.length == 0){
        return null;
    }
    return res[1];
}
