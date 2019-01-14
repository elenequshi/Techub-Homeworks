
let array = [];
for (let i = 1; i <= 150; i++) {
    array.push(i);
}


function numbers(arr) {
    arr.forEach(i => {
        let divs = document.createElement("a");
        divs.classList.add("num");
        divs.textContent = i;
        container.appendChild(divs);
    });
}
numbers(array);

ascending.addEventListener("click", function ascendingNums() {
    array.sort(function (a, b) {
        return a - b;
    });
    container.innerHTML = "";
    numbers(array);
});
descending.addEventListener("click", function descendingNums() {
    array.sort(function (a, b) {
        return b - a;
    });
    container.innerHTML = "";
    numbers(array);
}
);
shuffle.addEventListener("click", function shuffleNums() {
    container.innerHTML = "";
    for (let i = 0; i < 150; i++) {
        randomNum = Math.floor(Math.random() * 150);
        [array[i], array[randomNum]] = [array[randomNum], array[i]];
    }
    numbers(array);
}
);



