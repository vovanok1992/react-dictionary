package beans;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

/**
 * Created by Vovan on 06.11.2016.
 */
@Component
public class TestBean {

    Logger logger = LoggerFactory.getLogger(TestBean.class);

    String word;

    @PostConstruct
    public void init(){
        logger.error("Init bean");
        word = "test";
    }

    public String getWord() {
        return word;
    }

    public void setWord(String word) {
        this.word = word;
    }
}
