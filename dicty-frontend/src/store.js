/**
 * Created by Vovan on 30.12.2016.
 */

import allReducers from "./reducers";
import {createStore, applyMiddleware} from "redux";
import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk'

const logger = (store) => (next) => (action) => {
    console.log("action fired", action);
    next(action);
};

const store = createStore(allReducers, applyMiddleware(logger, thunk, promiseMiddleware()));
store.subscribe(() => {
    console.log("Store changed: ", store.getState());
});

export default store;