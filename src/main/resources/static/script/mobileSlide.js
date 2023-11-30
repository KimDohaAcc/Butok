let mSlideIndex = 0;
showMSlides(mSlideIndex);
getMCount();

function plusMSlides(n) {
    showMSlides(mSlideIndex + n);
}
function showMSlides(n) {
    let slides = document.getElementsByClassName("mobile-slide-wrapper")[0].getElementsByTagName("div");
    if (n > slides.length - 2) {
        mSlideIndex = slides.length - 3;
    } else if (n < 0) {
        mSlideIndex = 0;
    } else {
        mSlideIndex = n;
    }
    for (let i = 0; i < slides.length; i++) {
        if (i < mSlideIndex || i >= mSlideIndex + 2) {
            slides[i].style.display = "none";
        } else {
            slides[i].style.display = "block";
        }
    }
}
function getMCount(code){
    for(let i=0;i<$(".dealCode").length;i++) {
        let code =$(".dealCode")[i].value;
        $.ajax({
            url: `interests/count?code=${code}`,
            method: "GET",
            timeout: 0
        }).done(function (response) {
            $(".mobile-List")[i].textContent = `${response}명의 회원들이 관심가지는 매물입니다!`;
        });
    }
}