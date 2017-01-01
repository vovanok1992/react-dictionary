import React from "react";
import Button from "react-bootstrap/lib/Button";
import classNames from "classnames";

export default class InputBox extends React.Component {

    constructor() {
        super();
        this.state = {
            inputTranslation: "",
            showTooltip: false
        };
    }

    translationInputFocused() {
        this.props.onTranslationFocus(this.props.inputWord);
    }

    saveWordClicked(){
        if(this.props.auth.token){
            this.props.onSaveWord(this.props.inputWord, this.state.inputTranslation, this.props.auth.token)
        } else {
            alert("Sorry, but you not authorized");
        }
    }

    render() {

        const isWordEmpty = this.props.inputWord.length > 0;
        const saveWordClassNames = classNames("wordSearch", "newWord", {"visible": this.props.translationBoxVisible});
        const translationTooltipClassNames = classNames("translationTooltip", {"visible": !!this.props.tootltipTranslation && this.state.inputTranslation.length == 0});
        const newWordClassNames = classNames("inputWordBtn", {"visible": this.props.showNewWordBtn});
        const newWordIconClassNames = classNames("glyphicon", {
            "glyphicon-remove-sign removeIcon": isWordEmpty,
            "glyphicon-search": !isWordEmpty
        });

        return (
            <div>
                <div className="wordSearch">
                    <input type="text"
                           onChange={(e) => {
                               this.props.onInputWordChange(e.target.value);
                           }}
                           value={this.props.inputWord}
                           className="wordInput"
                           placeholder="Input your word..."/>
                    <span onClick={() => {
                        this.props.onInputWordChange("");
                    }}
                          className={newWordIconClassNames}/>
                    <Button className={newWordClassNames}
                            onClick={this.props.onNewWordClicked}>New</Button>
                </div>

                <div className={saveWordClassNames}>
                    <input type="text"
                           className="wordInput"
                           onChange={(e) => this.setState({inputTranslation: e.target.value})}
                           onFocus={this.translationInputFocused.bind(this)}
                           onBlur={() => {
                               this.setState({translationTooltipVisible: false});
                           }}
                           value={this.state.inputTranslation}
                           placeholder="Input your translation..."/>
                    <span className="glyphicon glyphicon-plus"/>
                    <Button onClick={this.saveWordClicked.bind(this)} className="saveWord">Save</Button>

                    <div className={translationTooltipClassNames}>
                        <div className="in tooltip bottom"
                             onClick={() => this.setState({inputTranslation: this.props.tootltipTranslation})}>
                            <div className="tooltip-arrow"></div>
                            <div className="tooltip-inner">{this.props.tootltipTranslation}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}