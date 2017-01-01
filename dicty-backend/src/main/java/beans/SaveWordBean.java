package beans;

import database.entities.Word;

/**
 * Created by Vovan on 01.01.2017.
 */
public class SaveWordBean {

    private String token;
    private Word word;

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Word getWord() {
        return word;
    }

    public void setWord(Word word) {
        this.word = word;
    }
}
