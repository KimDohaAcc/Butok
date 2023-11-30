let userCode = document.getElementById("userCode") === null?
    "anonymous":
    document.getElementById("userCode").value;
let userName = document.getElementById("userName") === null?
    "anonymous":
    document.getElementById("userName").value;

let dealCode;
let isChecked = false;
let interestsCode = -1;

const interestsData = {
    "userCode": userCode,
    "userName": userName,
    "dealCode": ""
};
function checkCount(dealCode) {
    const count = document.getElementById("countOfInterests");

    const countSettings = {
        "url": `interests/count?code=${dealCode}`,
        "method": "GET",
        "timeout": 0,
    };
    $.ajax(countSettings).done(function (response) {
        count.innerText = response;
    });

    return count;
}

function setInterestsInfo() {
    dealCode = document.getElementById("deal").value;
    interestsData.dealCode = dealCode;

    const heart = document.getElementById("heart");
    checkHeart(heart);
}

function checkHeart(heart) {
    const heartSettings = {
        "url": `interests/${userCode}/${dealCode}`,
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Content-Type": "text/plain"
        },
    };

    $.ajax(heartSettings).done(function (response) {
        if(response) {
            isChecked = true;
            interestsCode = response.interestsCode;
            heart.setAttribute("class", "fi fi-sr-heart");
        }
        else {
            isChecked = false;
        }
    });

    checkCount(dealCode);
}

function checkInterests() {
    if(userCode!=="anonymous") {
        const heart = document.getElementById("heart");

        const countOfInterests = document.getElementById("countOfInterests");
        let count = parseInt(countOfInterests.innerText);

        if(!isChecked) {
            const settings = {
                "url": "addInterests",
                "method": "POST",
                "timeout": 0,
                "headers": {
                    "Content-Type": "application/json"
                },
                "data": JSON.stringify(interestsData),
            };

            $.ajax(settings).done(function (response) {
                interestsCode = response.interestsCode;
            });

            heart.setAttribute("class", "fi fi-sr-heart")
            isChecked = true;
            countOfInterests.innerText = count + 1;

        } else if(isChecked) {
            const settings = {
                "url": `cancelInterests?code=${interestsCode}`,
                "method": "GET",
                "timeout": 0,
            };
            $.ajax(settings).done();

            heart.setAttribute("class", "fi fi-rr-heart");
            isChecked = false;
            countOfInterests.innerText = count - 1;
        }

    } else {
        location.href="login";
    }

}