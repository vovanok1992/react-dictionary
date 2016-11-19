package utils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.ProtocolException;
import java.net.URL;

/**
 * Created by Vovan on 06.11.2016.
 */
public class RequestSender {

    private static final Logger logger = LoggerFactory.getLogger(RequestSender.class);

    private RequestSender(){}

    public static String post(String urlString) throws Exception {
        logger.info("Sending request to url=" + urlString);

        String result = "";
        URL url = new URL(urlString);
        HttpURLConnection httpCon = (HttpURLConnection) url.openConnection();
        httpCon.setDoOutput(true);
        httpCon.setRequestMethod("POST");
        OutputStreamWriter out = new OutputStreamWriter(
                httpCon.getOutputStream());

        result = getOutput(result, httpCon);

        logger.info("Result of request=" + result);
        out.close();
        return result;
    }

    private static String getOutput(String result, HttpURLConnection httpCon) throws IOException {
        BufferedReader in = new BufferedReader(
                new InputStreamReader(httpCon.getInputStream(),"UTF8"));
        String inputLine;
        while ((inputLine = in.readLine()) != null) {
            result+=(inputLine);
        }
        in.close();
        return result;
    }

}
