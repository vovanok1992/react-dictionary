/**
 * Created by Vovan on 18.12.2016.
 */

import React from "react";

import GenericModalContainer from "../containers/DefinitionModalContainer";
import LoadingOverlayContainer from "../containers/LoadingOverlayContainer";
import HeaderContainer from "../containers/HeaderContainer";

import Footer from "../components/Footer";

export default class App extends React.Component {

    render() {
        return (
            <div className="pageBody">
                <HeaderContainer/>
                {this.props.children}
                <GenericModalContainer/>
                <LoadingOverlayContainer/>
                <Footer/>
            </div>
        );
    }
}