package controllers;

import beans.InsertWordsBean;
import beans.SaveWordBean;
import com.fasterxml.jackson.core.type.TypeReference;
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
import utils.RequestSender;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Map;

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
                                      HttpServletResponse response) {
        logPageLoad("index", request);
        return new ModelAndView("index");
    }

    @RequestMapping(value = "/dbedit", method = RequestMethod.GET)
    public String handleDbEditRequest(HttpServletRequest request,
                                      Model model) {
        logPageLoad("dbedit", request);
        model.addAttribute("userForm", new InsertWordsBean());
        return "dbinsert";
    }

    @RequestMapping(value = "/db", method = RequestMethod.GET)
    @ResponseBody
    public List<Word> db(HttpServletRequest request) {
        logPageLoad("db", request);
        Datastore database = databaseService.getDatabase();

        final Query<Word> query = database.createQuery(Word.class);
        return query.asList();
    }

    @RequestMapping(value = "/create", method = RequestMethod.POST)
    @ResponseBody
    public String create(@ModelAttribute("userForm") InsertWordsBean insertWordsBean, HttpServletRequest request) {
        logPageLoad("db", request);
        ObjectMapper objectMapper = new ObjectMapper();
        Word[] words = null;
        try {
            words = objectMapper.readValue(insertWordsBean.getContent(), Word[].class);
        } catch (IOException e) {
            logger.error("ERROR", e);
        }
        databaseService.getDatabase().save(words);
        return "OK";
    }

    @RequestMapping(value = "/removeword", method = RequestMethod.POST)
    @ResponseBody
    public String remove(@RequestBody SaveWordBean data, HttpServletRequest request){
        logPageLoad("remove word token=" + data.getToken(), request);

        String x = validateToken(data.getToken());
        if (x != null) return x;

        databaseService.getDatabase().delete(Word.class, data.getWord().getId());
        return "{ \"response\":\"OK\"}";
    }

    @RequestMapping(value = "/updateword", method = RequestMethod.POST)
    @ResponseBody
    public String updateWord(@RequestBody SaveWordBean data, HttpServletRequest request) {
        logPageLoad("update word token=" + data.getToken(), request);

        String x = validateToken(data.getToken());
        if (x != null) return x;
        databaseService.getDatabase().merge(data.getWord());
        return "{ \"response\":\"OK\"}";
    }

    @RequestMapping(value = "/saveword", method = RequestMethod.POST)
    @ResponseBody
    public String save(@RequestBody SaveWordBean data, HttpServletRequest request) {
        logPageLoad("save word token=" + data.getToken(), request);

        String x = validateToken(data.getToken());
        if (x != null) return x;

        databaseService.getDatabase().save(data.getWord());
        return "{ \"response\":\"OK\"}";
    }

    private String validateToken(String token) {
        String result = null;
        try {
            result = RequestSender.post("https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=" + token);
        } catch (Exception e) {
            logger.error("ERROR, code 1: ", e);
            return "{ \"response\":\"FAIL\", \"code\":1 }";
        }
        Map<String, String> resp = null;
        try {
            resp = new ObjectMapper().readValue(result, new TypeReference<Map<String, String>>() {
            });
        } catch (Exception e) {
            logger.error("ERROR", e);
            return "{ \"response\":\"FAIL\", \"code\":2 }";
        }

        if (resp.get("email") == null || !resp.get("email").equals("vovanok1992@gmail.com")) {
            return "{ \"response\":\"FAIL\", \"code\":3 }";
        }
        return null;
    }

    private void logPageLoad(String page, HttpServletRequest request) {
        logger.info("#OP> " + page + " ip=" + ClientInfoUtils.getClientIpAddr(request) + " ua=" + request.getHeader("User-Agent"));
    }
}