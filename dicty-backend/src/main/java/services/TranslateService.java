package services;

import external.Constants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import utils.RequestSender;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

/**
 * Created by Vovan on 06.11.2016.
 */
public class TranslateService {

    private static final Logger logger = LoggerFactory.getLogger(TranslateService.class);

    public static String translate(String word, String lang){
        String url = null;
        try {
            url = "https://translate.yandex.net/api/v1.5/tr.json/translate?" +
                    "key=" + Constants.YANDEX_TRANSLATE_API_KEY + "&amp;" +
                    "text=" + URLEncoder.encode(word, "UTF-8") + "&amp;" +
                    "lang=" + lang;
        } catch (UnsupportedEncodingException e) {
            logger.error("Error whyle generating link for word " + word + " url=" + url, e);
            return "";
        }

        String result = null;

        try {
            result = RequestSender.post(url);
        } catch (Exception e) {
            logger.error("Error whyle tranlating word " + word + " url=" + url, e);
            result = "";
        }

        return result;
    }

}
