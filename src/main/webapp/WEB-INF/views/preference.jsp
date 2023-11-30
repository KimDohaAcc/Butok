<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<html>
<head>
    <title>Title</title>
    <link rel="stylesheet" href="css/preference.css">
</head>
<body>
<section id = "preference-container">
    <c:import url="header.jsp" />
    <form method="POST" action="/finalRegist">
        <div class="option-box">
            <p class="question">원하는 임대차 계약 방식을 선택해주세요</p>
            <div class="option one" name="contractType" id="contractType" data-value="월세"><p>나는 월세!</p></div>
            <div class="option one" name="one" data-value="전세"><p>나는 전세!</p></div>
            <div class="option one" name="one" data-value="전체"><p>상관없어요</p></div>
        </div>
        <div class="option-box">
            <p class="question">구하는 집의 유형은 무엇인가요?</p>
            <div class="option two" data-value="연립다세대"><p>연립다세대예요</p></div>
            <div class="option two" data-value="오피스텔"><p>오피스텔이에요</p></div>
            <div class="option two" data-value="아파트"><p>아파트예요</p></div>
            <div class="option two" data-value="전체"><p>상관없어요</p></div>
        </div>
        <div class="option-box">
            <p class="question">보증금은 어느 정도를 원하시나요?</p>
            <div class="option thr" data-value="0/10000"><p>저렴하게 1억 이하가<br>좋겠어요</p></div>
            <div class="option thr" data-value="10000/20000"><p>1억 초과 - 2억 이하면<br>좋겠어요</p></div>
            <div class="option thr" data-value="20000/30000"><p>2억 초과 - 3억 이하면<br>좋겠어요</p></div>
            <div class="option thr" data-value="30000/max"><p>3억 초과가<br>좋아요!</p></div>
            <div class="option thr" data-value="0/max"><p>모든 금액의 매물을<br>보고 싶어요</p></div>
        </div>
        <div class="option-box">
            <p class="question">구하려는 집은 몇 평인가요?</p>
            <div class="option four" data-value="0/15"><p>아기자기 살 거야!<br>15평 이하</p></div>
            <div class="option four" data-value="15/30"><p>방도 있고, 거실도 있고...<br>15평 초과 30평 이하</p></div>
            <div class="option four" data-value="30/max"><p>넓은 게 최고!<br>30평 초과</p></div>
        </div>
        <div class="buttonBox">
        <sec:authorize access="hasAuthority('USER')">
            <input id="choice-button" class="button" type="button" onclick="sendValue(form)" value="선택 완료!">
        </sec:authorize>
        <sec:authorize access="isAnonymous()">
            <input id="submit-button" class="button" type="button" onclick="sendValue(form)" value="가입 완료!">
        </sec:authorize>
        </div>
    </form>
</section>
<c:import url="footer.jsp" />
<script src="script/choicePreference.js"></script>
</body>
</html>
