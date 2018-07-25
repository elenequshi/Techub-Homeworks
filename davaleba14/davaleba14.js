let box1 = document.querySelector(".n1");
let box2 = document.querySelector(".n2");
let box3 = document.querySelector(".n3");
let box4 = document.querySelector(".n4");
let box5 = document.querySelector(".n5");
let box6 = document.querySelector(".n6");
let box7 = document.querySelector(".n7");
let box8 = document.querySelector(".n8");
let box9 = document.querySelector(".n9");

let chosen1 = document.querySelector(".chosen1");
let chosen2 = document.querySelector(".chosen2");
let chosen3 = document.querySelector(".chosen3");

box1.addEventListener('click', function (e) {
    chosen1.style.backgroundColor = "yellow";
});
box2.addEventListener('click', function (e) {
    chosen1.style.backgroundColor = "hotpink";
});
box3.addEventListener('click', function (e) {
    chosen1.style.backgroundColor = "black";
});

box4.addEventListener('click', function (e) {
    chosen2.style.backgroundColor = "seagreen";
});
box5.addEventListener('click', function (e) {
    chosen2.style.backgroundColor = "purple";
});
box6.addEventListener('click', function (e) {
    chosen2.style.backgroundColor = "aqua";
});

box7.addEventListener('click', function (e) {
    chosen3.style.backgroundColor = "gray";
});
box8.addEventListener('click', function (e) {
    chosen3.style.backgroundColor = "chartreuse";
});
box9.addEventListener('click', function (e) {
    chosen3.style.backgroundColor = "violet";
});
