/**
 * Created by Vovan on 29.12.2016.
 */

import axios from "axios";
import appConfig from "../config/AppConfig";
import {processTempToken} from "../utils/LocationUtils";


export function init() {
    return (dispatch) => {
        dispatch({type: "LOADING", payload: true});
        const token = processTempToken();
        if (!token) {
            initData(dispatch);
            return;
        }
        dispatch({type: "GOOGLE_ACCESS_TOKEN", payload: token});
        auth(token)
            .then((data) => {
                dispatch({type: "GOOGLE_PROFILE", payload: data});
                initData(dispatch);
            }).catch(() => {
                alert("Error while authenticating");
                initData(dispatch);
            });
    };
}

function initData(dispatch) {
    loadConfigFromLocalStorage(dispatch);

    axios.get("static/config.json")
        .then((data) => {
            dispatch({type: "CONFIG_LOADED"});
            appConfig.init(data.data);
            return axios.get(appConfig.backendServer + "db");
        })
        .then((data) => {
            dispatch({type: "WORDS_REFRESH", payload: data.data});
            dispatch({type: "LOADING", payload: false});
            dispatch({type: "APP_INIT_FINISH"});
        });
}

function auth(token) {
    return axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${token}`)
        .then(() => axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${token}`)) // Это не выполниться если зафейлит первый ?
        .then(({data}) => data)
}

function loadConfigFromLocalStorage(dispatch) {
    const reverse = localStorage.options_reverse;
    if(reverse === "true"){
        dispatch({type: "CHANGE_SORT_DIRECTION"})
    }
}