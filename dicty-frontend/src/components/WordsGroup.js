/**
 * Created by Vovan on 26.11.2016.
 */
import React from 'react';

export default class WordsGroup extends React.Component {
    render() {
        const style = "group" + ((this.props.index % 2 == 0) ? " odd" : " even");
        return (
            <div className={style}>
                <div className="group-header">{this.props.header}</div>
                {this.props.wordsElements}
            </div>
        );
    }
}
