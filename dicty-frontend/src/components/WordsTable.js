/**
 * Created by Vovan on 13.11.2016.
 */
import React from 'react';

import * as WordActions from '../actions/WordsActions';

import Word from './Word'
import WordsGroup from './WordsGroup'

export default class WordsTable extends React.Component {

    groupWordsByDate(words) {
        const res = [];

        for (let i = 0; i < words.length; i++) {
            const word = words[i];
            if(word.date == undefined){
                word.date = "LOCAL_STORAGE";
            }

            if (res[word.date] == undefined) {
                res[word.date] = [];
            }
            res[word.date].push(word);
        }

        return res;
    }

    render() {
        if (this.props.words.length == 0) {
            return <div>No matches</div>;
        }

        const groups = this.groupWordsByDate(this.props.words);
        const res = [];

        for (const key in groups) {
            if(!groups.hasOwnProperty(key)){
                continue;
            }

            const group = groups[key];
            const words = group.map((word) => {
                return <Word key={word.id}
                             onClick={() => {
                                 WordActions.loadDefinition(word.en)
                             }}
                             word={word.en}
                             translation={word.ru}
                />
            });
            res.push(<WordsGroup header={key} key={key} wordsElements={words}/>)
        }

        return (
            <div>
                {res}
            </div>
        );
    }


}