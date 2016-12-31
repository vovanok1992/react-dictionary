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

import { Router, Route, IndexRoute, hashHistory } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";

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



//http://localhost:8081/#/state=/profile&access_token=ya29.CjDFA8ppRgyvyqS2UMHr-vxYQ_O03g1MKZh8gr6fgF97Qe0eAxU8SUX0-2O59I2OyLA&token_type=Bearer&expires_in=3600