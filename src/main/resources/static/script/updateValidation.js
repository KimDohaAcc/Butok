let url = "myPage?";

function checkValues(htmlForm) {
    if (checkBlank()) {
        htmlForm.submit();
    } else {
        location.href = url;
    }
}

function checkBlank() {
    const userPasswordPreCheck = document.getElementById("userPasswordPreCheck").value;
    const userPassword = document.getElementById("userPassword").value;
    const passwordCheck = document.getElementById("passwordCheck").value;
    let userPasswordPre = "";

    let check = true;
    if (userPassword === "") {
        alert("수정할 비밀번호를 입력해주세요")
        check = false;
    } else if (check && passwordCheck === "") {
        alert("비밀번호 확인을 입력해주세요")
        check = false;
    } else if (check && passwordCheck !== userPassword) {
        alert("비밀번호가 일치하지 않습니다")
        check = false;
    } else if (check && userPasswordPre === "") {
        $.ajax({
            "url": "/passwordCheck",
            "type": "GET",
            "data": {
                password: userPasswordPreCheck
            },
            "Content-Type": "application/json;charset=UTF-8",
            "async" : false
        }).done(result => {
            if (!result) {
                alert("현재 비밀번호가 올바르지 않습니다")
                check = false;
            } else {
                userPasswordPre = userPasswordPreCheck;
            }
        });
    }

    if (check && userPasswordPre !== "") {
        $.ajax({
            "url": "/passwordCheck",
            "type": "GET",
            "data": {
                password: userPassword
            },
            "Content-Type": "application/json;charset=UTF-8",
            "async" : false
        }).done(result => {
            if (result) {
                alert("현재 비밀번호와 변경할 비밀번호가 일치합니다")
                check = false;
            }
        });
    }

    return check;
}
