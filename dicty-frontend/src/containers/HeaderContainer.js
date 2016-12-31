/**
 * Created by Vovan on 18.12.2016.
 */

import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as WordActions from "../actions/WordsActions";

import Header from "../components/Header";

class HeaderContainer extends React.Component {
    render() {
        return <Header info={this.props.info}/>
    }
}

export default connect(
    (state) => {
        return {
            info: state.auth.info
        };
    }
)(HeaderContainer);