/**
 * Created by Vovan on 26.11.2016.
 */
import React from "react";

export default class Word extends React.Component {

    open() {
        this.props.onClick();
    }

    render() {
        return (
            <div className="wordContainer">
                <div className="wordWithTranslation" onClick={this.open.bind(this)}>
                    <div>{this.props.word}</div>
                    <div>{this.props.translation}</div>
                </div>
            </div>
        );
    }
}