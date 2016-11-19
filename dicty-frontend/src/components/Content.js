import React from 'react';
import WordsTable from './WordsTable';
import Button from 'react-bootstrap/lib/Button';

import * as WordActions from '../actions/WordsActions';

import WordsStore from '../stores/WordsStore'
import OnlineTranslationStore from '../stores/OnlineTranslationStore'


export default class Content extends React.Component {

    constructor() {
        super();
        this.state = {
            words: WordsStore.getWords(),
            translation: "",
            showNewWordBtn: false,
            inputWord: "",
            translationTooltipVisible: false,
            lastTranslation: ""
        };
        this.word = '';
    }

    componentWillMount() {
        WordActions.loadWords();
        WordsStore.on("change", () => {
            this.setState({
                words: WordsStore.getWords()
            });
            this.updateFilteredWords(this.state.inputWord);
        });

        OnlineTranslationStore.on("change", () => {
            this.setState({
                translationTooltipVisible: true,
                lastTranslation: OnlineTranslationStore.getTranslation()
            });
        });
        this.updateFilteredWords(this.state.inputWord);
    }

    onInputWordChange(word) {
        this.setState({inputWord: word});
        this.updateFilteredWords(word);
        if (word.trim() != '' && this.filteredWords.length != 0) {
            this.setState({showNewWordBtn: true})
        } else {
            this.setState({showNewWordBtn: false})
        }

        this.setState({showNewWordInput: (word.trim() != '' && this.filteredWords.length == 0)});

        this.props.wordUpdated(word);
    }

    handleChangeWord(e) {
        this.word = e.target.value;
        this.onInputWordChange(this.word);
    }

    updateFilteredWords(inputtedWord) {
        this.filteredWords = this.state.words
            .filter((word) => {
                return this.testWord(word.en, inputtedWord) || this.testWord(word.ru, inputtedWord);
            });
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

    createWord() {
        if (this.state.translation.trim() == '') {
            alert("Please enter some text to translation");
            return;
        }
        this.setState({showNewWordInput: false, translation: ""});
        WordActions.createWord(this.state.inputWord, this.state.translation);
    }

    testWord(word, inputtedWord) {
        if (typeof inputtedWord == 'undefined') {
            inputtedWord = '';
        }
        return word.toLowerCase().indexOf(inputtedWord.trim().toLowerCase()) != -1;
    }

    translationInputFocused() {
        if (OnlineTranslationStore.getWord() != this.state.inputWord) {
            WordActions.translate(this.state.inputWord, "en-ru");
        } else if (this.translation.trim() == '') {
            this.setState({translationTooltipVisible: true})
        }
    }

    tooltipClicked() {
        this.translation = OnlineTranslationStore.getTranslation();
        this.setState({translation: OnlineTranslationStore.getTranslation()})
    }

    render() {
        const saveWord = "wordSearch newWord" + (this.state.showNewWordInput ? " visible" : "");
        const newWord = "inputWordBtn" + (this.state.showNewWordBtn ? " visible" : "");
        const newWordIcon = "glyphicon" + (this.state.inputWord.length > 0 ? " glyphicon-remove-sign removeIcon" : " glyphicon-search");
        const translationTooltip = "translationTooltip" + (this.state.translationTooltipVisible ? " visible" : "");

        return (
            <div className="container">
                <div>
                    <div className="wordSearch">
                        <input type="text"
                               onChange={this.handleChangeWord.bind(this)}
                               value={this.state.inputWord}
                               className="wordInput"
                               placeholder="Input your word..."/>
                        <span onClick={()=> {
                            this.onInputWordChange("");
                        }} className={newWordIcon}/>
                        <Button onClick={()=> {
                            this.setState({showNewWordBtn: false, showNewWordInput: true})
                        }} className={newWord}>New</Button>
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
                        <Button onClick={this.createWord.bind(this)} className="saveWord">Save</Button>

                        <div className={translationTooltip}>
                            <div className="in tooltip bottom" onClick={this.tooltipClicked.bind(this)}>
                                <div className="tooltip-arrow"></div>
                                <div className="tooltip-inner">{this.state.lastTranslation}</div>
                            </div>
                        </div>

                    </div>
                </div>

                <WordsTable words={this.filteredWords}/>
            </div>
        );
    }
}