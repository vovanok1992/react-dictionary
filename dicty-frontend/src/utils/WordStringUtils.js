/**
 * Created by Vovan on 26.11.2016.
 */

export default class WordStringUtils {

    static isRussian(word) {
        return /[А-Яа-я]/.test(word);
    }

    static testWord(word, inputtedWord) {
        if (typeof inputtedWord == "undefined") {
            inputtedWord = "";
        }
        return word.toLowerCase().indexOf(inputtedWord.trim().toLowerCase()) != -1;
    }

    static filterArray(words, text) {
        return words.filter((word) => {
            return this.testWord(word.en, text) || this.testWord(word.ru, text);
        });
    }

    static constructWord(fist, second) {
        let enWord, ruWord;
        const firstIsRussian = this.isRussian(fist);
        if (firstIsRussian && this.isRussian(second)) {
            alert("Both input fields contain russion symbols !");
            return null;
        }
        if (firstIsRussian) {
            enWord = second;
            ruWord = fist;
        } else {
            enWord = fist;
            ruWord = second;
        }

        return {
            en: enWord,
            ru: ruWord,
            id: Date.now()
        };
    }
}