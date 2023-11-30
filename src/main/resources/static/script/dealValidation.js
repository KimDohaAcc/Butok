let slideIndex = 0;
showSlides(slideIndex);

getCount();

function plusSlides(n) {
    showSlides(slideIndex + n);
}

function showSlides(n) {
    let slides = document.getElementsByClassName("slide-wrapper")[0].getElementsByTagName("div");
    if (n > slides.length - 5) {
        slideIndex = slides.length - 5;
    } else if (n < 0) {
        slideIndex = 0;
    } else {
        slideIndex = n;
    }
    for (let i = 0; i < slides.length; i++) {
        if (i < slideIndex || i >= slideIndex + 5) {
            slides[i].style.display = "none";
        } else {
            slides[i].style.display = "block";
        }
    }
}

function getCount(code) {
    for (let i = 0; i < $(".dealCode").length; i++) {
        let code = $(".dealCode")[i].value;
        $.ajax({
            url: `interests/count?code=${code}`,
            method: "GET",
            timeout: 0
        }).done(function (response) {
            $(".list")[i].textContent = `${response}명의 회원들이 관심가지는 매물입니다!`;
        });
    }
}
    function checkValues() {
    const width = window.innerWidth;

    if(width>480) {
        const rentType = document.getElementById('rentType');
        const apartmentType = document.getElementById('apartmentType');

        const search = document.getElementById('searchBar');

        let url = `detailSearch?keyword=${search.value}&rentType=${rentType.value}&aptType=${apartmentType.value}`;
        const checkBox = document.getElementById("checkBox");
        if (checkBox && checkBox.checked) {
            url += '&checked=checked';
        } else {
            if (rentType.value === "전체" && apartmentType.value === "전체") {
                url += '&checked=checked';
            } else {
                url += '&checked=notCheck';
            }
        }
        location.href = url;
    } else {
        const rentType = document.getElementById('mobile-rentType');
        const apartmentType = document.getElementById('mobile-apartmentType');

        const search = document.getElementById('mobile-searchBar');

        let url = `detailSearch?keyword=${search.value}&rentType=${rentType.value}&aptType=${apartmentType.value}`;
        const checkBox = document.getElementById("checkBox");
        if (checkBox !== null) {
            let checkBoxValue = checkBox.checked;
            if (checkBoxValue) {
                url += '&checked=checked';
            } else {
                url += '&checked=notCheck';
            }
        }
        location.href = url;
    }
}
