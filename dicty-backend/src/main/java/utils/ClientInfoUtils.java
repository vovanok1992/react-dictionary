package utils;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by Vovan on 15.12.2016.
 */
public class ClientInfoUtils {

    private ClientInfoUtils(){}

    public static String getClientIpAddr(HttpServletRequest request) {
        String ipAddress = request.getHeader("X-FORWARDED-FOR");
        if (ipAddress == null) {
            ipAddress = request.getRemoteAddr();
        }
        return ipAddress;
    }

}
