package controllers;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import database.DatabaseService;
import database.entities.Word;
import org.bson.Document;
import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.query.Query;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

/**
 * Created by Vovan on 29.10.2016.
 */

@Controller
@CrossOrigin
@RequestMapping("/")
public class IndexController {

    private static final Logger logger = LoggerFactory.getLogger(IndexController.class);

    @RequestMapping(method = RequestMethod.GET)
    public ModelAndView handleRequest(HttpServletRequest request,
                                      HttpServletResponse response){
        logger.info("index page open");
        return new ModelAndView("index");
    }

    @RequestMapping(value = "/db", method = RequestMethod.GET)
    public @ResponseBody List<Word> db() {
        logger.info("db page open");
        Datastore database = DatabaseService.getDatabase();

        final Query<Word> query = database.createQuery(Word.class);
        final List<Word> employees = query.asList();

        return employees;
    }

    @RequestMapping(value = "/create", method = RequestMethod.POST)
    @ResponseBody public String create(@RequestBody Word word) {
        logger.info("create page open");
        Datastore database = DatabaseService.getDatabase();

        if(word == null){
            logger.error("Word is null !!!");
            return "error";
        }

        //Word word = new Word();
        //word.setWord("Hello");
        //word.setTranslations(new String[]{"Привет","Здравствуй"});
        word.setLang("en-ru");

        database.save(word);

        return "done";
    }

}