function leaveCheck(htmlForm) {
    const userPassword = document.getElementById("userPassword").value;
    const passwordCheck = document.getElementById("passwordCheck").value;

    if(userPassword === passwordCheck){
        $.ajax({
            "url" : "/deleteProc",
            "type" : "Get",
            "Content-Type": "application/json;charset=UTF-8",
            "success" : function(){
                    alert('회원 탈퇴가 완료되었습니다');
                    location.href = "/";
            }
        });
    }

    else {
        alert('비밀번호가 일치하지 않습니다');
        $('#userPassword').focus();
    }
}
