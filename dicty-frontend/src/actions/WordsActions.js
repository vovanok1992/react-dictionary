/**
 * Created by Vovan on 12.11.2016.
 */
import dispatcher from "../dispatcher";
import translator from "../utils/Translator";
import dictionary from "../utils/Dictionary";
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
    dispatcher.dispatch({type: "LOADING", enabled: true});
    setTimeout(() => {
        const wordsArray = [
            {
                id: 1,
                en: "Keen on",
                ru: "Увлечен",
                date: "09.11.2016"
            },
            {
                id: 2,
                en: "Acquaintance",
                ru: "Знакомство",
                date: "09.11.2016"
            },
            {
                id: 3,
                en: "Poultry",
                ru: "Домашняя птица",
                date: "09.11.2016"
            },
            {
                id: 4,
                en: "Domestic",
                ru: "Внутренний",
                date: "09.11.2016"
            },
            {
                id: 5,
                en: "Give a hand",
                ru: "Помочь",
                date: "09.11.2016"
            },
            {
                id: 6,
                en: "Men",
                ru: "Люди",
                date: "09.11.2016"
            },
            {
                id: 7,
                en: "Leisure",
                ru: "Свободное время",
                date: "10.11.2016"
            },
            {
                id: 8,
                en: "Tend to",
                ru: "Как правило",
                date: "10.11.2016"
            },
            {
                id: 9,
                en: "Lend",
                ru: "Давать взаймы",
                date: "10.11.2016"
            },
            {
                id: 10,
                en: "Sightseeing",
                ru: "Осмотр достопримечательностей",
                date: "10.11.2016"
            },
            {
                id: 11,
                en: "Kind-hearted",
                ru: "Добрый",
                date: "15.11.2016"
            },
            {
                id: 12,
                en: "Sulky",
                ru: "Угрюмый",
                date: "15.11.2016"
            },
            {
                id: 13,
                en: "Dependable",
                ru: "Надежный",
                date: "15.11.2016"
            },
            {
                id: 14,
                en: "Encouraging",
                ru: "Обнадеживающий",
                date: "15.11.2016"
            },
            {
                id: 15,
                en: "Mean",
                ru: "Скупой",
                date: "15.11.2016"
            },
            {
                id: 16,
                en: "Upbeat",
                ru: "оптимистичный",
                date: "15.11.2016"
            },
            {
                id: 17,
                en: "Generous",
                ru: "Щедрый",
                date: "15.11.2016"
            },
            {
                id: 18,
                en: "Selfish",
                ru: "Эгоистичный",
                date: "15.11.2016"
            },
            {
                id: 19,
                en: "Pleasant",
                ru: "Приятный",
                date: "15.11.2016"
            },
            {
                id: 20,
                en: "Beg",
                ru: "Просить",
                date: "16.11.2016"
            },
            {
                id: 21,
                en: "bummy",
                ru: "стрёмный",
                date: "16.11.2016"
            },
            {
                id: 22,
                en: "penitentiary",
                ru: "каторжная тюрьма",
                date: "16.11.2016"
            },
            {
                id: 24,
                en: "steady",
                ru: "устойчивый",
                date: "16.11.2016"
            },
            {
                id: 25,
                en: "desperation",
                ru: "отчаяние",
                date: "16.11.2016"
            },
            {
                id: 26,
                en: "chump",
                ru: "болван",
                date: "16.11.2016"
            },
            {
                id: 27,
                en: "tell off",
                ru: "отчитать",
                date: "24.11.2016"
            },
            {
                id: 28,
                en: "take after",
                ru: "походить на",
                date: "24.11.2016"
            },
            {
                id: 29,
                en: "look up to",
                ru: "уважать",
                date: "24.11.2016"
            },
            {
                id: 30,
                en: "carry on",
                ru: "продолжать",
                date: "24.11.2016"
            },
            {
                id: 31,
                en: "bring up",
                ru: "воспитывать",
                date: "24.11.2016"
            },
            {
                id: 32,
                en: "revise",
                ru: "пересматривать",
                date: "24.11.2016"
            },
            {
                id: 33,
                en: "envelope",
                ru: "конверт",
                date: "29.11.2016"
            },
            {
                id: 34,
                en: "bulldog clip",
                ru: "зажим для бумаги",
                date: "29.11.2016"
            },
            {
                id: 35,
                en: "ring binder",
                ru: "папка с кольцом",
                date: "29.11.2016"
            },
            {
                id: 36,
                en: "pencil sharpener",
                ru: "точилка",
                date: "29.11.2016"
            },
            {
                id: 37,
                en: "clipboard",
                ru: "дощечка с зажимом",
                date: "29.11.2016"
            },
            {
                id: 38,
                en: "post-it note",
                ru: "бумага для заметок",
                date: "29.11.2016"
            },
            {
                id: 39,
                en: "clam",
                ru: "моллюск",
                date: "29.11.2016"
            },
            {
                id: 40,
                en: "shrimp",
                ru: "креветка",
                date: "29.11.2016"
            },
            {
                id: 41,
                en: "mussel",
                ru: "мидия",
                date: "29.11.2016"
            },
            {
                id: 42,
                en: "pike",
                ru: "щука",
                date: "29.11.2016"
            },
            {
                id: 43,
                en: "catfish",
                ru: "сом",
                date: "29.11.2016"
            },
            {
                id: 44,
                en: "cod",
                ru: "треска",
                date: "29.11.2016"
            },
            {
                id: 45,
                en: "perch",
                ru: "окунь",
                date: "29.11.2016"
            },
            {
                id: 46,
                en: "crucian",
                ru: "карась",
                date: "29.11.2016"
            },
            {
                id: 47,
                en: "ray",
                ru: "скат",
                date: "29.11.2016"
            },
            {
                id: 48,
                en: "eel",
                ru: "угорь",
                date: "29.11.2016"
            },
            {
                id: 49,
                en: "spatula",
                ru: "лопаточка",
                date: "29.11.2016"
            },
            {
                id: 50,
                en: "whisk",
                ru: "сбивалка",
                date: "29.11.2016"
            },
            {
                id: 51,
                en: "chopsticks",
                ru: "палочки для еды",
                date: "29.11.2016"
            },
            {
                id: 52,
                en: "mug",
                ru: "кружка",
                date: "29.11.2016"
            },
            {
                id: 53,
                en: "fork",
                ru: "вилка",
                date: "29.11.2016"
            },
            {
                id: 54,
                en: "pot",
                ru: "горшок/кастрюля",
                date: "29.11.2016"
            },
            {
                id: 55,
                en: "pan",
                ru: "кастрюля",
                date: "29.11.2016"
            },
            {
                id: 56,
                en: "Mend",
                ru: "чинить",
                date: "01.12.2016"
            },
            {
                id: 57,
                en: "overlook",
                ru: "игнорировать",
                date: "01.12.2016"
            },
            {
                id: 58,
                en: "Refugee",
                ru: "беженец",
                date: "01.12.2016"
            },
            {
                id: 59,
                en: "hold up",
                ru: "задержать",
                date: "01.12.2016"
            },
            {
                id: 60,
                en: "desperate",
                ru: "отчаянный",
                date: "01.12.2016"
            },
            {
                id: 61,
                en: "nail",
                ru: "гвоздь",
                date: "01.12.2016"
            }
        ];

        dispatcher.dispatch({
            type: "REFRESH_WORDS", words: wordsArray.concat(localStorageWordsService.getWords())
        });

        dispatcher.dispatch({type: "LOADING", enabled: false});
    }, 2000);
}
