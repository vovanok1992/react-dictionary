import React from "react";
import ReactDOM from "react-dom";
import "es6-promise/auto";
import "./styles/main.scss";
import "../index.html";

import store from "./store";
import {Provider} from "react-redux";
import App from "./components/App";
import WordsContent from "./components/WordsContent";

import IrregularWordsContainer from "./containers/IrregularWordsContainer";
import {init} from "./actions/AppActions";

import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

document.body.removeChild(document.getElementById("loadingIndicator"));

const history = syncHistoryWithStore(hashHistory, store);

store.dispatch(init());

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={WordsContent}/>
                <Route path="irregular" component={IrregularWordsContainer}/>
            </Route>
        </Router>
    </Provider>
    , document.getElementById("app")
);


