<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <link rel="stylesheet" href="css/grid.css">
    <link rel="stylesheet" href="css/mobileGrid.css">
    <link rel="stylesheet" href="css/viewDetail.css">
    <link rel="icon" href="https://em-content.zobj.net/thumbs/240/google/350/nerd-face_1f913.png"/>
    <title>Title</title>
</head>
<body>
    <div class="container">
        <c:import url="header.jsp" />
        <c:import url="mHeader.jsp" />
        <section class="section">
            <div id="listDiv"></div>
        </section>
        <section class="mSection">
            <div id="mlistDiv"></div>
        </section>
        <c:import url="footer.jsp" />
        <c:import url="mNavi.jsp" />
    </div>
    <script type="text/javascript" src="script/myInterests.js"></script>
</body>
</html>
