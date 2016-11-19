/**
 * Created by Vovan on 13.11.2016.
 */

import Ajax from './Ajax'

class Dictionary {

    getAllWords(serverUrl){
        return Ajax.get(serverUrl + "/db");
    }

    saveWord(serverUrl, word){
        return Ajax.post(serverUrl + "/create", word);
    }

}

export default new Dictionary();