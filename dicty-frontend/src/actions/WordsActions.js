/**
 * Created by Vovan on 12.11.2016.
 */

import dispatcher from '../dispatcher';

import translator from '../utils/Translator'
import dictionary from '../utils/Dictionary'

export function createWord(en, ru) {
    dispatcher.dispatch({
        type: "CREATE_WORD",
        en: en,
        ru: ru
    })
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

export function clearDefinition() {
    dispatcher.dispatch({type: "CLEAN_DEFINITION"});
}

export function translate(word, lang) {
    translator.translate(word, lang).then((res)=> {
        dispatcher.dispatch({type: "RECEIVE_TRANSLATION", word: word, translation: res.data.text.join("; ")});
    });
}

export function loadWords() {
    dispatcher.dispatch({type: "LOADING", enabled: true});
    setTimeout(() => {
        dispatcher.dispatch({
            type: "REFRESH_WORDS", words: [
                {
                    id: 1,
                    en: "keen on",
                    ru: "увлечен"
                },
                {
                    id: 2,
                    en: "acquaintance",
                    ru: "знакомство"
                },
                {
                    id: 3,
                    en: "poultry",
                    ru: "домашняя птица"
                },
                {
                    id: 4,
                    en: "domestic",
                    ru: "внутренний"
                },
                {
                    id: 5,
                    en: "give a hand",
                    ru: "помочь"
                },
                {
                    id: 6,
                    en: "men",
                    ru: "люди"
                },
                {
                    id: 7,
                    en: "leisure",
                    ru: "свободное время"
                },
                {
                    id: 8,
                    en: "Tend to",
                    ru: "как правило"
                },
                {
                    id: 9,
                    en: "Lend",
                    ru: "давать взаймы"
                },
                {
                    id: 10,
                    en: "Sightseeing",
                    ru: "осмотр достопримечательностей"
                }
            ]
        });

        dispatcher.dispatch({type: "LOADING", enabled: false});
    }, 2000);
}
