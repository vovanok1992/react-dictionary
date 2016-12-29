/**
 * Created by Vovan on 13.11.2016.
 */
import React from "react";
import Word from "./Word";
import WordsGroup from "./WordsGroup";

export default class WordsTable extends React.Component {

    shouldComponentUpdate(nextProps, nextState){
        return this.props.words.toString() != nextProps.words.toString();
    }

    groupWordsByDate(words) {
        const res = {};
        words.forEach((word) => {
            if(!word.date){
                word.date = "LOCAL_STORAGE";
            }

            if (!res[word.date]) {
                res[word.date] = [];
            }
            res[word.date].push(word);
        });
        return res;
    }

    makeWord(word){
        return <Word key={word.id}
                     onClick={() => {
                         this.props.wordClicked(word.en);
                     }}
                     word={word.en}
                     translation={word.ru}
        />
    }

    makeGroups(groups){
        return Object.keys(groups).map((key, index) => {
            const words = groups[key].map((word) => {
                return this.makeWord(word);
            });
            return <WordsGroup header={key} key={key} index={index} wordsElements={words}/>
        });
    }

    render() {
        if (this.props.words.length == 0) {
            return <div>No matches</div>;
        }

        const groups = this.groupWordsByDate(this.props.words);
        const res = this.makeGroups(groups);

        return (
            <div className="wordsTableContainer">
                {res}
            </div>
        );
    }
}