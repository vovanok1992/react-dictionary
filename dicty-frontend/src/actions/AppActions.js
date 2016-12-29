/**
 * Created by Vovan on 29.12.2016.
 */

import axios from "axios"
import appConfig from "../config/AppConfig";

export function init() {
    return (dispatch) => {
        dispatch({type: "LOADING", payload: true});

        axios.get("static/config.json")
            .then((data) => {
                dispatch({type: "CONFIG_LOADED"});
                appConfig.init(data.data);
                return axios.get(appConfig.backendServer + "db");
            })
            .then((data) => {
                dispatch({type: "WORDS_REFRESH", payload: data.data});
                dispatch({type: "LOADING", payload: false});
            });

    }
}