import React from "react";
import ReactDOM from "react-dom";
import "es6-promise/auto";
import "./styles/main.scss";
import "../index.html";

import Layout from "./components/Layout.js";
import Content from "./components/Content";
import IrregularVerbs from "./components/IrregularVerbs";


import {Router, Route, IndexRoute, hashHistory} from "react-router";

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={Layout}>
            <IndexRoute component={Content}/>
            <Route path="learn" component={IrregularVerbs}/>
        </Route>
    </Router>
    , document.getElementById("app")
);


