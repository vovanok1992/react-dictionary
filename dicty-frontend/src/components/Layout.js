import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import LoadingOverlay from "./LoadingOverlay";

export default class Layout extends React.Component {

    render() {
        return (
            <div className="pageBody">
                <Header/>
                {this.props.children}
                <Footer/>
                <LoadingOverlay/>
            </div>
        );
    }
}