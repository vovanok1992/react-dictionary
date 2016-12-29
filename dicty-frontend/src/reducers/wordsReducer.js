/**
 * Created by Vovan on 18.12.2016.
 */

import WordStringUtils from "../utils/WordStringUtils";
import LocalStorageWordsService from "../utils/LocalStorageWordsService";

const baseState = {
    words: [],
    filtered: [],
    inputWord: "",
    forceNewWordInput: false
};

export default function (state = baseState, action) {
    switch (action.type) {

        case "WORDS_REFRESH" :
            return {
                ...state,
                filtered: WordStringUtils.filterArray(action.payload, state.inputWord),
                words: action.payload
            };

        case "INPUT_WORD_CHANGED" :
            return {
                words: state.words,
                inputWord: action.payload,
                filtered: WordStringUtils.filterArray(state.words, action.payload),
                forceNewWordInput: action.payload.length > 0 ? state.forceNewWordInput : false
            };

        case "NEW_WORD_CLICKED" :
            return {...state, forceNewWordInput: true};

        case "SAVE_NEW_WORD" :
            const newWords = state.words.concat(action.payload);
            return {
                words: newWords,
                inputWord: "",
                filtered: newWords,
                forceNewWordInput: false
            };

        default:
            return state;
    }
}