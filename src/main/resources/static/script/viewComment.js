const urlArr = new Array();
// const urlArr = [null, null, null];

// <sec:authorize access="isAuthenticated()"/> _ header

async function getComments() {
    const dealCode = document.getElementById("deal").value;
    const commentContent = document.getElementById("comment-content");
    commentContent.value = "";

    try {
        const comments = await $.ajax({
            url: `comments/${dealCode}`,
            method: "GET",
            timeout: 0,
        });

        $('#commentList').empty();

        for (const comment of comments) {
            const response = await $.ajax({
                url: `getUser?code=${comment.userCode}`,
                method: "GET",
                timeout: 0,
            });

            sessionStorage.setItem("profileImage", response.userProfileImage);

            const image1 = comment.commentImage1;
            const image2 = comment.commentImage2;
            const image3 = comment.commentImage3;

            const modifiedAt = comment.modifiedAt;
            const modifiedDate = modifiedAt.substring(0, 10);
            const modifiedTime = modifiedAt.substring(11);

            const imageAreaSource =
                image1 === null
                    ? ""
                    : image2 === null
                        ? `<img src="${comment.commentImage1}" class="commentImage"/><div id="xbox1">X</div>`
                        : image3 === null
                            ? `<img src="${comment.commentImage1}" class="commentImage"/> <img src="${comment.commentImage2}" class="commentImage" />`
                            : `<img src="${comment.commentImage1}" class="commentImage"/>
             <img src="${comment.commentImage2}" class="commentImage" />
             <img src="${comment.commentImage3}" class="commentImage" />`;

            $('#commentList').append(`
        <div id="comment${comment.commentCode}">
          <div class="imageArea">
            ${imageAreaSource}
          </div>
          <div class="profileArea">
            <img class="profile-image" src="${sessionStorage.getItem(`profileImage`)}" />
          </div>
          <p>${comment.userName} : ${comment.commentContent}</p>
          <p>${modifiedDate} ${modifiedTime}</p>
          <button class="modifyBtn" onclick=modifyCommentStart(${comment.commentCode})>수정</button>
          <button class="deleteBtn" onclick=deleteComment(${comment.commentCode})>삭제</button>
        </div>
      `);
        }
    } catch (error) {
        console.error('Error retrieving comments:', error);
    }
}

function createsComment() {

    const commentContent = document.getElementById("comment-content");
    const textContent = commentContent.value;
    if (commentContent.value === "") {
        console.log("no");
        alert("내용을 작성해주세요");
        // window.location.reload();
        // return;
    } else {
        uploadImages(textContent);
    }
}

function updateComment(code) {
    const commentContent = document.getElementById("comment-content");
    const textContent = commentContent.value;
    console.log(textContent);
    if (commentContent.value === "") {

        alert("내용을 작성해주세요");
        // window.location.reload();
        // return;
    } else {
        updateImages(textContent, code);
    }
}

function uploadImages(text) {
    const image = document.getElementById("image");
    console.log("image : " + image);
    image.value="";

    const files = image.files;
    const imageCount = files.length;
    if (imageCount > 3) {
        alert("사진은 3개까지만 등록할 수 있습니다")
        const fileUpload = document.getElementById("image");
        fileUpload.value = null;
        return;
    }

    if (imageCount > 0) {
        for (let i = 0; i < files.length; i++) {
            let formData = new FormData();
            formData.append("file", files[i]);

            $.ajax({
                url: 'comment/images',
                type: 'POST',
                data: formData,
                contentType: false,
                processData: false,
                async: false
            }).done(response => {
                console.log('response : ', response)
                console.log('typeof response : ', typeof response)
                urlArr.push(response.toString());
            });
        }
    } else {
        for (let i = 0; i < files.length; i++) {
            let formData = new FormData();
            formData.append("file", files[i]);

            $.ajax({
                url: 'comment/images',
                type: 'POST',
                data: formData,
                contentType: false,
                processData: false,
                async: false
            }).done(response => {
                console.log('response : ', response)
                console.log('typeof response : ', typeof response)
                urlArr.push(null);
            });
        }
    }
    uploadComment(text);
    text.innerText = "";
}


function updateImages(text, code) {
    const image = document.getElementById("image");
    console.log("image : " + image);
    console.log("code : " + code);
    console.log("text : " + text);
    image.value="";

    const files = image.files;
    const imageCount = files.length;
    if (imageCount > 3) {
        alert("사진은 3개까지만 등록할 수 있습니다")
        const fileUpload = document.getElementById("image");
        fileUpload.value = null;
        return;
    }

    if (imageCount > 0) {
        for (let i = 0; i < files.length; i++) {
            let formData = new FormData();
            formData.append("file", files[i]);

            $.ajax({
                url: 'comment/images',
                type: 'POST',
                data: formData,
                contentType: false,
                processData: false,
                async: false
            }).done(response => {
                console.log('response : ', response)
                console.log('typeof response : ', typeof response)
                urlArr.push(response.toString());
            });
        }
    } else {
        for (let i = 0; i < files.length; i++) {
            let formData = new FormData();
            formData.append("file", files[i]);

            $.ajax({
                url: 'comment/images',
                type: 'POST',
                data: formData,
                contentType: false,
                processData: false,
                async: false
            }).done(response => {
                console.log('response : ', response)
                console.log('typeof response : ', typeof response)
                urlArr.push(null);
            });
        }
    }
    finalComment(text, code);
    text.innerText = "";
}

function uploadComment(text) {
    const userCode = document.getElementById("userCode").value;
    const userName = document.getElementById("userName").value;
    const dealCode = document.getElementById("deal").value;
    console.log('urlArr : ', urlArr);
    console.log("배열 길이 : " + urlArr.length);

    const uploadedComment = {
        "url": "comment",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "userCode": userCode,
            "userName": userName,
            "commentContent": text,
            "dealCode": dealCode,
            "commentImage1": urlArr[0],
            "commentImage2": urlArr[1],
            "commentImage3": urlArr[2]
        }),
    };


    $.ajax(uploadedComment).done(function (response) {
        console.log("dd end : " + response);
        urlArr.length = 0;
        getComments();
    });
}

function finalComment(text, code) {
    const userCode = document.getElementById("userCode").value;
    const userName = document.getElementById("userName").value;
    const dealCode = document.getElementById("deal").value;
    console.log('urlArr : ', urlArr);
    console.log("배열 길이 : " + urlArr.length);
    console.log(code);

    const uploadedComment = {
        "url": "update",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "commentCode": code,
            "dealCode": dealCode,
            "userCode": userCode,
            "userName": userName,
            "commentContent": text,
            "commentImage1": urlArr[0],
            "commentImage2": urlArr[1],
            "commentImage3": urlArr[2]
        }),
    };


    $.ajax(uploadedComment).done(function (response) {
        console.log("dd end : " + response);
        urlArr.length = 0;
        getComments();
    });
}

// function readURL(input) {
//     if (input.files && input.files[0]) {
//         let reader = new FileReader();
//         reader.onload = function(e) {
//             document.getElementById('imagePreview').src = e.target.result;
//             document.getElementById('imagePreview').style.display = 'block';
//         }
//         reader.readAsDataURL(input.files[0]);
//     } else {
//         document.getElementById('imagePreview').style.display = 'none';
//     }
// }
//
// const content = $().val();
// $.ajax({
//     "url": '',
//     "type": 'GET',
//     "timeout": 0
// }).done(() => {
//     $('#').val('');
// })
// }


// 수정
let isModified = false;
// function modifyComment(code) {
//     if (!isModified) {
//         isModified = true;
//         $(`#content${code}`).attr('readonly', false);
//     } else {
//         isModified = false;
//         $(`#content${code}`).attr('readonly', true);
//
//         const commentContent = $(`#content${code}`).val();
//
//         private int commentCode;
//         private int dealCode;
//         private String userCode;
//         private String userName;
//         private String commentContent;
//         private String commentImage1;
//         private String commentImage2;
//         private String commentImage3;
//         private Timestamp createdAt;
//         private Timestamp modifiedAt;
//
//         $.ajax({
//             "url": "update",
//             "method": "PUT",
//             "timeout": 0,
//             "headers": {
//                 "Content-Type": "application/json"
//             },
//             "data": JSON.stringify({
//                 "commentCode": code,
//                 "commentContent": commentContent
//             }),
//         }).done(function (response) {
//             console.log(response);
//         });
//     }
// }

// function modifyImage(element, commentCode, imageField) {
//     const image = element.src;
//     const form = document.getElementById('commentForm');
//     const content = document.getElementById('comment-content');
//     const modifyField = document.createElement("input");
//     modifyField.setAttribute("type", "hidden");
//     modifyField.setAttribute("name", "modifiedImages");
//     modifyField.setAttribute("value", image);
//
//     form.appendChild(modifyField);
//     content.value = "";
//     deleteComment(commentCode);
// }

function modifyCommentStart(code) {
    document.getElementById(`comment${code}`).remove();
    $("#content"+code).remove();/////////
    const form = document.getElementById('commentForm');
    const content = document.getElementById('comment-content');
    form.action = "update";
    const button = document.getElementById('register');
    button.onclick = function() {
        updateComment(code);
    };
    // const commentId = `#comment${code}`;
    //  $(commentId).remove(); // remove the original comment
    // const form = document.getElementById('commentForm');
    // const content = document.getElementById('comment-content');
    // form.action = "modifyComment";

    $.ajax({
        "url": `comment/${code}`,
        "method": "GET",
        "timeout": 0,
    }).done(function (comments) {
        content.value = comments.commentContent;
        console.log(content.commentContent);
        console.log(content.value);
        const div = document.createElement("div");
        const input = document.createElement("input");
        input.setAttribute("type", "hidden");
        input.setAttribute("id", "modify");
        input.setAttribute("value", `${code}`);

        let image1;
        let image2;
        let image3;
        if (comments.commentImage1) {
            image1 = document.createElement("img");
            image1.src = comments.commentImage1;
            image1.setAttribute("onclick", `modifyImage(this, ${code}, 'commentImage1')`);
            div.append(image1);
        }
        //     if (comments.commentImage1 !== null) {
        //         image1 = document.createElement("img");
        //         image1.src = comments.commentImage1;
        //         div.append(image1);
        //     }

        if (comments.commentImage2) {
            image2 = document.createElement("img");
            image2.src = comments.commentImage2;
            image2.setAttribute("onclick", `modifyImage(this, ${code}, 'commentImage2')`);
            div.append(image2);
        }
        //     if (comments.commentImage2 !== null) {
        //         image2 = document.createElement("img");
        //         image2.src = comments.commentImage2;
        //         div.append(image2);
        //     }

        if (comments.commentImage3) {
            image3 = document.createElement("img");
            image3.src = comments.commentImage3;
            image3.setAttribute("onclick", `modifyImage(this, ${code}, 'commentImage3')`);
            div.append(image3);
        }
        //     if (comments.commentImage3 !== null) {
        //         image3 = document.createElement("img");
        //         image3.src = comments.commentImage3;
        //         div.append(image3);
        //     }


        // div.append(input);
        $('#commentArea').append(div);
    });
}


// function modifyComment(htmlForm) {
//     if (!isModified) {
//         isModified = true;
//         $(`#content${code}`).attr('readonly', false);
//     } else {
//         isModified = false;
//         $(`#content${code}`).attr('readonly', true);
//
//         const commentContent = $(`#content${code}`).val();
//
//         $.ajax({
//             "url": "update",
//             "method": "PUT",
//             "timeout": 0,
//             "headers": {
//                 "Content-Type": "application/json"
//             },
//             "data": JSON.stringify({
//                 "commentCode": 'code',
//                 "commentContent": commentContent
//             }),
//         }).done(function (response) {
//             console.log(response);
//         });
//     }
// }

// 삭제
function deleteComment(commentCode) {
    if (confirm("삭제하면 복구할 수 없습니다.")) {
        $.ajax({
            "url": `remove?commentCode=${commentCode}`,
            "method": "GET",
            "timeout": 0,
        }).done(() => {
            $(`#comment${commentCode}`).remove();
        })
    }
}


// function fetchAndDisplayComments() {
//     const comments = [
//         'comment1.',
//         'comment2.',
//         'comment3.'
//     ];
//
// //이전 댓글 초기화하는데 이부분은 기존댓글 데이터 넣어도 됨
//     commentsList.innerHTML = '';
//
// //appendChild로  일단 배열에 추가
//     comments.forEach(function(comment) {
//         const listItem = document.createElement('li');
//         listItem.textContent = comment;
//         commentsList.appendChild(listItem);
//     });
//
//     commentsContainer.style.display = `block`;
// }
//
// showCommentsButton.addEventListener('click', fetchAndDisplayComments);
//
// // html onclick속성 자바스크립트
// <div className="col-md-5" id="noneDiv" style="display: none;"></div>
// <button onClick="onDisplay()">숨은 DIV보이기</button>
// <button onClick="offDisplay()">DIV 숨기기</button>
// <script>
//     function onDisplay() {
//     $('#noneDiv').show();
//     }
//     function offDisplay() {
//     $('#noneDiv').hide();
//     }
// </script>
// // JQuery 클릭이벤트
//
// <div className="col-md-5" id="noneDiv" style="display: none;"/>
// <button id="onDisplay">숨은 DIV보이기</button>
// <button id="offDisplay">DIV 숨기기</button>
// <script>
//     $(function(){
//         $('#onDisplay').click(function () {
//             if ($("#noneDiv").css("display") == "none") {
//                 $('#noneDiv').show();
//                 }
//         });
//     });
// </script>
// <script>
//     $(function(){
//     $('#offDisplay').click(function () {
//         if ($("#noneDiv").css("display") != "none") {
//             $('#noneDiv').hide();
//         }
//     });
// });
// </script>

// 댓글 작성 상자
// function commentBox() {
//     $('.comment-write').append()(
//         `<h5>Leave a Comment !</h5>
//         <div>
//             <textarea id="comment_content" name="comment_content" rows="5" cols="100"
//             placeholder="댓글을 입력하세요!"></textarea>
//             <button id="comment-button">등록</button>
//         </div>`
//     )
// }