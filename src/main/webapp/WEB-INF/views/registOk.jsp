<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
  <title>Title</title>
  <link rel="stylesheet" href="css/regist.css">
</head>
<body>
  <c:import url="header.jsp" />
<div class="registOk-container">
  <section id="registOk">
    <h2>회원가입이 완료되었습니다.</h2>
    <div><button onclick="location.href='/login'">로그인 하러 가기 > </button></div>
  </section>
</div>
  <c:import url="footer.jsp" />
</body>
</html>
