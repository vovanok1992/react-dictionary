/**
 * Created by Vovan on 12.11.2016.
 */

import WordUtils from "../utils/WordStringUtils";
import Translator from "../utils/Translator";
import LocalStorageWordsService from "../utils/LocalStorageWordsService";
import dictionary from "../utils/Dictionary";

export function wordClicked(word) {
    return {
        type: "WORD_CLICKED",
        payload: word
    }
}

export function inputWordChanged(word) {
    return {
        type: "INPUT_WORD_CHANGED",
        payload: word
    }
}

export function newWordClicked() {
    return {type: "NEW_WORD_CLICKED"}
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
    }
}

export function loadTranslation(word) {
    return {
        type: "WORD_TRANSLATION",
        payload: Translator.translate(word, WordUtils.isRussian(word) ? "ru-en" : "en-ru")
    }
}

export function loadDefinition(word) {
    if(word == null){
        return {type: "UNLOAD_DEFINITION"};
    }

    return (dispatch) => {
        dispatch({type: "LOADING", payload: true});
        dictionary.getDefinition(word)
            .then((data) => {
                dispatch({type: "DEFINITION_LOADED", payload: data.data.results});
                dispatch({type: "LOADING", payload: false});
            })
    }
}