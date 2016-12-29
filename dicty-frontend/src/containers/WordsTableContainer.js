/**
 * Created by Vovan on 18.12.2016.
 */

import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as WordActions from "../actions/WordsActions";

import WordsTable from "../components/WordsTable";

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
            words: state.words.filtered
        }
    },
    (dispatch) => bindActionCreators({wordClicked: WordActions.loadDefinition}, dispatch)
)(WordsTableContainer);