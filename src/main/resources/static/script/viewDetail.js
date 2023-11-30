const detailView = document.getElementById("detailView");
const chartDiv = document.getElementById("chart_div");
const chartTitle = document.getElementById("chart_title");
const monthlyRentList = document.getElementById("montyRentList");
let apartName = "";
let totalPages;
google.charts.load('current', {packages: ['corechart', 'line']});

function createDetailView(dealCode) {
    const detailArea = document.getElementById("detailArea");
    const commentArea = document.getElementById("commentArea");

    $('#commentList').innerHTML = "";

    detailArea.style.display = "flex";
    if (commentArea) {
        commentArea.style.display = "none";
    }

    monthlyRentList.innerHTML = "";

    $.ajax({
        "url": `detailView?code=${dealCode}`,
        "method": "GET",
        "timeout": 0
    }).done(response => {
        apartName = response.dealApartmentName;
        printInfo(response);
        drawChart(response);
        markIsSmart(response);
        countComment(dealCode);

        $.ajax({
            url: `getMonthlyFeeList?rentName=${response.dealApartmentName}&page=0`,
            method: "GET",
            timeout: 0
        }).done(rent => {
            console.log(rent)
            totalPages = rent.totalPages;
            printRentInfo(rent);
            if(rent.content.length > 0){
                let lastPage = totalPages > 5 ? 5 : totalPages;
                createPages(1, lastPage);
            }
        });
    });
}

function drawBackgroundColor(response) {
    const ave2020 = parseInt(response.dealAverage2020);
    const ave2021 = parseInt(response.dealAverage2021);
    const ave2022 = parseInt(response.dealAverage2022);
    const ave2023 = parseInt(response.dealAverage2023);

    const data = new google.visualization.DataTable();
    data.addColumn('string', 'Year');
    data.addColumn('number', '거래가격');

    data.addRows([
        ['2020', ave2020],
        ['2021', ave2021],
        ['2022', ave2022],
        ['2023', ave2023]
    ]);

    const options = {
        title: `${response.dealApartmentName}(평균 실거래가)`,
        hAxis: {title: 'Year', titleTextStyle: {color: '#333'}},
        vAxis: {minValue: 0}
    };
    const chart = new google.visualization.AreaChart(chartDiv);
    chart.draw(data, options);
}

function printInfo(response) {
    const address = `${response.dealGu} ${response.dealDong} ${response.dealBonbun}-${response.dealBubun}`;
    let price
        = response.dealMonthlyRent > 0 ?
        `${response.dealDeposit}/${response.dealMonthlyRent}(만원)` :
        `${response.dealDeposit}(만원/전세)`;
    let contractDate = `${response.dealContractDate.substring(0, 4)}년 ${response.dealContractDate.substring(4, 6)}월 ${response.dealContractDate.substring(6, 8)}일`

    const detailInfo
        =
        `
            <input type="hidden" id="deal" value="${response.dealCode}">
            <h2>${response.dealApartmentName}<br>(${response.dealApartmentType})</h2>
            <div class="areaInfo">
                <span>서울특별시 ${address} ${response.dealFloor}층<br>(${response.dealPyeong}평) (${response.dealRentArea}m³)</span>
            </div>
            <div class="priceInfo">
                <span>${response.dealRentType} ${price}</span>
            </div>
            <div class="otherInfo">
                <span>건축연도: ${response.dealBuildYear}년</span>
                <br />
                <span>계약일: ${contractDate}</span>
            </div>
            <div class="like">
                <i id="heart" class="fi fi-rr-heart" onclick="checkInterests()"></i> 관심있어요
                <p><span id="countOfInterests"></span>명의 회원들이 이 매물에 관심있어요!</p>
            </div>
            `

    detailView.innerHTML = detailInfo;
    setInterestsInfo();
    // getComments();
}

function drawChart(response) {
    chartTitle.innerText = "실거래가(전세)";
    const ave2020 = parseInt(response.dealAverage2020);
    const ave2021 = parseInt(response.dealAverage2021);
    const ave2022 = parseInt(response.dealAverage2022);
    const ave2023 = parseInt(response.dealAverage2023);
    if (ave2020 === 0 && ave2021 === 0 && ave2022 === 0 && ave2023 === 0) {
        chartDiv.innerHTML="";
        const noRentImg = document.createElement("img");
        noRentImg.setAttribute("src", "../image/nodata.png");
        noRentImg.className = "noRentImg";
        chartDiv.appendChild(noRentImg);
    } else {
        google.charts.load('current', {packages: ['corechart', 'line']});
        google.charts.setOnLoadCallback(drawBackgroundColor(response));
    }
}

function printRentInfo(rent) {
    rent = rent.content;

    const title = document.getElementById("title");
    title.innerText = "실거래가(월세)";

    let amount = rent.length;
    let listCnt = 0;
    const userCode = document.getElementById("userCode");
    const monthlyListBox = document.createElement('div');
    monthlyListBox.setAttribute("id", "monthlyListBox");
    listCnt = amount >= 5 ? 5 : amount;
    if (amount === 0) {
        const noRentImg = document.createElement("img");
        noRentImg.setAttribute("src", "../image/nodata.png");
        noRentImg.className = "noRentImg";
        monthlyListBox.prepend(noRentImg);
    } else {
        for (let i = 0; i < listCnt; i++) {
            const monthlyRent = document.createElement("div");
            monthlyRent.setAttribute("class", "monthlyRent");
            let contractDate = `${rent[i].rentContractDate.substring(0, 4)}년 ${rent[i].rentContractDate.substring(4, 6)}월 ${rent[i].rentContractDate.substring(6, 8)}일`

            const list = `
            <ul>
                <li>${rent[i].rentPyeong}평형 (${rent[i].rentArea}m³) / ${rent[i].rentFloor}층</li>
                <li>${rent[i].rentDeposit} / ${rent[i].rentMonthlyFee} (만원)</li>
                <li>${contractDate} 계약</li>
            </ul>
            `
            monthlyRent.innerHTML = list;
            monthlyListBox.prepend(monthlyRent);
            amount --;
        }
        if (!userCode && amount > 5) {
            const viewMoreMsg = document.createElement("p");
            viewMoreMsg.innerText = "로그인 하시면 더욱 많은 매물 정보를 보실 수 있습니다.";
            viewMoreMsg.setAttribute("id", "viewMoreMsg");
            monthlyListBox.append(viewMoreMsg);
        }
    }
    monthlyRentList.prepend(monthlyListBox);
}

function createPageList(startPage, lastPage) {
    const loginCheck = document.getElementById("userCode");
    const pageBox = document.getElementById('pageBox');
    for (let i = startPage; i <= lastPage; i++) {
        let li = document.createElement('li');
        li.textContent = i;
        if(!loginCheck){
            li.addEventListener('click', () => {
                location.href='login'
            });
        }

        else {
            li.addEventListener('click', () => {
                pageBox.parentNode.firstElementChild.remove();
                $.ajax({
                    url: `getMonthlyFeeList?rentName=` + apartName + `&page=` + (i-1),
                    method: "GET",
                    timeout: 0
                }).done(rent => {
                    printRentInfo(rent);
                });
            });
        }
        pageBox.appendChild(li);
    }
}

function createMorePage(startPage, lastPage){
    const pageBox = document.getElementById('pageBox');
    const loginCheck = document.getElementById("userCode");
    const pagePlusCheck = document.getElementById('pagePlus');
    if(totalPages > lastPage && !pagePlusCheck){
        const pagePlus = document.createElement('li');
        pagePlus.textContent = '>';
        pagePlus.setAttribute("id", "pagePlus");

        if(!loginCheck){
            pagePlus.addEventListener('click', () => {
                location.href='login'
            });
        }

        else {
            pagePlus.addEventListener('click', () => {
                pageBox.remove();
                startPage += 5;
                lastPage = totalPages <= lastPage + 5 ? totalPages : lastPage + 5;
                createPages(startPage, lastPage);
            })
        }
        pageBox.appendChild(pagePlus);
    }
    return [startPage, lastPage];
}

function createBackPage(startPage, lastPage){
    const loginCheck = document.getElementById("userCode");
    const pageBox = document.getElementById('pageBox');
    const pageBackCheck = document.getElementById('pageBack');
    if(loginCheck && startPage > 1 && !pageBackCheck){
        const pageBack = document.createElement('li');
        pageBack.textContent = '<';
        pageBack.setAttribute("id", "pageBack");

        pageBack.addEventListener('click', () => {
            pageBox.remove();
            startPage -= 5;
            lastPage = lastPage % 5 === 0 ? lastPage - 5 : lastPage - (lastPage % 5);
            const pageInfo = createPages(startPage, lastPage);
            startPage = pageInfo[0];
            lastPage = pageInfo[1];
        })
        pageBox.prepend(pageBack);
    }
    return [startPage, lastPage];
}


function createPages(startPage, lastPage) {
    let pageBox = document.createElement('ul');
    pageBox.setAttribute("id", "pageBox")
    monthlyRentList.appendChild(pageBox);
    const pageInfo = createPagesContinue(startPage, lastPage);
    return pageInfo;
}

function createPagesContinue(startPage, lastPage){
    createPageList(startPage, lastPage);
    let pageInfo =  createMorePage(startPage, lastPage);
    pageInfo = createBackPage(pageInfo[0], pageInfo[1]);
    return pageInfo;
}

function markIsSmart(response) {
    const rentType = response.dealRentType;
    if (rentType === "전세") {
        const dealAverage2023 = parseInt(response.dealAverage2023);
        const dealAverage2022 = parseInt(response.dealAverage2022);
        const dealAverage2021 = parseInt(response.dealAverage2021);
        const dealAverage2020 = parseInt(response.dealAverage2020);
        const dealAvgArr = [dealAverage2020, dealAverage2021, dealAverage2022, dealAverage2023];

        const detailView = document.getElementById("detailView");
        const markImage = document.createElement("img");
        markImage.className = "markImages";
        let dangerCount = 0;

        for (let i = 1; i < dealAvgArr.length; i++) {
            if ((dealAvgArr[i] > dealAvgArr[i - 1] * 1.15 || dealAvgArr[i] < dealAvgArr[i - 1] * 0.85) && (dealAvgArr[i]!==0 && dealAvgArr[i-1]!==0)) {
                dangerCount += 1;
            }
        }

        if (dangerCount >= 2) {
            markImage.src = "image/부바.png";
        } else if (dangerCount === 0) {
            markImage.src = "image/부똑이매물.png";
        }

        detailView.appendChild(markImage);
    }
}

function countComment(dealCode) {
    $.ajax({
        "url": `comment/count?code=${dealCode}`,
        "method": "GET",
        "timeout": 0
    }).done(response => {
        console.log("count: " + response);
        //$('#commentBtn').innerHTML = `${response}개의 댓글 보기`
        $('#commentBtn').html(`${response}개의 댓글 보기`);
    });
}