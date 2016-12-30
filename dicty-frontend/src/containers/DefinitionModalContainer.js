/**
 * Created by Vovan on 18.12.2016.
 */

import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as WordActions from "../actions/WordsActions";

import DefinitionModal from "../components/DefinitionModal";

class DefinitionModalContainer extends React.Component {
    render() {
        return (
            <DefinitionModal show={this.props.content != null}
                             closeHandler={this.props.closeHandler}
                             content={this.props.content}
                             header="Definition"/>
        );
    }
}

export default connect(
    (state) => {
        return {
            content: state.wordDefinition
        };
    },
    (dispatch) => bindActionCreators({closeHandler: WordActions.loadDefinition}, dispatch)
)(DefinitionModalContainer);