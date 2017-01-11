/**
 * Created by Vovan on 18.12.2016.
 */

import WordStringUtils from "../utils/WordStringUtils";
import LocalStorageWordsService from "../utils/LocalStorageWordsService";

const baseState = {
    words: [],
    filtered: [],
    inputWord: "",
    forceNewWordInput: false,
    inverseSort: false
};

export default function (state = baseState, action) {
    switch (action.type) {

        case "CHANGE_SORT_DIRECTION":
            return {
                ...state,
                inverseSort: !state.inverseSort,
                filtered: state.filtered.slice().reverse()
            };

        case "WORDS_REFRESH" :
            return {
                ...state,
                filtered: WordStringUtils.filterArray(action.payload, state.inputWord, state.inverseSort),
                words: action.payload
            };

        case "INPUT_WORD_CHANGED" :
            return {
                ...state,
                inputWord: action.payload,
                filtered: WordStringUtils.filterArray(state.words, action.payload, state.inverseSort),
                forceNewWordInput: action.payload.length > 0 ? state.forceNewWordInput : false
            };

        case "NEW_WORD_CLICKED" :
            return {...state, forceNewWordInput: true};

        case "SAVE_NEW_WORD" : {
            const newWords = state.words.concat(action.payload);
            return {
                ...state,
                words: newWords,
                inputWord: "",
                filtered: state.inverseSort ? [...newWords].reverse() : newWords,
                forceNewWordInput: false
            };
        }

        case "WORD_REMOVED": {
            const newWords = state.words.filter((w) => {
                return w.id !== action.payload.id
            });
            return {
                ...state,
                words: newWords,
                filtered: WordStringUtils.filterArray(newWords, state.inputWord, state.inverseSort)
            };
        }

        default:
            return state;
    }
}