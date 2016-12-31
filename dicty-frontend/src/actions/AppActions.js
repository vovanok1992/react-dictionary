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
        if (token) {
            dispatch({type: "GOOGLE_ACCESS_TOKEN", payload: token});
            auth(token)
                .then((resolve) => {
                    dispatch({type: "GOOGLE_PROFILE", payload: resolve});
                    initData(dispatch);
                }, (reject) => {
                    alert("Error while authenticating");
                    initData(dispatch);
                });
        } else {
            initData(dispatch);
        }
    };
}

function initData(dispatch) {
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
    return new Promise((resolve, reject) => {
        axios.get("https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=" + token)
            .then((data) => {
                axios.get("https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=" + token)
                    .then((data) => {
                        resolve(data.data);
                    })
                    .catch((error) => {
                        reject(error);
                    })
            })
            .catch((error) => {
                reject(error);
            })
    });
}