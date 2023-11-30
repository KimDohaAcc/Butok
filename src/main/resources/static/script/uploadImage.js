function fileUpload() {
    const profileImage = document.getElementById("userProfileImage");
    const fileType = profileImage.value.split(".");

    if(fileType[1] === "jpg" || fileType[1] === "jpeg" || fileType[1] === "png"){
        let formData = new FormData();
        const file = profileImage.files;
        formData.append("file", file[0]);

        $.ajax({
            url : '/upload',
            type : 'POST',
            data : formData,
            contentType : false,
            processData : false
        }).done(response => {
            alert('사진이 업로드 되었습니다!')
            location.href = "/myPage";
        });
    }

    else {
        alert('jpg, jpeg, png 타입의 파일만 올릴 수 있습니다');
    }
}

function readURL(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('imagePreview').src = e.target.result;
            let preview =  document.querySelector('.imagePreview');
            preview.style.display = 'flex';
            preview.style.flexFlow = 'wrap column';
            preview.style.alignItems = 'center';
            preview.style.justifyContent = 'center';
            let style = document.createElement('style');
            style.innerHTML = `@media (max-width: 480px) { .imagePreview { display: flex; flex-flow: wrap column; align-items: center; justify-content: center; align-content: flex-start; } 
            #imageForm {align-self: flex-start; margin-left: 40px;}}`;
            document.head.appendChild(style);
        }
        reader.readAsDataURL(input.files[0]);
    } else {
        document.querySelector('.imagePreview').style.display = 'none';
    }
}

document.getElementById('userProfileImage').addEventListener('change', function() {
    readURL(this);
});

document.getElementById('userProfileImage').addEventListener('change', function() {
    readURL(this);
});
