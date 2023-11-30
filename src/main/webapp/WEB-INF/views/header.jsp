<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<html>
<head>
    <link rel="stylesheet" href="css/header.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
</head>
<body>
<header class="header">
    <div id="logo">
        <a href="/">
            <img src="image/loco.png">
        </a>
    </div>
    <nav>
        <ul id="nav-list">
            <sec:authorize access="isAnonymous()">
                <li><a href="login"><img src="../image/login.png"></a></li>
                <li><a href="regist"><img src="../image/regist.png"></a></li>
            </sec:authorize>
            <sec:authorize access="hasAuthority('USER')">
                <sec:authentication property="principal" var="principal"/>
                <c:set var="user" value="${principal.user}"/>
                <input type="hidden" id="userCode" value="${user.getUserCode()}">
                <li><a href="myInterests?code=${user.getUserCode()}"><img src="../image/interests.png"></a></li>
                <li><a href="logout"><img src="../image/logout.png"></a></li>
                <li><a href="myPage"><img src="../image/myPage.png"></a></li>
            </sec:authorize>
            <sec:authorize access="hasAuthority('ADMIN')">
                <li><a href="logout"><img src="../image/logout.png"></a></li>
                <li><a href="data">데이터를 만들러 떠나요</a></li>
            </sec:authorize>
        </ul>
    </nav>
</header>
</body>
</html>