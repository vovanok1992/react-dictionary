/**
 * Created by Vovan on 30.12.2016.
 */

import React from "react";

import WordsTableContainer from "../containers/WordsTableContainer";
import InputBoxContainer from "../containers/InputBoxContainer";
import EditWordModalContainer from "../containers/EditWordModalContainer";

const Component = () => (
    <div className="container">
        <InputBoxContainer/>
        <WordsTableContainer/>
        <EditWordModalContainer/>
    </div>
);

export default Component;