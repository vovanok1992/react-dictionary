/**
 * Created by Vovan on 16.11.2016.
 */
import {EventEmitter} from "events";
import dispatcher from "../dispatcher";

class ApplicationStateStore extends EventEmitter  {

    constructor(){
        super();
        this.loading = false;
    }

    isLoading(){
        return this.loading;
    }

    handleActions(action){
        switch (action.type){
            case "LOADING" : {
                this.loading = action.enabled;
                this.emit("change");
                break;
            }
        }
    }
}

const applicationStateStore = new ApplicationStateStore();
dispatcher.register(applicationStateStore.handleActions.bind(applicationStateStore));
export default applicationStateStore;