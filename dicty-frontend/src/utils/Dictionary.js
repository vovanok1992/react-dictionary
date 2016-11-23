/**
 * Created by Vovan on 13.11.2016.
 */

import axios from 'axios'

class Dictionary {

    getAllWords(serverUrl){
        return axios.get(serverUrl + "/db");
    }

    saveWord(serverUrl, word){
        return axios.post(serverUrl + "/create", word);
    }

    getDefinition(word){
        return axios.get("http://api.pearson.com/v2/dictionaries/ldoce5/entries?headword=" + word);
    }

}

export default new Dictionary();