let btn = document.querySelector('button');




btn.addEventListener('click', function () {
    let ranNumber = (Math.floor(Math.random() * 20) + 1);
    let divs = document.querySelector(`.divi${ranNumber}`);

    if (divs.style.backgroundColor == "yellowgreen") {
        divs.style.backgroundColor = "gold";
    }

    else if (divs.style.backgroundColor == "gold") {
        divs.style.backgroundColor = "aqua";

    }

    else if (divs.style.backgroundColor == "aqua") {
        divs.style.backgroundColor = "white";
    }


    else {
        divs.style.backgroundColor = "yellowgreen";
    }




});

