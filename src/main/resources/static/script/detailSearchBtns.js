function detailSearchBtns() {
    const detailArea = document.getElementById("detailArea");
    const commentArea = document.getElementById("commentArea");

    detailArea.style.display = "none";

    if(commentArea) {
        commentArea.style.display = "none";
    }
}

function openCommentArea(){
    const commentArea = document.getElementById("commentArea");

    if(!commentArea) {
        location.href = "login";
    }

    if(commentArea.style.display === "block"){
        commentArea.style.display = "none";
    } else {
        getComments();
        commentArea.style.display = "block";
    }
}