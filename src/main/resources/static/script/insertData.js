let dealAverage2023 = 0;
let dealAverage2022 = 0;
let dealAverage2021 = 0;
let dealAverage2020 = 0;
const yearArr = [2020, 2021, 2022, 2023];
let averageArr = [dealAverage2020, dealAverage2021, dealAverage2022, dealAverage2023];
let detailurl = "http://openapi.seoul.go.kr:8088/775676556661756738394b6970554e/json/tbLnOpendataRentV/1/100/";
let count = 0;

for (let i = 0; i < 100; i++) {
    console.log("i : " + i);
    $.ajax({
        url: `http://openapi.seoul.go.kr:8088/775676556661756738394b6970554e/json/tbLnOpendataRentV/${i}/${i}/`,
        method: "GET",
        async: false
    }).done(function (response) {
        let checkdata = response.tbLnOpendataRentV.row[0].BLDG_NM + response.tbLnOpendataRentV.row[0].RENT_GBN + response.tbLnOpendataRentV.row[0].CNTRCT_DE + "/" + response.tbLnOpendataRentV.row[0].RENT_GTN + "/" + response.tbLnOpendataRentV.row[0].RENT_FEE;
        console.log(checkdata);
        checkDupl(checkdata, response);
    });
}

function checkDupl(checkdata, response) {
    let dealApartmentType = response.tbLnOpendataRentV.row[0].HOUSE_GBN_NM;
    $.ajax({
        url: `loadData?dealApartmentName=${response.tbLnOpendataRentV.row[0].BLDG_NM}`,
        method: "GET",
        async: false
    }).done(resp => {
        if (resp.length === 0 && dealApartmentType !== "단독다가구") {
            loadData(response);
        } else {
            for (let i = 0; i < resp.length; i++) {
                let check = resp[i].dealApartmentName + resp[i].dealRentType + resp[i].dealContractDate + "/" + resp[i].dealDeposit + "/" + resp[i].dealMonthlyRent;
                if (checkdata !== check && dealApartmentType !== "단독다가구") {
                    loadData(response);
                } else {
                    console.log("중복발견!");
                }
            }
        }
    });
}

function loadData(response) {
    let dealGu = response.tbLnOpendataRentV.row[0].SGG_NM;
    let dealGuCode = response.tbLnOpendataRentV.row[0].SGG_CD;
    let dealDong = response.tbLnOpendataRentV.row[0].BJDONG_NM;
    let dealDongCode = response.tbLnOpendataRentV.row[0].BJDONG_CD;
    let dealBonbun = response.tbLnOpendataRentV.row[0].BOBN;
    let dealBubun = response.tbLnOpendataRentV.row[0].BUBN;
    let dealApartmentType = response.tbLnOpendataRentV.row[0].HOUSE_GBN_NM;
    let dealApartmentName = response.tbLnOpendataRentV.row[0].BLDG_NM;
    let dealFloor = response.tbLnOpendataRentV.row[0].FLR_NO;

    let dealRentType = response.tbLnOpendataRentV.row[0].RENT_GBN;
    let dealBuildYear = response.tbLnOpendataRentV.row[0].BUILD_YEAR;
    let dealContractDate = response.tbLnOpendataRentV.row[0].CNTRCT_DE;
    let dealRentArea = response.tbLnOpendataRentV.row[0].RENT_AREA;
    let dealPyeong = Math.round(dealRentArea / 3.3);
    let dealDeposit = response.tbLnOpendataRentV.row[0].RENT_GTN;
    let dealMonthlyRent = response.tbLnOpendataRentV.row[0].RENT_FEE;

    let guCode = dealGuCode + "/";
    let gu = dealGu + "/";
    let dongCode = dealDongCode + "/";
    let daeji = "1" + "/";
    let bonbun = dealBonbun + "/";
    let bubun = dealBubun + "";
    let address = guCode + gu + dongCode + daeji + bonbun + bubun;

    let arr = {};
    arr = {
        "dealGu": dealGu,
        "dealGuCode": dealGuCode,
        "dealDong": dealDong,
        "dealDongCode": dealDongCode,
        "dealBonbun": dealBonbun,
        "dealBubun": dealBubun,
        "dealApartmentName": dealApartmentName,
        "dealFloor": dealFloor,
        "dealApartmentType": dealApartmentType,
        "dealRentType": dealRentType,
        "dealBuildYear": dealBuildYear,
        "dealContractDate": dealContractDate,
        "dealRentArea": dealRentArea,
        "dealPyeong": dealPyeong,
        "dealDeposit": dealDeposit,
        "dealMonthlyRent": dealMonthlyRent,
        "dealAverage2023": 0,
        "dealAverage2022": 0,
        "dealAverage2021": 0,
        "dealAverage2020": 0
    }

    loadRentData(address, dealRentArea, arr);

}

function loadRentData(address, dealRentArea, arr) {
    let rentlist = {};
    for (let y = 0; y < 4; y++) {
        averageArr[y] = 0;
        console.log(detailurl + yearArr[y] + "/" + address);
        $.ajax({
            url: detailurl + yearArr[y] + "/" + address,
            method: "GET",
            async: false
        }).done(function (response) {
            console.log(response);
            if (!response.RESULT && response.tbLnOpendataRentV) {
                count = response.tbLnOpendataRentV.row.length;
                console.log(count);
                for (let j = 0; j < response.tbLnOpendataRentV.row.length; j++) {
                    if (response.tbLnOpendataRentV.row[j].RENT_AREA === dealRentArea) {
                        console.log(response.tbLnOpendataRentV.row[j].RENT_GBN);
                        if (response.tbLnOpendataRentV.row[j].RENT_GBN === "월세") {
                            rentlist = {
                                "rentName": response.tbLnOpendataRentV.row[j].BLDG_NM,
                                "rentContractDate": response.tbLnOpendataRentV.row[j].CNTRCT_DE,
                                "rentDeposit": response.tbLnOpendataRentV.row[j].RENT_GTN,
                                "rentMonthlyFee": response.tbLnOpendataRentV.row[j].RENT_FEE,
                                "rentArea": response.tbLnOpendataRentV.row[j].RENT_AREA,
                                "rentPyeong": Math.round(response.tbLnOpendataRentV.row[j].RENT_AREA / 3.3),
                                "rentFloor": response.tbLnOpendataRentV.row[j].FLR_NO
                            };
                            if (j !== 0) {
                                for (let z = j - 1; z < j; z++) {
                                    if (response.tbLnOpendataRentV.row[z].CNTRCT_DE !== response.tbLnOpendataRentV.row[j].CNTRCT_DE) {
                                        insertRent(rentlist);
                                    }
                                }
                            } else if (j === 0) {
                                insertRent(rentlist);
                            }
                            count--;
                        } else {
                            console.log(y);
                            console.log(response.tbLnOpendataRentV.row[j].RENT_GTN);
                            averageArr[y] = averageArr[y] + parseInt(response.tbLnOpendataRentV.row[j].RENT_GTN);
                            console.log(averageArr[y]);
                        }
                        console.log(yearArr[y]);
                        console.log(averageArr[y]);
                    } else {
                        count--;
                    }
                }
                averageArr[y] = Math.round(averageArr[y] / count);

                arr.dealAverage2023 = averageArr[3];
                arr.dealAverage2022 = averageArr[2];
                arr.dealAverage2021 = averageArr[1];
                arr.dealAverage2020 = averageArr[0];

                console.log(arr);
                if (y === 3) {
                    insertDeal(arr);
                }
            } else {
                if (y === 3) {
                    insertDeal(arr);
                }
            }
        });
    }
}

function insertDeal(arr) {
    let jsonArr = JSON.stringify(arr);
    const settings = {
        url: "http://localhost:8080/insertData",
        method: "POST",
        async: false,
        cache: false,
        headers: {
            "Content-Type": "application/json"
        },
        data: jsonArr
    };
    $.ajax(settings).done(function (response) {

    });
}

function insertRent(rentlist) {
    let json = JSON.stringify(rentlist);
    const settings = {
        url: "http://localhost:8080/insertRentData",
        method: "POST",
        async: false,
        cache: false,
        headers: {
            "Content-Type": "application/json"
        },
        data: json
    };
    $.ajax(settings).done(function (response) {

    });
}

