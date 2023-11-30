<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <link rel="icon" href="https://em-content.zobj.net/thumbs/240/google/350/nerd-face_1f913.png"/>
    <link rel="stylesheet" href="css/mobileGrid.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
    <title>slide for mobile</title>
</head>
<body>
<div class="mFamous">
    <h2>인기 매물</h2>
    <div class="mobile-slideshow-container">
        <div class="mobile-slide-wrapper">
            <c:forEach items="${dealList}" var="mDeal">
                <input type="hidden" class="mDealCode" value="${mDeal.dealCode}">
                <div class="mobile-deal-box">
                    <ul>
                        <li><h3>${mDeal.dealApartmentName}</h3></li>
                        <li>${mDeal.dealApartmentType} / ${mDeal.dealFloor}(층)</li>
                        <c:choose>
                            <c:when test="${mDeal.dealRentType eq '전세'}">
                                <li>${mDeal.dealRentType} : ${mDeal.dealDeposit}(만원)</li>
                            </c:when>
                            <c:otherwise>
                                <li>${mDeal.dealRentType} : ${mDeal.dealDeposit}/${mDeal.dealMonthlyRent}(만원)</li>
                            </c:otherwise>
                        </c:choose>
                        <li class="mobile-list"></li>
                    </ul>
                </div>
            </c:forEach>
        </div>
        <a class="prev" onclick="plusMSlides(-2)">&#10094;</a>
        <a class="next" onclick="plusMSlides(2)">&#10095;</a>
    </div>
    <script type="text/javascript" src="script/mobileSlide.js"></script>
</div>
</body>
</html>
