const options1 = document.querySelectorAll('.one');
const options2 = document.querySelectorAll('.two');
const options3 = document.querySelectorAll('.thr');
const options4 = document.querySelectorAll('.four');

let selectedValue;

const arr = [options1, options2, options3, options4];
for(let i = 0; i < 4; i ++){
    arr[i].forEach(function(option) {
        option.addEventListener('click', function() {
            arr[i].forEach(function(opt) {
                opt.style.backgroundColor = '#0FD6CF';
                opt.classList.remove('selected');
            });
            this.classList.add('selected');
            this.setAttribute("style", "background-color : #09827E");
            selectedValue = this.getAttribute('data-value');
            console.log(selectedValue);
        });
    });
}

const optionBoxes = document.querySelectorAll('.option-box');
const buttonBox = document.querySelector(".buttonBox");

optionBoxes.forEach((box, index ) => {
    if (index > 0) {
        box.style.display = 'none';
        buttonBox.style.display = 'none';
    }

    box.querySelectorAll('.option').forEach(option => {
        option.addEventListener('click', () => {
            if (index < optionBoxes.length - 1) {
                optionBoxes[index + 1].style.display = 'flex';
                optionBoxes[index + 1].scrollIntoView({behavior: 'smooth'});
            }

            if(index === optionBoxes.length - 1){
                buttonBox.style.display = 'flex';
                buttonBox.scrollIntoView({behavior: 'smooth'});
            }
        });
    });
});

function sendValue(){
    let valueArr = "";

    for(let i = 0; i < arr.length; i ++){
        let selected = true;
        arr[i].forEach(option => {
            console.log(option.classList);
            if (option.classList.contains('selected')) {
                let choice = option.getAttribute('data-value');
                valueArr += choice;
                selected = false;

                if(i < arr.length -1){
                valueArr += "&";
                }
            }
        });
    }

    let url = "";
    const choiceButton = document.getElementById('choice-button');

    url = choiceButton === null ? "/finalRegist" : "/updateChoice";

    $.ajax({
        "url" : url,
        "type" : "POST",
        "Content-Type": "application/json;charset=UTF-8",
        "data" : {
           preferenceData : valueArr
        }
    }).done(response => {
        location.href = choiceButton === null ? "/registOk": "/myPage?updatePreference=Y";
    });
}