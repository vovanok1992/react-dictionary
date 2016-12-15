package controllers;

import beans.InsertWordsBean;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import database.DatabaseService;
import database.entities.Word;
import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.query.Query;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import utils.ClientInfoUtils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
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

    @RequestMapping(value = "/dbedit", method = RequestMethod.GET)
    public String handleDbEditRequest(HttpServletRequest request,
                                      Model model){
        logPageLoad("dbedit", request);
        model.addAttribute("userForm", new InsertWordsBean());
        return"dbinsert";
    }

    @RequestMapping(value = "/db", method = RequestMethod.GET)
    @ResponseBody public List<Word> db(HttpServletRequest request) {
        logPageLoad("db", request);
        Datastore database = databaseService.getDatabase();

        final Query<Word> query = database.createQuery(Word.class);
        return query.asList();
    }

    @RequestMapping(value = "/create", method = RequestMethod.POST)
    @ResponseBody public String create(@ModelAttribute("userForm") InsertWordsBean insertWordsBean, HttpServletRequest request) {
        logPageLoad("db", request);
        ObjectMapper objectMapper = new ObjectMapper();
        Word[] words = null;
        try {
            words = objectMapper.readValue(insertWordsBean.getContent(), Word[].class);
        } catch (IOException e) {
            logger.error("ERROR",e);
        }
        databaseService.getDatabase().save(words);
        return "OK";
    }

    private void logPageLoad(String page, HttpServletRequest request){
        logger.info("#OP> " + page + " ip=" + ClientInfoUtils.getClientIpAddr(request) + " ua="+request.getHeader("User-Agent"));
    }
}