<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<html>
<head>
    <title>Title</title>
    <link rel="stylesheet" href="css/leave.css">
</head>
<body>
<div class="leave-container">
    <c:import url="header.jsp" />
    <section>
        <sec:authentication property="principal" var="principal"/>
        <c:set var="user" value="${principal.user}"/>
        <form>
            <input type="text" name="userId" id="userId" value="${user.userId}" readonly><br>
            <input type="password" id="userPassword" name="userPassword" required placeholder="비밀번호"><br>
            <input type="password" id="passwordCheck" name="passwordCheck" required placeholder="비밀번호 재입력"><br>
            <input id="leave-button" type="button" value="탈퇴" onclick="leaveCheck(form)">
        </form>
    </section>
    <c:import url="footer.jsp" />
</div>
<script src="script/leaveValidation.js"></script>
</body>
</html>
