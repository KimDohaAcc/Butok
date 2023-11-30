<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<html>
<head>
  <title>Title</title>
  <style>
    section{
      display: flex;
      flex-flow: wrap column;
      justify-content: center;
      align-items: center;
    }

    img {
      width: 30vw;
      height: auto;
      margin: 5%;
    }

    footer {
      padding-bottom : 0.1rem;
      display:flex;
      flex-flow: column;
      justify-content: flex-end;
      align-items: center;
      font-size : 0.1rem;
    }
  </style>
</head>
<body>
<div class="leave-container">
  <c:import url="header.jsp" />
  <section>
    <img src="image/이동 불가.png">
  </section>
</div>
<c:import url="footer.jsp" />
<script src="script/leaveValidation.js"></script>
</body>
</html>
