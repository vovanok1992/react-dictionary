/**
 * Created by Vovan on 16.11.2016.
 */
import {EventEmitter} from "events";
import dispatcher from "../dispatcher";

class DefinitionStore extends EventEmitter {

    constructor() {
        super();
        this.info = [];
        this.word = "";
    }

    getDefinitions() {
        return this.info;
    }

    getWord() {
        return this.word;
    }

    handleActions(action) {
        switch (action.type) {
            case "RECEIVE_DEFINITION" : {
                this.info = action.info;
                this.word = action.word;
                this.emit("change");
                break;
            }

            case "CLEAN_DEFINITION" : {
                this.word = "";
                this.emit("change");
                break;
            }
        }
    }
}

const definitionStore = new DefinitionStore();
dispatcher.register(definitionStore.handleActions.bind(definitionStore));
export default definitionStore;