/**
 * Created by Vovan on 18.12.2016.
 */

import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as WordActions from "../actions/WordsActions";

import WordsTable from "../components/WordsTable";

import {getFilteredWords} from "../selectors/FilteredWordSelector";

class WordsTableContainer extends React.Component {
    render() {
        return (
            <WordsTable wordClicked={this.props.wordClicked} words={this.props.words}/>
        );
    }
}

export default connect(
    (state) => {
        return {
            words: getFilteredWords(state)
        }
    },
    (dispatch) => bindActionCreators({wordClicked: WordActions.wordClicked}, dispatch)
)(WordsTableContainer);