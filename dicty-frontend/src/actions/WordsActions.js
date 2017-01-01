/**
 * Created by Vovan on 12.11.2016.
 */

import WordUtils from "../utils/WordStringUtils";
import Translator from "../utils/Translator";
import LocalStorageWordsService from "../utils/LocalStorageWordsService";
import dictionary from "../utils/Dictionary";
import axios from "axios";
import config from "../config/AppConfig";

export function inputWordChanged(word) {
    return {
        type: "INPUT_WORD_CHANGED",
        payload: word
    };
}

export function newWordClicked() {
    return {type: "NEW_WORD_CLICKED"};
}

export function saveWord(fist, second) {
    const word = WordUtils.constructWord(fist, second);
    if (!word) {
        return null;
    }

    LocalStorageWordsService.saveWord(word);

    return {
        type: "SAVE_NEW_WORD",
        payload: word
    };
}

export function saveOnServer(fistWord, secondWord, token) {

    const word = WordUtils.constructWord(fistWord, secondWord);
    if (!word) {
        return null;
    }

    return (dispatch) => {
        dispatch({type: "LOADING", payload: true});
        axios.get("https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=" + token)
            .then((data) => {
                axios.post(config.getBackendServer() + "saveword", {
                    "word": word,
                    "token": token
                }).then((data) => {
                    if(data.data.response == "OK"){
                        dispatch({type: "SAVE_NEW_WORD", payload: word});
                    } else {
                        alert("ERROR validating google token. " + data.data.code);
                    }
                    dispatch({type: "LOADING", payload: false});
                }).catch((e) => {
                    alert("Unknown error");
                    console.log("Error", e);
                    dispatch({type: "LOADING", payload: false});
                })
            })
            .catch((error) => {
                alert("Sorry, but your temp token is not valid any more. Please relogin");
                dispatch({type: "GOOGLE_ACCESS_TOKEN", payload: null});
                dispatch({type: "GOOGLE_PROFILE", payload: null});
                dispatch({type: "LOADING", payload: false});
            })

    }
}

export function loadTranslation(word) {
    return {
        type: "WORD_TRANSLATION",
        payload: Translator.translate(word, WordUtils.isRussian(word) ? "ru-en" : "en-ru")
    };
}

export function loadDefinition(word) {
    if (word == null) {
        return {type: "UNLOAD_DEFINITION"};
    }

    return (dispatch) => {
        dispatch({type: "LOADING", payload: true});
        dictionary.getDefinition(word)
            .then((data) => {
                dispatch({type: "DEFINITION_LOADED", payload: data.data.results});
                dispatch({type: "LOADING", payload: false});
            });
    };
}

export function loadIrrVerbs() {
    return (dispatch) => {
        dispatch({type: "LOADING", payload: true});
        axios.get("static/irregularVerbs.json")
            .then((data) => {
                dispatch({type: "IRREGULAR_VERBS_FULFILLED", payload: data.data});
                dispatch({type: "LOADING", payload: false});
            });
    };

}