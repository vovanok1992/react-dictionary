import React from "react";
import ReactDOM from "react-dom";
import "es6-promise/auto";
import "./styles/main.scss";
import "../index.html";

import {createStore, applyMiddleware} from "redux"
import allReducers from "./reducers"
import {Provider} from "react-redux"
import App from "./components/App"
import promiseMiddleware from 'redux-promise-middleware';
import ReduxThunk from 'redux-thunk'

import {init} from "./actions/AppActions";

document.body.removeChild(document.getElementById("loadingIndicator"));

const logger = (store) => (next) => (action) => {
    console.log("action fired", action);
    next(action);
};

const store = createStore(allReducers, applyMiddleware(logger, ReduxThunk, promiseMiddleware()));

store.dispatch(init());

store.subscribe(() => {
   console.log("Store changed: ", store.getState());
});

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>
    , document.getElementById("app")
);


