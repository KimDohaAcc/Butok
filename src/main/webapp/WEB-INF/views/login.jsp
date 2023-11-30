<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
    <title>Title</title>
    <link rel="stylesheet" href="css/login.css">
    <link rel="stylesheet" href="css/grid.css">
    <link rel="stylesheet" href="css/mobileGrid.css">
</head>
<body>
<div class="login-container">
    <c:import url="header.jsp" />
    <c:import url="mHeader.jsp"/>
    <section id="login">
        <h2>로그인</h2>
        <c:if test="${not empty sessionScope.error}">
            <div id="loginFail-message">
                <p>${sessionScope.exception}</p>
            </div>
        </c:if>
        <form id="loginForm" method="POST" action="/doLogin">
            <input type="text" name="userId" id="userId" required placeholder="아이디" required><br>
            <input type="password" name="userPassword" id="userPassword" required
                   placeholder="비밀번호" required><br>
            <input id="login-button" type="button" value="로그인" onclick="loginCheck(form)" >
        </form>
    </section>
    <c:import url="footer.jsp" />
    <c:import url="mNavi.jsp"/>
</div>
<script src="script/loginValidation.js"></script>
</body>
</html>
