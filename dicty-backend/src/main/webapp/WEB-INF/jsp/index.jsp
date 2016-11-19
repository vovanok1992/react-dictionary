<%--
  Created by IntelliJ IDEA.
  User: Vovan
  Date: 06.11.2016
  Time: 13:44
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Server index</title>
</head>
<body>
<h1>Dictionary server-side</h1>

<%
    out.println("<p>OS: " + System.getProperty("os.name")+"</p>");
    out.println("<p>Available processors (cores):  " + Runtime.getRuntime().availableProcessors()+"</p>");
    out.println("<p>Free memory (MB):  " + (Runtime.getRuntime().freeMemory() / (1024 * 1024))+"</p>");

    long maxMemory = Runtime.getRuntime().maxMemory();

    out.println("<p>Maximum memory (MB):  " + (maxMemory == Long.MAX_VALUE ? "no limit" : (maxMemory / (1024 * 1024)))+"</p>");
    out.println("<p>Total memory available to JVM (MB): " + (Runtime.getRuntime().totalMemory() / (1024 * 1024))+"</p>");

%>

<script>
    document.write("<p> Your user agent (Client) = " + navigator.userAgent + "</p>");
</script>

<div>
    <p>Useful links:</p>
    <ul>
        <li><a href="http://stackoverflow.com/questions/954302/how-to-make-a-programme-continue-to-run-after-log-out-from-ssh">Prevent a background process from being stopped after closing SSH client</a></li>
        <li><a href="http://stackoverflow.com/questions/6283167/list-of-java-processes">List of Java processes</a></li>
        <li><a href="http://www.cyberciti.biz/faq/kill-process-in-linux-or-terminate-a-process-in-unix-or-linux-systems/">Kill Process in Linux</a></li>
        <li><a href="http://unix.stackexchange.com/questions/74520/can-i-redirect-output-to-a-log-file-and-background-a-process-at-the-same-time">Can I redirect output to a log file</a></li>
    </ul>
    
</div>

</body>
</html>
