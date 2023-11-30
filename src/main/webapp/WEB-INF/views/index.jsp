<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <meta charset="UTF-8">
    <title>부똑</title>
    <link rel="icon" href="https://em-content.zobj.net/thumbs/240/google/350/nerd-face_1f913.png"/>
    <link rel="stylesheet" href="css/index.css">
    <link rel="stylesheet" href="css/grid.css">
    <link rel="stylesheet" href="css/mobileGrid.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
</head>
<body>
<div class="container">
    <c:import url="header.jsp"/>
    <c:import url="mHeader.jsp"></c:import>
    <section class="section">
        <div class="bannerArea">
            <div class="searchArea">
                <select id="rentType">
                    <option selected>전체</option>
                    <c:forEach items="${rentList}" var="deal">
                        <option>${deal.dealRentType}</option>
                    </c:forEach>
                </select>
                <select id="apartmentType">
                    <option selected>전체</option>
                    <c:forEach items="${aptList}" var="deal">
                        <option>${deal.dealApartmentType}</option>
                    </c:forEach>
                </select>
                <input type="text" name="keyword" id="searchBar" placeholder="전체로 검색하기">
                <input type="button" onclick="checkValues()" value="검색">
            </div>
        </div>
        <div class="famous">
            <h2>인기 매물</h2>
            <div class="slideshow-container">
                <a class="prev" onclick="plusSlides(-5)">&#10094;</a>
                <div class="slide-wrapper">
                    <c:forEach items="${dealList}" var="deal">
                        <input type="hidden" class="dealCode" value="${deal.dealCode}">
                            <div class="deal-box">
                        <a href="detailSearch?keyword=${deal.dealApartmentName}&rentType=전체&aptType=전체">
                                <ul>
                                    <li><h3>${deal.dealApartmentName}</h3></li>
                                    <li>${deal.dealApartmentType} / ${deal.dealFloor}(층)</li>
                                    <c:choose>
                                        <c:when test="${deal.dealRentType eq '전세'}">
                                            <li>${deal.dealRentType} : ${deal.dealDeposit}(만원)</li>
                                        </c:when>
                                        <c:otherwise>
                                            <li>${deal.dealRentType} : ${deal.dealDeposit}/${deal.dealMonthlyRent}(만원)
                                            </li>
                                        </c:otherwise>
                                    </c:choose>
                                    <li class="list"></li>
                                </ul>
                        </a>
                            </div>
                    </c:forEach>
                </div>
                <a class="next" onclick="plusSlides(5)">&#10095;</a>
            </div>
        </div>
    </section>
    <section class="mSection">
        <div class="mobile-searchArea">
            <select id="mobile-rentType">
                <option selected>전체</option>
                <c:forEach items="${rentList}" var="deal">
                    <option>${deal.dealRentType}</option>
                </c:forEach>
            </select>
            <select id="mobile-apartmentType">
                <option selected>전체</option>
                <c:forEach items="${aptList}" var="deal">
                    <option>${deal.dealApartmentType}</option>
                </c:forEach>
            </select>
            <input type="text" name="keyword" id="mobile-searchBar" placeholder="전체로 검색하기">
            <input type="button" onclick="checkValues()" value="검색">
        </div>
        <div class="bannerArea"></div>
        <c:import url="mobileSlide.jsp"></c:import>
    </section>
    <c:import url="footer.jsp"/>
    <c:import url="mNavi.jsp"></c:import>
</div>
</div>
<script type="text/javascript" src="script/dealValidation.js"></script>
</body>
</html>
