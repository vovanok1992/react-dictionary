package servlet;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import services.TranslateService;

import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;

/**
 * Created by Vovan on 29.10.2016.
 */
public class HelloWorldServlet extends HttpServlet {

    private static final Logger logger = LoggerFactory.getLogger(HelloWorldServlet.class);

    @Override
    public void init() throws ServletException {
        logger.info("Servlet inited !");
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse response) throws ServletException, IOException {
        logger.info("HelloWord servlet");
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();
        out.println("<h1>This is hello word servlet</h1>");

        String word = req.getParameter("word");
        if(StringUtils.isEmpty(word)){
            out.println("<i> You did not specified the word ! </i>");
            return;
        }

        String lang = req.getParameter("lang");
        logger.info("Lang="+lang);
        try {
            out.println("<b>" + TranslateService.translate(word, StringUtils.isEmpty(lang) ? "en-ru" : lang) + "</b>" );
        } catch (Exception e) {
            logger.error("Error sending request ", e);
        }

    }
}
