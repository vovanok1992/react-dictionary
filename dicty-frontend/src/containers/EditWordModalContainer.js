/**
 * Created by Vovan on 18.12.2016.
 */

import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as WordActions from "../actions/WordsActions";

import EditWordModal from "../components/EditWordModal";

class DefinitionModalContainer extends React.Component {
    render() {
        return (
            <EditWordModal word={this.props.word}
                           wordClicked={this.props.wordClicked}
                           loadDefinition={this.props.loadDefinition}
                           wordEdited={this.props.wordEdited} />
        );
    }
}

export default connect(
    (state) => {
        return {
            word: state.editWord
        };
    },
    (dispatch) => bindActionCreators({
        wordClicked: WordActions.wordClicked,
        loadDefinition: WordActions.loadDefinition,
        wordEdited: WordActions.wordEdited
    }, dispatch)
)(DefinitionModalContainer);