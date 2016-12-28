/**
 * Created by Vovan on 28.12.2016.
 */

import { createSelector } from "reselect";
import WordStringUtils from "../utils/WordStringUtils";

const getWords = (state) => state.words;
const getInputWord = (state) => state.inputWord;

export const getFilteredWords = createSelector(
    [getWords, getInputWord],
    (words, inputWord) => {
        console.log("RECALC ! [" + inputWord + "]");
        return WordStringUtils.filterArray(words, inputWord);
    }
);
