import React from "react";
import WordsTable from "./WordsTable";
import WordDefinitionModal from "./WordDefinitionModal";
import InputBox from "./InputBox";
import * as WordActions from "../actions/WordsActions";
import WordsStore from "../stores/WordsStore";
import DefinitionStore from "../stores/DefinitionStore";
import WordStringUtils from "../utils/WordStringUtils";


export default class Content extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            words: WordsStore.getWords(),
            showNewWordBtn: false,
            showNewWordInput: false,
            wordInfo: [],
            showModalW: false
        };
        this.word = "";
        this.filteredWords = [];

        this.wordsChanged = this.wordsChanged.bind(this);
        this.definitionChanged = this.definitionChanged.bind(this);
    }

    componentWillMount() {
        WordActions.loadWords();
        WordsStore.on("change", this.wordsChanged);
        DefinitionStore.on("change", this.definitionChanged);
    }

    componentWillUnmount() {
        WordsStore.removeListener("change", this.wordsChanged, true);
        DefinitionStore.removeListener("change", this.definitionChanged);
    }

    definitionChanged() {
        this.setState({
            wordInfo: DefinitionStore.getDefinitions(),
            showModalW: true,
            selectedWord: DefinitionStore.getWord()
        });
    }

    wordsChanged() {
        this.setState({
            words: WordsStore.getWords()
        });
        this.handleChangeWord(this.word);
    }

    handleChangeWord(word) {
        this.word = word;
        this.updateFilteredWords(word);
        this.setState({showNewWordBtn: (word.trim() !== "" && this.filteredWords.length !== 0)});
        this.setState({showNewWordInput: (word.trim() !== "" && this.filteredWords.length === 0)});
    }

    updateFilteredWords(inputtedWord) {
        this.filteredWords = this.state.words
            .filter((word) => {
                return WordStringUtils.testWord(word.en, inputtedWord) || WordStringUtils.testWord(word.ru, inputtedWord);
            });
    }

    createWord(word, trans) {
        if (trans.trim() === "") {
            alert("Please enter some text to translation");
            return;
        }

        const firstIsRussian = WordStringUtils.isRussian(word);
        if (firstIsRussian && WordStringUtils.isRussian(trans)) {
            alert("You have cyrillic symbols in both input fields. Can not determine how to save this.");
            return;
        }

        if (firstIsRussian) {
            WordActions.createWord(trans, word);
        } else {
            WordActions.createWord(word, trans);
        }
    }

    render() {
        return (
            <div className="container">
                <InputBox onInputWordChange={this.handleChangeWord.bind(this)}
                          createWord={this.createWord.bind(this)}
                          showNewWordBtn={this.state.showNewWordBtn}
                          showNewWordInput={this.state.showNewWordInput}
                />

                <WordsTable words={this.filteredWords}/>

                <WordDefinitionModal show={this.state.showModalW}
                                     selectedWord={this.state.selectedWord}
                                     wordInfo={this.state.wordInfo}
                                     closeHandler={() => {
                                         this.setState({showModalW: false})
                                     }}/>
            </div>
        );
    }
}