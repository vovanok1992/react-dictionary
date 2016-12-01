/**
 * Created by Vovan on 26.11.2016.
 */
import React from 'react';
import Table from 'react-bootstrap/lib/Table';
import * as WordActions from '../actions/WordsActions';

export default class Word extends React.Component {

    open(){
        console.log("Word clicked")
        this.props.onClick();
    }

    close(){
        console.log("closed")
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