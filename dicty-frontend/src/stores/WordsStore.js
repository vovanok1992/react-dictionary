/**
 * Created by Vovan on 11.11.2016.
 */

import { EventEmitter } from "events";
import dispatcher from '../dispatcher'

class WordsStore extends EventEmitter  {

    constructor(){
        super();
        this.words = [];
    }

    createWord(en, ru){
        this.words.push({
            id : Date.now(),
            en: en,
            ru: ru
        });

        this.emit("change");
    }

    getWords(){
        return this.words;
    }

    handleActions(action){
        switch (action.type){
            case "REFRESH_WORDS" : {
                this.words = action.words;
                this.emit("change");
                break;
            }

            case "CREATE_WORD" : {
                this.createWord(action.en, action.ru);
                break;
            }
        }

    }

}

const wordStore = new WordsStore();
dispatcher.register(wordStore.handleActions.bind(wordStore));
export default wordStore;