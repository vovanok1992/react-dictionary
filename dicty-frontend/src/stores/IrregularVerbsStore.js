import {EventEmitter} from "events";
import dispatcher from "../dispatcher";

class IrregularVerbsStore extends EventEmitter  {

    constructor() {
        super();
        this.words = [];
    }

    getVerbs(){
        return this.words;
    }

    handleActions(action){
        switch (action.type){
            case "REFRESH_IRR_VERBS" : {
                this.words = action.words;
                this.emit("change");
                break;
            }
        }
    }
}

const wordStore = new IrregularVerbsStore();
dispatcher.register(wordStore.handleActions.bind(wordStore));
export default wordStore;