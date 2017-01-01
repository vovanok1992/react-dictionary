/**
 * Created by Vovan on 31.12.2016.
 */
import { hashHistory } from "react-router";
import Cookies from "../utils/Cookies";

export function processTempToken() {
    const hash = hashHistory.getCurrentLocation().pathname;
    let access_token = getParam(hash, "access_token");
    if(access_token){
        Cookies.createCookie("token", access_token, getParam(hash, "expires_in"));
        hashHistory.push("");
    } else {
        access_token = Cookies.readCookie("token");
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
