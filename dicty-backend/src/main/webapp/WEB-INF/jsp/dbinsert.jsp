<%--
  Created by IntelliJ IDEA.
  User: Vovan
  Date: 06.11.2016
  Time: 13:44
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>

<html>
<head>
    <title>Database insert</title>
</head>
<body>
<style>
    .dataInputArea{
        width:100%;
        min-height: 150px;
        margin: 10px 0;
        resize: vertical;
    }
</style>

<span>Insert json array: </span>
<form:form methodParam="post" action="create" modelAttribute="userForm">
    <form:textarea class="dataInputArea" path="content" name="content"></form:textarea>
    <input type="submit" value="Submit" />
</form:form>
</body>
</html>
