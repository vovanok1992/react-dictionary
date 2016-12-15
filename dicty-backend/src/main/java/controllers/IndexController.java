package controllers;

import database.DatabaseService;
import database.entities.Word;
import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.query.Query;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import utils.ClientInfoUtils;

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

    @Autowired
    private DatabaseService databaseService;

    @RequestMapping(method = RequestMethod.GET)
    public ModelAndView handleRequest(HttpServletRequest request,
                                      HttpServletResponse response){
        logPageLoad("index", request);
        return new ModelAndView("index");
    }

    @RequestMapping(value = "/db", method = RequestMethod.GET)
    @ResponseBody public List<Word> db(HttpServletRequest request) {
        logPageLoad("db", request);
        Datastore database = databaseService.getDatabase();

        final Query<Word> query = database.createQuery(Word.class);
        return query.asList();
    }

    @RequestMapping(value = "/create", method = RequestMethod.POST)
    @ResponseBody public String create(@RequestBody Word word, HttpServletRequest request) {
        logPageLoad("db", request);
        Datastore database = databaseService.getDatabase();
        if(word == null){
            logger.error("Word is null !!!");
            return "error";
        }
        word.setLang("en-ru");
        database.save(word);
        return "done";
    }

    private void logPageLoad(String page, HttpServletRequest request){
        logger.info("#OP> " + page + " ip=" + ClientInfoUtils.getClientIpAddr(request) + " ua="+request.getHeader("User-Agent"));
    }
}