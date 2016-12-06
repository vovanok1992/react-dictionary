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
}