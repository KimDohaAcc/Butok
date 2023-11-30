function checkValues() {
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
}