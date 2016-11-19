package database.entities;

import org.bson.types.ObjectId;
import org.mongodb.morphia.annotations.Entity;
import org.mongodb.morphia.annotations.Id;
import org.mongodb.morphia.annotations.PrePersist;

import java.util.Date;

/**
 * Created by Vovan on 06.11.2016.
 */
@Entity("testcol")
public class Word {
    @Id
    private ObjectId id;

    private String word;
    private String[] translations;
    private String lang;

    Date lastUpdated = new Date();

    @PrePersist
    void prePersist(){
        lastUpdated = new Date();
    }

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public String getWord() {
        return word;
    }

    public void setWord(String word) {
        this.word = word;
    }

    public String[] getTranslations() {
        return translations;
    }

    public void setTranslations(String[] translations) {
        this.translations = translations;
    }

    public String getLang() {
        return lang;
    }

    public void setLang(String lang) {
        this.lang = lang;
    }

    public Date getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(Date lastUpdated) {
        this.lastUpdated = lastUpdated;
    }
}
