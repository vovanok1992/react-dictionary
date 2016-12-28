/**
 * Created by Vovan on 18.12.2016.
 */

import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as WordActions from "../actions/WordsActions";

import InputBox from "../components/InputBox"

class InputBoxContainer extends React.Component {
    render() {
        return (
            <InputBox inputWord={this.props.inputWord}
                      translationTooltipVisible={false}
                      translationBoxVisible={this.props.showTranslationInput}
                      showNewWordBtn={this.props.showNewBtn}
                      onInputWordChange={this.props.inputWordChanged}
                      onNewWordClicked={this.props.newWordClicked}
                      onSaveWord={this.props.saveWord}/>
        );
    }
}

export default connect(
    (state) => {
        const isFilteredEmpty = state.words.filtered.length == 0;
        const showTranslationInput = isFilteredEmpty || state.words.forceNewWordInput;
        return {
            inputWord: state.words.inputWord,
            showNewBtn: !showTranslationInput && state.words.inputWord.length > 0,
            showTranslationInput: showTranslationInput
        }
    },
    (dispatch) => bindActionCreators(
        {
            inputWordChanged: WordActions.inputWordChanged,
            newWordClicked: WordActions.newWordClicked,
            saveWord: WordActions.saveWord
        },
        dispatch)
)(InputBoxContainer);