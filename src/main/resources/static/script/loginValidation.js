function loginCheck(htmlForm) {
    let url = "loginPage?";

    const userId = document.getElementById("userId").value;
    const userPassword = document.getElementById("userPassword").value;

    let check = true;
    let alertRing = true;

    if (alertRing && userId !== "") {
        url += "&userId=" + userId;
    }

    else {
        alert('아이디를 입력해주세요');
        alertRing = false;
        check = false;
    }

    if (alertRing && userPassword !== "") {
        url += "&userPassword=" + userPassword;
    }

    else {
        alert('비밀번호를 입력해주세요');
        check = false;
    }

    if (check) {
       htmlForm.submit();
    }

    else {
        location.href = url;
    }
}