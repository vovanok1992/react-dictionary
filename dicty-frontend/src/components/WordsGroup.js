/**
 * Created by Vovan on 26.11.2016.
 */
import React from 'react';

export default class WordsGroup extends React.Component {

    constructor(){
        super();
        this.state = {closed: false};
    }

    headerClicked(){
        console.log("Clicked")
        this.setState({closed: !this.state.closed});
    }

    render() {
        const style = "group" + ((this.props.index % 2 == 0) ? " odd" : " even") + (this.state.closed ? " closed" :"");
        return (
            <div className={style}>
                <div onClick={this.headerClicked.bind(this)}
                    className="group-header">{this.props.header}</div>
                <div className="wordGroupContent">
                    {this.props.wordsElements}
                </div>
            </div>
        );
    }
}
