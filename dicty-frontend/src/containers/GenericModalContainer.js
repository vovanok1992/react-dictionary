/**
 * Created by Vovan on 18.12.2016.
 */

import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as WordActions from "../actions/WordsActions";

import GenericModal from "../components/GenericModal"

class GenericModalContainer extends React.Component {
    render() {
        return (
            <GenericModal show={this.props.content != null} closeHandler={this.props.closeHandler} content={"Test"} />
        );
    }
}

export default connect(
    (state) => {
        return {
            content: state.selectedWord
        }
    },
    (dispatch) => bindActionCreators({closeHandler: WordActions.wordClicked}, dispatch)
)(GenericModalContainer);