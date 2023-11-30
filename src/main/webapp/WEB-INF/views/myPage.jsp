<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<html>
<head>
    <title>마이페이지</title>
    <link rel="stylesheet" href="css/myPage.css">
</head>
<body>
<div class="mypage-container">
    <c:import url="header.jsp" />
    <section>
        <div id="img-box">
            <sec:authentication property="principal" var="principal"/>
            <img src="${principal.user.userProfileImage}">
        </div>
        <div class="profile-image">
            <div class="imagePreview">
                <p>미리보기</p>
                <img id="imagePreview" src="#" alt="your image" />
            </div>
            <form method="post" name="imageForm" id="imageForm" enctype="multipart/form-data">
                <input type="file" class="buttons" accept=".jpg, .jpeg, .png" name="사진 업로드" id="userProfileImage"/>
                <label class="buttons" id="upload-button" for="userProfileImage">파일 선택</label>
                <input type="button" class="buttons" onclick="fileUpload()" value="올리기" />
            </form>
        </div>

        <form method="post" action="updateProc">
            <div class="info">
                <c:if test="${not empty param.update}">
                    <p id="update-msg">회원 정보가 업데이트 되었습니다</p>
                </c:if>
                <c:if test="${not empty param.updatePreference}">
                    <p id="update-msg">나의 선호가 업데이트 되었습니다</p>
                </c:if>
                <input type="text" name="userId" required value="${principal.user.userId}" readonly>
                <input type="text" id="userName" name="userName" required value="${principal.user.userName}" readonly>
                <input type="password" id="userPasswordPreCheck" name="userPasswordPreCheck" required placeholder="현재 비밀번호">
                <input type="password" id="userPassword" name="userPassword" required placeholder="비밀번호 변경">
                <input type="password" id="passwordCheck" name="passwordCheck" required placeholder="비밀번호 변경 확인">
                <div class="center">
                    <input type="button" class="buttons button-UD" value="수정하기" onclick="checkValues(form)">
                </div>
            </div>
        </form>
        <div class="bottom-right">
            <input type="button" class="buttons" id="preference" value="선호 다시 고르기" onclick="location.href='/preference'">
            <input type="button" class="buttons button-UD" id="leave" value="탈퇴하기" onclick="location.href='leave'">
        </div>
    </section>
    <c:import url="footer.jsp" />
</div>
<script src="script/uploadImage.js"></script>
<script src="script/updateValidation.js"></script>
</body>
</html>