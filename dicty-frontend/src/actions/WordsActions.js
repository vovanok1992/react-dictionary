/**
 * Created by Vovan on 12.11.2016.
 */

import WordUtils from "../utils/WordStringUtils";
import Translator from "../utils/Translator";
import LocalStorageWordsService from "../utils/LocalStorageWordsService";

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