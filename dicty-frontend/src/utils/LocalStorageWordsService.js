/**
 * Created by Vovan on 23.11.2016.
 */

class LocalStorageWordsService {
    saveWord(word) {
        if (typeof localStorage["savedWords"] != 'undefined') {
            const words = this.getWords();
            words.push(word);
            localStorage["savedWords"] = JSON.stringify(words);
        } else {
            localStorage["savedWords"] = JSON.stringify([word]);
        }
    }

    getWords() {
        if (typeof localStorage["savedWords"] != 'undefined') {
            return JSON.parse(localStorage["savedWords"]);
        } else return [];
    }
}

export default new LocalStorageWordsService();