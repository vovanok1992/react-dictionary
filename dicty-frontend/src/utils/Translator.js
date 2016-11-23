/**
 * Created by Vovan on 18.11.2016.
 */
import axios from 'axios'

class Translator {

    translate(word, lang){

        console.log("Translate " + word);

        var url = "https://translate.yandex.net/api/v1.5/tr.json/translate?" +
            "key=trnsl.1.1.20161106T130008Z.698f52107162a893.b1c487d8cb39dd7d48b0eb96e3ec62069bb581a0&amp;" +
            "text=" + word + "&amp;" +
            "lang=" + lang;

        return axios.get(url);
    }

}

const translator = new Translator();

export default translator;
