// 화면에 지도를 표시할 영역
const mapContainer = document.getElementById('map'), // 지도를 표시할 div
    mapOption = {
        center: new kakao.maps.LatLng(37.541, 126.986), // 지도의 중심좌표
        level: 6 // 지도의 확대 레벨
    };

// 지도를 생성합니다
const map = new kakao.maps.Map(mapContainer, mapOption);

// 주소-좌표 변환 객체를 생성합니다
const geocoder = new kakao.maps.services.Geocoder();

// 주소 검색을 위해 키워드를 받아옴
const url = new URL(window.location.href);
const urlParams = url.searchParams;
const keyword = urlParams.get("keyword");
const rentType = urlParams.get("rentType");
const aptType = urlParams.get("aptType");

// 검색 결과 생성된 마커들을 저장할 배열
const markers = [];

// 검색 결과 얻어낸 좌표값들을 저장하는 배열
const positions = [];

// 생성된 오버레이들을 저장하는 배열
const overlays = [];

// 오버레이에 표시될 컨텐츠들을 저장하는 배열(Key-Value 타입)
const contents = [];

let sumY = 0;
let sumX = 0;

// 마커 클러스터러를 생성합니다
const clusterer = new kakao.maps.MarkerClusterer({
    map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
    markers: markers,   // 클러스터링 할 마커 배열
    gridSize: 75,       // 클러스터의 격차 크기(픽셀 단위, 해당 격자 안에 마커가 들어올 경우 클러스터에 포함)
    averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
    minLevel: 5, // 클러스터 할 최소 지도 레벨
});

// 마커 클러스터를 생성하여 지도에 표시
clusterer.addMarkers(markers);

const searchBar = document.getElementById("searchBar");
if(keyword) {
    searchBar.value = keyword;
}

searchAddress(keyword, rentType, aptType)
// 지도가 확대 또는 축소되면 마지막 파라미터로 넘어온 함수를 호출하도록 이벤트를 등록합니다

kakao.maps.event.addListener(map, 'zoom_changed', function() {
    // 지도의 현재 레벨을 얻어옵니다
    let level = map.getLevel();

    if(level<=4) {
        for(let i=0; i<positions.length; i++) {
            addCustomOverlay(positions[i], contents[i]);
        }
    } else {
        removeCustomOverlay(overlays);
    }

});

function addEvent(keyword){
    document.getElementById("rentType").addEventListener("change", function() {
        document.getElementById("checkBox").checked = false;
    });

    document.getElementById("apartmentType").addEventListener("change", function() {
        document.getElementById("checkBox").checked = false;
    });

    let checkBox = document.getElementById("checkBox");
    if(checkBox) {
        checkBox.addEventListener("change", function () {
            if (!checkBox.checked) {
                location.href = "detailSearch?keyword=" + keyword + "&rentType=전체&aptType=전체&checked=notCheck";
            } else {
                location.href = "detailSearch?keyword=" + keyword + "&rentType=전체&aptType=전체&checked=checked";
            }
        });
    }
}

function searchAddress(keyword, rentType, aptType) {

    addEvent(keyword);
    const settings = {
        "url": `jsonDetailResult?keyword=${keyword}&rentType=${rentType}&aptType=${aptType}`,
        "method": "GET",
        "timeout": 0,
    };

    if(rentType === "전체" && aptType === "전체") {
        const checkBox = document.getElementById("checkBox");
        let userCheck = "N";

        if(checkBox && checkBox.checked){
            userCheck = "Y";
        }
        settings.url = `jsonResult?keyword=${keyword}&userCheck=`+userCheck;
    }

    $.ajax(settings).done(function (response) {
        if(response.length===0) {
            const emptyResult = document.createElement("div");
            emptyResult.id = "emptySearchResult";

            emptyResult.innerHTML = `
                <h1>검색 결과가 없습니다.</h1>
                부동산 똑똑이에서 스마트하게 전월세를 검색하세요!
                <img src="image/nodata.png">
            `;
            mapContainer.innerHTML = "";
            mapContainer.appendChild(emptyResult);

        } else {
            let distanceY = 0.000005;
            let distanceX = 0.000002;
            let count = 0;
            for (let i = 0; i < response.length; i++) {

                // 주소로 좌표를 검색합니다
                let dealGu = response[i].deal_gu;
                let dealDong = response[i].deal_dong;
                let dealBon = response[i].deal_bonbun;
                let dealBun = response[i].deal_bubun;
                let address = `${dealGu} ${dealDong} ${dealBon}-${dealBun}`;

                geocoder.addressSearch(address, function (result, status) {

                    // 정상적으로 검색이 완료됐으면
                    if (status === kakao.maps.services.Status.OK) {

                        let markerPosition = new kakao.maps.LatLng(result[0].y, result[0].x);
                        for(let j=0; j<positions.length; j++) {
                            if(positions[j].getLat()===markerPosition.getLat() && positions[j].getLng()===markerPosition.getLng()) {
                                if(count%8===0) {
                                    markerPosition = new kakao.maps.LatLng(result[0].y*(1+distanceY), result[0].x*(1+distanceX));
                                } else if(count%8===1) {
                                    markerPosition = new kakao.maps.LatLng(result[0].y*(1-distanceY), result[0].x*(1+distanceX));
                                } else if(count%8===2) {
                                    markerPosition = new kakao.maps.LatLng(result[0].y*(1+distanceY), result[0].x*(1-distanceX));
                                } else if(count%8===3) {
                                    markerPosition = new kakao.maps.LatLng(result[0].y*(1-distanceY), result[0].x*(1-distanceX));
                                } else if(count%8===4) {
                                    markerPosition = new kakao.maps.LatLng(result[0].y*(1-distanceY), result[0].x);
                                } else if(count%8===5) {
                                    markerPosition = new kakao.maps.LatLng(result[0].y, result[0].x*(1+distanceX));
                                } else if(count%8===6) {
                                    markerPosition = new kakao.maps.LatLng(result[0].y, result[0].x*(1-distanceX));
                                } else if(count%8===7) {
                                    markerPosition = new kakao.maps.LatLng(result[0].y*(1+distanceY), result[0].x);
                                }
                                if(count%8===7) {
                                    distanceY += 0.000003;
                                    distanceX += 0.0000015;
                                }
                                count++;
                            }
                        }

                        let coords = markerPosition;

                        positions.push(markerPosition);

                        // 마커들의 평균 좌표를 구하기 위해서 합계를 구해줌
                        sumY += coords.getLat();
                        sumX += coords.getLng();

                        if(i===response.length-1) {
                            let avgY = sumY / positions.length;
                            let avgX = sumX / positions.length;

                            map.setCenter(new kakao.maps.LatLng(avgY, avgX));
                        }

                        let contentInfo = {
                            "deal_code": response[i].deal_code,
                            "deal_apartment_name": response[i].deal_apartment_name,
                            "deal_rent_area": response[i].deal_rent_area,
                            "deal_pyeong": response[i].deal_pyeong,
                            "deal_deposit": response[i].deal_deposit,
                            "deal_monthly_rent": response[i].deal_monthly_rent
                        }

                        contents.push(contentInfo);
                        createMarker(coords);
                    }
                });
            }
        }
    })
}

function createMarker(position) {
    const icon = new kakao.maps.MarkerImage(
        '../image/marker.png',
        new kakao.maps.Size(70, 70),
        {
            offset: new kakao.maps.Point(16, 34),
            alt: "똑똑이들의 집",
            shape: "poly"
        }
    );

    // 결과값으로 받은 위치를 마커로 표시합니다
    let marker = new kakao.maps.Marker({
        map: map,
        image: icon,
        position: position,
        clickable: true
    });

    markers.push(marker);
}

function addCustomOverlay(position, contentInfo) {
    // 커스텀 오버레이에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다

    let price = contentInfo.deal_monthly_rent>0?
        `<span class="price">${contentInfo.deal_deposit} / ${contentInfo.deal_monthly_rent} (만원)</span>`:
        `<span class="price">${contentInfo.deal_deposit} (만원/전세)</span>`

    let content = `<div class="customoverlay" onclick="createDetailView(${contentInfo.deal_code}); ">` +
        `  <a>` +
        `    <input type="hidden" value="${contentInfo.deal_code}">`+
        `    <span class="title">${contentInfo.deal_apartment_name} / ${contentInfo.deal_pyeong}평형</span>` +
        price +
        '  </a>' +
        '</div>';

    // 커스텀 오버레이를 생성합니다
    let customOverlay = new kakao.maps.CustomOverlay({
        map: map,
        position: position,
        content: content,
        yAnchor: 0.01,
        xAnchor: 0.4,
        range: 300
    });

    overlays.push(customOverlay);
}

function removeCustomOverlay(overlays) {
    for(let i=0; i<overlays.length; i++) {
        overlays[i].setMap(null);
    }
    overlays.length = 0;
}