/**
 * Created by Vovan on 12.11.2016.
 */

import dispatcher from '../dispatcher';

import translator from '../utils/Translator'
import dictionary from '../utils/Dictionary'
import localStorageWordsService from  '../utils/LocalStorageWordsService'

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
    dispatcher.dispatch({type: "LOADING", enabled: true});
    setTimeout(() => {
        var wordsArray = [
            {
                id: 1,
                en: "Keen on",
                ru: "Увлечен"
            },
            {
                id: 2,
                en: "Acquaintance",
                ru: "Знакомство"
            },
            {
                id: 3,
                en: "Poultry",
                ru: "Домашняя птица"
            },
            {
                id: 4,
                en: "Domestic",
                ru: "Внутренний"
            },
            {
                id: 5,
                en: "Give a hand",
                ru: "Помочь"
            },
            {
                id: 6,
                en: "Men",
                ru: "Люди"
            },
            {
                id: 7,
                en: "Leisure",
                ru: "Свободное время"
            },
            {
                id: 8,
                en: "Tend to",
                ru: "Как правило"
            },
            {
                id: 9,
                en: "Lend",
                ru: "Давать взаймы"
            },
            {
                id: 10,
                en: "Sightseeing",
                ru: "Осмотр достопримечательностей"
            },
            {
                id: 11,
                en: "Kind-hearted",
                ru: "Добрый"
            },
            {
                id: 12,
                en: "Sulky",
                ru: "Угрюмый"
            },
            {
                id: 13,
                en: "Dependable",
                ru: "Надежный"
            },
            {
                id: 14,
                en: "Encouraging",
                ru: "Обнадеживающий"
            },
            {
                id: 15,
                en: "Mean",
                ru: "Скупой"
            },
            {
                id: 16,
                en: "Upbeat",
                ru: "оптимистичный"
            },
            {
                id: 17,
                en: "Generous",
                ru: "Щедрый"
            },
            {
                id: 18,
                en: "Selfish",
                ru: "Эгоистичный"
            },
            {
                id: 19,
                en: "Pleasant",
                ru: "Приятный"
            },
            {
                id: 20,
                en: "Beg",
                ru: "Просить"
            },
            {
                id: 21,
                en: "bummy",
                ru: "стрёмный"
            },
            {
                id: 22,
                en: "penitentiary",
                ru: "каторжная тюрьма"
            },
            {
                id: 23,
                en: "Beg",
                ru: "Просить"
            },
            {
                id: 24,
                en: "steady",
                ru: "устойчивый"
            },
            {
                id: 25,
                en: "desperation",
                ru: "отчаяние"
            },
            {
                id: 26,
                en: "chump",
                ru: "болван"
            },
            {
                id: 27,
                en: "tell off",
                ru: "отчитать"
            },
            {
                id: 28,
                en: "take after",
                ru: "походить на"
            },
            {
                id: 29,
                en: "look up to",
                ru: "уважать"
            },
            {
                id: 30,
                en: "carry on",
                ru: "продолжать"
            },
            {
                id: 31,
                en: "bring up",
                ru: "воспитывать"
            },
            {
                id: 32,
                en: "revise",
                ru: "пересматривать"
            },
            {
                id: 33,
                en: "envelope",
                ru: "конверт"
            },
            {
                id: 34,
                en: "bulldog clip",
                ru: "зажим для бумаги"
            },
            {
                id: 35,
                en: "ring binder",
                ru: "папка с кольцом"
            },
            {
                id: 36,
                en: "pencil sharpener",
                ru: "точилка"
            },
            {
                id: 37,
                en: "clipboard",
                ru: "дощечка с зажимом"
            },
            {
                id: 38,
                en: "post-it note",
                ru: "бумага для заметок"
            },
            {
                id: 39,
                en: "clam",
                ru: "моллюск"
            },
            {
                id: 40,
                en: "shrimp",
                ru: "креветка"
            },
            {
                id: 41,
                en: "mussel",
                ru: "мидия"
            },
            {
                id: 42,
                en: "pike",
                ru: "щука"
            },
            {
                id: 43,
                en: "catfish",
                ru: "сом"
            },
            {
                id: 44,
                en: "cod",
                ru: "треска"
            },
            {
                id: 45,
                en: "perch",
                ru: "окунь"
            },
            {
                id: 46,
                en: "crucian",
                ru: "карась"
            },
            {
                id: 47,
                en: "ray",
                ru: "скат"
            },
            {
                id: 48,
                en: "eel",
                ru: "угорь"
            },
            {
                id: 49,
                en: "spatula",
                ru: "лопаточка"
            },
            {
                id: 50,
                en: "whisk",
                ru: "сбивалка"
            },
            {
                id: 51,
                en: "chopsticks",
                ru: "палочки для еды"
            },
            {
                id: 52,
                en: "mug",
                ru: "кружка"
            },
            {
                id: 53,
                en: "fork",
                ru: "вилка"
            },
            {
                id: 54,
                en: "pot",
                ru: "горшок/кастрюля"
            },
            {
                id: 55,
                en: "pan",
                ru: "кастрюля"
            }
        ];

        dispatcher.dispatch({
            type: "REFRESH_WORDS", words: wordsArray.concat(localStorageWordsService.getWords())
        });

        dispatcher.dispatch({type: "LOADING", enabled: false});
    }, 2000);
}
