/**
 * Created by Vovan on 18.12.2016.
 */
import {combineReducers} from "redux"

import WordsReducer from "./wordsReducer"

const selectedWordReducer = (state = null, action) => {
    switch(action.type) {
        case 'WORD_CLICKED':
            return action.payload;
        default:
            return state;
    }
};

const translateReducer = (state, action) => {
    switch(action.type){
        case "WORD_TRANSLATION_FULFILLED" :
            return action.payload.data.text.join("; ");
        default: return null;
    }
};


export default combineReducers({
    words: WordsReducer,
    selectedWord: selectedWordReducer,
    translatedWord: translateReducer
});

