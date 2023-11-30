const interestsList = [];
let listDiv = document.getElementById("listDiv");
if(window.innerWidth<=480) {
    listDiv = document.getElementById("mlistDiv");
}

const userCode = new URL(window.location.href).searchParams.get("code");

const settings = {
    "url": `interests?code=${userCode}`,
    "method": "GET",
    "timeout": 0,
    "headers": {
        "Cookie": "JSESSIONID=1869C3C45E51C48A858E49657923737B"
    },
};
$.ajax(settings).done(function (response) {

    for(let i=0; i<response.length; i++) {
        interestsList.push(response[i]);
        const address = `서울특별시 ${response[i].dealGu} ${response[i].dealDong} ${response[i].dealBonbun}-${response[i].dealBubun}`;
        const contractDate = `${response[i].dealContractDate.substring(0, 4)}년 ${response[i].dealContractDate.substring(4, 6)}월 ${response[i].dealContractDate.substring(6, 8)}일`

        const contentInfo
        =
            `
            <h2>${response[i].dealApartmentName} (${response[i].dealApartmentType })</h2>
            <div class="areaInfo">
                <span>${address} ${response[i].dealFloor}층<br>
                (${response[i].dealPyeong }평) (${response[i].dealRentArea }m³)</span>
            </div>
            <div class="priceInfo">
                <span>${response[i].dealRentType} ${response[i].dealDeposit}/${response[i].dealMonthlyRent}(만원)</span>
            </div>
            <div class="otherInfo">
                <span>${response[i].dealBuildYear }년 건축</span>
                <span>${contractDate } 계약</span>
            </div>
            `;

        const cards = document.createElement("div");
        cards.setAttribute("class", "cards");
        cards.innerHTML = contentInfo;

        listDiv.appendChild(cards);
    }

    if(response.length === 0){
        const empty = document.createElement("img");
        empty.setAttribute("src", "../image/관심목록없음.png");
        listDiv.appendChild(empty);
    }
});

let slideIndex = 0;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex + n);
}

function showSlides(n) {
    let slides = document.getElementById("listDiv").getElementsByTagName("div");
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