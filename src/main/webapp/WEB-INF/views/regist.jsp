<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
    <title>회원가입</title>
</head>
<script
        src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
<link rel="stylesheet" href="css/regist.css">
<link rel="stylesheet" href="css/mobileGrid.css">
<body>
<div class="container">
    <c:import url="header.jsp" />
    <c:import url="mHeader.jsp" />
    <section id="join-session">
        <h2>회원가입</h2><br>
        <form method="POST" action="/registProc">
            <input type="text" name="userId" id="userId" required placeholder="아이디" value="${param.userId}" ${empty param.userId ? "autofocus" : ""} />
            <input type="text" name="userName" id="userName" required placeholder="실명" value="${param.userName}" ${empty param.userName ? "autofocus" : ""} />
            <input type="password" name="userPassword" id="userPassword" required placeholder="비밀번호" value="${param.userPassword}" ${empty param.userPassword ? "autofocus" : ""} />
            <input type="password" name="passwordCheck" id="passwordCheck" required placeholder="비밀번호 재입력" value="${param.passwordCheck}" ${empty param.passwordCheck ? "autofocus" : ""} />
            <input id="regist-button" type="button" value="다음으로" onclick="checkValues(form)" />
        </form>
    </section>
    <c:import url="footer.jsp" />
    <c:import url="mNavi.jsp" />
</div>
<script src="script/registValidation.js"></script>
</body>
</html>