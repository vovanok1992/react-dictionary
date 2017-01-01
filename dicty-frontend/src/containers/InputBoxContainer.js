/**
 * Created by Vovan on 18.12.2016.
 */

import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as WordActions from "../actions/WordsActions";

import InputBox from "../components/InputBox";

class InputBoxContainer extends React.Component {
    render() {
        return (
            <InputBox inputWord={this.props.inputWord}
                      translationBoxVisible={this.props.showTranslationInput}
                      showNewWordBtn={this.props.showNewBtn}
                      onInputWordChange={this.props.inputWordChanged}
                      onNewWordClicked={this.props.newWordClicked}
                      onSaveWord={this.props.saveWord}
                      onTranslationFocus={this.props.loadTranslation}
                      tootltipTranslation={this.props.translationTooltip}
                      auth={this.props.auth}/>
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
            showTranslationInput: showTranslationInput,
            translationTooltip: state.translatedWord,
            auth: state.auth
        };
    },
    (dispatch) => bindActionCreators(
        {
            inputWordChanged: WordActions.inputWordChanged,
            newWordClicked: WordActions.newWordClicked,
            saveWord: WordActions.saveOnServer,
            loadTranslation: WordActions.loadTranslation
        },
        dispatch)
)(InputBoxContainer);