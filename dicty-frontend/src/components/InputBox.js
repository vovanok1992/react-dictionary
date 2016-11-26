import React from 'react';
import Button from 'react-bootstrap/lib/Button';

import * as WordActions from '../actions/WordsActions';

import WordStringUtils from '../utils/WordStringUtils'

import OnlineTranslationStore from '../stores/OnlineTranslationStore'


export default class InputBox extends React.Component {

    constructor() {
        super();
        this.state = {
            translation: "",
            showNewWordBtn: false,
            inputWord: "",
            translationTooltipVisible: false,
            lastTranslation: ""
        };
    }

    componentWillMount() {
        OnlineTranslationStore.on("change", () => {
            this.setState({
                translationTooltipVisible: true,
                lastTranslation: OnlineTranslationStore.getTranslation()
            });
        });
    }

    handleChangeWord(word) {
        if (word == '') {
            this.setState({showNewWordInput: false});
        }

        this.setState({inputWord: word});
        this.props.onInputWordChange(word);
    }

    handleChangeTranslation(e) {
        this.translation = e.target.value;
        this.setState({translation: this.translation});
        if (this.translation.trim() == '') {
            this.translationInputFocused();
        } else {
            this.setState({translationTooltipVisible: false});
        }
    }

    translationInputFocused() {
        if (OnlineTranslationStore.getWord() != this.state.inputWord) {
            WordActions.translate(this.state.inputWord, WordStringUtils.isRussian(this.state.inputWord) ? "ru-en" : "en-ru");
        } else if (typeof this.translation != 'undefined' && this.translation.trim() == '') {
            this.setState({translationTooltipVisible: true})
        }
    }

    tooltipClicked() {
        this.translation = OnlineTranslationStore.getTranslation();
        this.setState({translation: OnlineTranslationStore.getTranslation()})
    }

    render() {
        var showNewWordInput = this.props.showNewWordInput || this.state.showNewWordInput;
        const saveWord = "wordSearch newWord" + (showNewWordInput ? " visible" : "");
        const newWord = "inputWordBtn" + (this.props.showNewWordBtn && !showNewWordInput ? " visible" : "");
        const newWordIcon = "glyphicon" + (this.state.inputWord.length > 0 ? " glyphicon-remove-sign removeIcon" : " glyphicon-search");
        const translationTooltip = "translationTooltip" + (this.state.translationTooltipVisible ? " visible" : "");

        return (
            <div>
                <div className="wordSearch">
                    <input type="text"
                           onChange={(e)=> {this.handleChangeWord(e.target.value)}}
                           value={this.state.inputWord}
                           className="wordInput"
                           placeholder="Input your word..."/>
                    <span onClick={(e)=> {this.handleChangeWord("")}}
                          className={newWordIcon}/>
                    <Button className={newWord}
                            onClick={()=> {
                                this.setState({showNewWordBtn: false, showNewWordInput: true})
                            }}>New</Button>
                </div>

                <div className={saveWord}>
                    <input type="text"
                           className="wordInput"
                           onChange={this.handleChangeTranslation.bind(this)}
                           onFocus={this.translationInputFocused.bind(this)}
                           onBlur={()=> {
                               this.setState({translationTooltipVisible: false})
                           }}
                           value={this.state.translation}
                           placeholder="Input your translation..."/>
                    <span className="glyphicon glyphicon-plus"/>
                    <Button onClick={()=> {
                        this.props.createWord(this.state.inputWord, this.state.translation);
                        this.handleChangeWord("");
                    }} className="saveWord">Save</Button>

                    <div className={translationTooltip}>
                        <div className="in tooltip bottom" onClick={this.tooltipClicked.bind(this)}>
                            <div className="tooltip-arrow"></div>
                            <div className="tooltip-inner">{this.state.lastTranslation}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}