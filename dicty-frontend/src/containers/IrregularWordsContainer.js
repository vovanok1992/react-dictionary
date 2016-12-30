/**
 * Created by Vovan on 18.12.2016.
 */

import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as WordActions from "../actions/WordsActions";

import IrregularVerbs from "../components/IrregularVerbs";

class IrregularWordsContainer extends React.Component {
    render() {
        if (this.props.appInited) {
            return <IrregularVerbs loadIrrVerbs={this.props.loadIrrVerbs}
                                   loadDefinition={this.props.loadDefinition}
                                   verbs={this.props.verbs}/>
        }

        return (
            <div>Application still loading...</div>
        );
    }
}

export default connect(
    (state) => {
        return {
            appInited: state.appInited,
            verbs: state.irregularVerbs
        }
    },
    (dispatch) => bindActionCreators({
        loadIrrVerbs: WordActions.loadIrrVerbs,
        loadDefinition: WordActions.loadDefinition
    }, dispatch)
)(IrregularWordsContainer);