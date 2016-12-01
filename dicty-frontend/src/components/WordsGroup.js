/**
 * Created by Vovan on 26.11.2016.
 */
import React from 'react';

export default class WordsGroup extends React.Component {
    render() {
        return (
            <div className="group">
                <div className="group-header">{this.props.header}</div>
                {this.props.wordsElements}
            </div>
        );
    }
}
