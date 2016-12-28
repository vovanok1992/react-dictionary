/**
 * Created by Vovan on 18.12.2016.
 */
import {combineReducers} from "redux"

import WordsReducer from "./wordsReducer"

const selectedWordReducer = (state, action) => {
    if(action.type == "WORD_CLICKED"){
        return action.payload;
    }
    return null;
};

const wordInputReducer = (state, action) => {
    if(action.type == "INPUT_WORD_CHANGED"){
        return action.payload;
    }
    return "";
};


export default combineReducers({
    words: WordsReducer,
    selectedWord: selectedWordReducer,
    inputWord: wordInputReducer
});

