/**
 * Created by Vovan on 18.11.2016.
 */
import {EventEmitter} from "events";
import dispatcher from "../dispatcher";

class OnlineTranslationStore extends EventEmitter  {

    constructor(){
        super();
        this.word = '';
        this.translation = '';
    }

    getWord(){
        return this.word;
    }

    getTranslation(){
        return this.translation;
    }

    handleActions(action){
        switch (action.type) {
            case "RECEIVE_TRANSLATION" : {
                this.word = action.word;
                this.translation = action.translation;
                this.emit("change");
                break;
            }
        }
    }
}

const onlineTranslationStore = new OnlineTranslationStore();
dispatcher.register(onlineTranslationStore.handleActions.bind(onlineTranslationStore));
export default onlineTranslationStore;