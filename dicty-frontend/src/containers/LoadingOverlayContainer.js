/**
 * Created by Vovan on 25.12.2016.
 */

import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as WordActions from "../actions/WordsActions";

import LoadingOverlay from "../components/LoadingOverlay"

class LoadingOverlayContainer extends React.Component {
    render() {
        return (
            <LoadingOverlay loading={this.props.loading} />
        );
    }
}

export default connect(
    (state) => {
        return {
            loading: state.loading
        }
    },
    (dispatch) => bindActionCreators({inputWordChanged: WordActions.inputWordChanged}, dispatch)
)(LoadingOverlayContainer);