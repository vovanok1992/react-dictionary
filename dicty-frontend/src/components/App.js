/**
 * Created by Vovan on 18.12.2016.
 */

import React from "react"

import WordsTableContainer from "../containers/WordsTableContainer";
import GenericModalContainer from "../containers/DefinitionModalContainer";
import InputBoxContainer from "../containers/InputBoxContainer";
import LoadingOverlayContainer from "../containers/LoadingOverlayContainer";

import Footer from "../components/Footer";
import Header from "../components/Header";

const App = () => (

    <div className="pageBody">
        <Header/>
        <div className="container">
            <InputBoxContainer/>
            <WordsTableContainer/>
        </div>
        <GenericModalContainer/>
        <LoadingOverlayContainer/>
        <Footer/>
    </div>

);

export default App;