import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Content from "./Content";
import LoadingOverlay from "./LoadingOverlay";

export default class Layout extends React.Component {

    render() {
        return (
            <div className="pageBody">
                <Header/>
                <Content/>
                <Footer/>
                <LoadingOverlay/>
            </div>
        );
    }
}