/**
 * Created by Vovan on 12.11.2016.
 */
import dispatcher from "../dispatcher";
import translator from "../utils/Translator";
import dictionary from "../utils/Dictionary";
import axios from "axios";
import localStorageWordsService from "../utils/LocalStorageWordsService";

export function createWord(en, ru) {
    localStorageWordsService.saveWord({
        id: Date.now(),
        en: en,
        ru: ru
    });

    dispatcher.dispatch({
        type: "CREATE_WORD",
        en: en,
        ru: ru
    });
}

export function loadDefinition(word) {
    dispatcher.dispatch({type: "LOADING", enabled: true});
    dictionary.getDefinition(word)
        .then((info)=> {
            console.log(info);
            dispatcher.dispatch({type: "RECEIVE_DEFINITION", word: word, info: info.data.results});
            dispatcher.dispatch({type: "LOADING", enabled: false});
        });
}

export function translate(word, lang) {
    translator.translate(word, lang).then((res)=> {
        dispatcher.dispatch({type: "RECEIVE_TRANSLATION", word: word, translation: res.data.text.join("; ")});
    });
}

export function loadWords() {
    console.log("LOADING WORDS")
    dispatcher.dispatch({type: "LOADING", enabled: true});
    const promise = axios.get("static/words.json");
    promise.then((res) => {
        dispatcher.dispatch({
            type: "REFRESH_WORDS", words: res.data.words.concat(localStorageWordsService.getWords())
        });
        dispatcher.dispatch({type: "LOADING", enabled: false});
    });
}
