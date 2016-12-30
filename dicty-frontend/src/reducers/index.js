/**
 * Created by Vovan on 18.12.2016.
 */
import {combineReducers} from "redux";

import WordsReducer from "./wordsReducer";
import {routerReducer} from "react-router-redux";

const selectedWordReducer = (state = null, action) => {
    switch (action.type) {
        case "WORD_CLICKED":
            return action.payload;
        default:
            return state;
    }
};

const translateReducer = (state, action) => {
    switch (action.type) {
        case "WORD_TRANSLATION_FULFILLED" :
            return action.payload.data.text.join("; ");
        default:
            return null;
    }
};

const loadingReducer = (state = 0, action) => {
    switch (action.type) {
        case "LOADING" :
            if (action.payload) {
                return state + 1;
            } else {
                return state - 1;
            }
    }
    return state;
};

const wordDefinitionReducer = (state = null, action) => {
    if (action.type == "DEFINITION_LOADED") {
        return action.payload;
    } else if (action.type == "UNLOAD_DEFINITION") {
        return null;
    }

    return state;
};

const appInitStateReducer = (state = false, action) => {

    if (action.type == "APP_INIT_FINISH") {
        return true;
    }

    return state;
};

const irrVerbsReducer = (state = [], action) => {
    if (action.type == "IRREGULAR_VERBS_FULFILLED") {
        return action.payload;
    }
    return state;
};

export default combineReducers({
    words: WordsReducer,
    selectedWord: selectedWordReducer,
    translatedWord: translateReducer,
    loading: loadingReducer,
    wordDefinition: wordDefinitionReducer,
    routing: routerReducer,
    appInited: appInitStateReducer,
    irregularVerbs: irrVerbsReducer
});

