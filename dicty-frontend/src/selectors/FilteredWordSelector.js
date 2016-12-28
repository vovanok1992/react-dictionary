/**
 * Created by Vovan on 28.12.2016.
 */

import { createSelector } from "reselect";
import WordStringUtils from "../utils/WordStringUtils";

const getWords = (state) => state.words;
const getInput = (state) => state.inputWord;

export const getFilteredWords = createSelector(
    [getWords, getInput],
    (words, inputWord) => {
        console.log("RECALC !");
        return WordStringUtils.filterArray(words, inputWord);
    }
);
