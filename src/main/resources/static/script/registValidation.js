let url = "regist?";

function checkValues(htmlForm){
    if (checkBlank()) {
        const userId = document.getElementById("userId").value;
        if (userId !== "") {
            $.ajax({
                "url": "/idCheck",
                "type": "GET",
                "data": {
                    userId: userId
                },
                "Content-Type": "application/json;charset=UTF-8",
                "success": function (result) {
                    if (result) {
                        alert('중복된 아이디입니다');
                        $('#userId').focus();
                    } else {
                        htmlForm.submit();
                    }
                }
            });
        }
    }
}

function checkBlank() {
    const userId = document.getElementById("userId").value;
    const userName = document.getElementById("userName").value;
    const userPassword = document.getElementById("userPassword").value;
    const passwordCheck = document.getElementById("passwordCheck").value;

    let check = true;

    console.log("userId : " + userId);
    if(userId === "" && check){
        alert("아이디를 입력하세요");
        check = false;
    }

    else if(userId !== "") {
        url += "userId=" + userId;
    }

    if(userName === "" && check){
        alert("이름을 입력하세요");
        check = false;
    }

    else if(userName !== "") {
        url += "&userName=" + userName;
    }

    if(userPassword === "" && check){
        alert("비밀번호를 입력하세요");
        check = false;
    }

    else if(userPassword !== "") {
        url += "&userPassword=" + userPassword;
    }

    if(passwordCheck === "" && check){
        alert("비밀번호 확인을 입력해주세요")
        check = false;
    }

    else if(passwordCheck !== "") {
        url += "&passwordCheck=" + passwordCheck;
    }

    if(passwordCheck !== userPassword && check){
        alert("비밀번호가 일치하지 않습니다")
        check = false;
    }

    if(!check){
        location.href = url;
    }

    return check;
}

