<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<html>
<head>
  <link rel="stylesheet" href="css/mobileGrid.css">
  <link rel="stylesheet" href="css/resultList.css">
  <link rel="stylesheet" href="css/overlay.css">
  <link rel="stylesheet" href="css/viewDetail.css">
  <link rel='stylesheet' href='https://cdn-uicons.flaticon.com/uicons-regular-rounded/css/uicons-regular-rounded.css'>
  <link rel='stylesheet' href='https://cdn-uicons.flaticon.com/uicons-solid-rounded/css/uicons-solid-rounded.css'>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
  <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
  <title>detailMap</title>
</head>
<body>
<section>
  <sec:authorize access="hasAuthority('USER')">
    <sec:authentication property="principal" var="principal"/>
    <c:set var="user" value="${principal.user}"/>
    <input type="hidden" id="userCode" value="${user.getUserCode()}">
    <input type="hidden" id="userName" value="${user.getUserName()}">
    <c:set var="checked" value="${param.checked == null || param.checked.equals('checked')? 'checked' : ''}"/>
  </sec:authorize>
  <div id="sideBar">
    <div class="search">
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
      <sec:authorize access="isAuthenticated()">
        <div id="myPreference">
          <input id="checkBox" type="checkbox" ${checked}>
          <span>나의 선호로 보기</span>
        </div>
      </sec:authorize>
    </div>
    <div id="detailArea">
      <div class="btnArea">
        <button id="closeBtn" onclick="detailSearchBtns()">X</button>
      </div>
      <div id="detailView"></div>
      <div id="commentBtnArea">
        <button id="commentBtn" onclick="openCommentArea()"></button>
      </div>
      <h2 id="chart_title"></h2>
      <div id="chart_div"></div>
      <h2 id="title"></h2>
      <div id="montyRentList"></div>
    </div>
  </div>
  <sec:authorize access="isAuthenticated()">
    <div id="commentArea">
      <div class="btnArea">
        <button id="closeBtn2" onclick="detailSearchBtns()">X</button>
      </div>
      <form id="commentForm" method="post" action="comment" enctype="multipart/form-data">
        <input type="file" accept=".jpg, .jpeg, .png" name="commentImage1" id="image" multiple/>
        <textarea name="commentContent" id="comment-content"></textarea><br>
        <div id="img-box">
          <sec:authentication property="principal" var="principal"/>
          <input type="hidden" value="${principal.user.getUserProfileImage()}">
        </div>
        <input type="button" id="register" onclick="createsComment()" value="등록">
      </form>
      <div id="commentList" class="comments"></div>
    </div>
  </sec:authorize>
  <div id="map"/>
</section>
<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=58c87a15f149883419fb61dbeb688ab3&libraries=services,clusterer,drawing"></script>
<script type="text/javascript" src="script/createDetailMap.js" ></script>
<script type="text/javascript" src="script/viewSearch.js"></script>
<script type="text/javascript" src="script/viewDetail.js"></script>
<script type="text/javascript" src="script/viewComment.js"></script>
<script type="text/javascript" src="script/detailSearchBtns.js"></script>
<script type="text/javascript" src="script/addInterests.js"></script>
</body>
</html>
