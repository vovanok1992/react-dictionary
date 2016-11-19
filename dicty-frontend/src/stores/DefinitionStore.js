/**
 * Created by Vovan on 16.11.2016.
 */

import { EventEmitter } from "events";
import dispatcher from '../dispatcher'

class DefinitionStore extends EventEmitter  {

    constructor(){
        super();
        this.dialogVisible = false;
        this.info = [];
        this.word = '';
        this.translation = '';
    }

    isDialogVisible(){
        return this.dialogVisible;
    }

    getDefinitions(){
        return this.info;
    }

    getWord(){
        return this.word;
    }

    getTranslation(){
        return this.translation;
    }

    handleActions(action){
        switch (action.type){
            case "RECEIVE_DEFINITION" : {
                this.info = action.info;
                this.dialogVisible = true;
                this.word = action.word;
                this.emit("change");
                break;
            }

            case "RECEIVE_TRANSLATION" : {
                this.translation = action.translation;
                this.emit("change");
                break;
            }

            case "CLEAN_DEFINITION" : {
                this.dialogVisible = false;
                this.word = '';
                this.emit("change");
                break;
            }
        }

    }

}

const definitionStore = new DefinitionStore();
dispatcher.register(definitionStore.handleActions.bind(definitionStore));
export default definitionStore;