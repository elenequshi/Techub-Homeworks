"use strict";

const canvas = document.getElementById('myCanvas');
const context = canvas.getContext('2d');

let x = 20;
let y = 20;
let xSpeed = 1;
let ySpeed = 0;
let direction = 'RIGHT';
let score = 0;
let w = canvas.width;
let h = canvas.height;



if (localStorage.getItem('boardWidth')) {
    document.querySelector('.boardWidth').value = localStorage.getItem('boardWidth')
    document.querySelector('.boardHeight').value = localStorage.getItem('boardHeight')
    document.querySelector('.appleNum').value = localStorage.getItem('appleNum')
    document.querySelector('.length').value = localStorage.getItem('length')
    document.querySelector('.speed').value = localStorage.getItem('speed')
}


class Apple {

    constructor(width, height) {
        this.x = Math.floor((Math.random() * (w - 25) + 20) / 20) * 20;
        this.y = Math.floor((Math.random() * (h - 25) + 20) / 20) * 20;
        this.width = width;
        this.height = height;
    }

    // Draw an apple image on canvas
    draw() {
        let image = new Image();
        image.src = 'apple.png';
        context.drawImage(image, this.x, this.y, 20, 20);
    }

    // To appear apples again,when snake eats them
    newApple() {
        this.x = Math.floor((Math.random() * (w - 25) + 20) / 20) * 20;
        this.y = Math.floor((Math.random() * (h - 25) + 20) / 20) * 20;
        this.draw();
    }

}

let apple = new Apple(20, 20);
apple.draw();




class Snake {
    constructor(x, y, width, height, length) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.snake = [];
        this.length = length;
    }

    create() {
        let k = this.x;
        for (let i = 0; i < this.length; i++) {
            this.snake.push({
                x: k,
                y: 200
            })
            k += 20;
        }
    }

    draw() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < this.snake.length; i++) {
            let x = this.snake[i].x;
            let y = this.snake[i].y;
            context.fillstyle = 'black';
            context.fillRect(x, y, this.width, this.height);
            context.strokeStyle = "white";
            context.strokeRect(x, y, this.width, this.height);
        }
    }

    // When snake touches canvas borders game will over
    borders() {

        let snakeX = this.snake[this.snake.length - 1].x;
        let snakeY = this.snake[this.snake.length - 1].y;
        if (snakeX < 0 || snakeY < 0 || snakeX >= canvas.width || snakeY >= canvas.height || collision(snakeX, snakeY, this.snake)) {
            highestScore();
            score = 0;
            cancelAnimationFrame(game);
            direction = 'RIGHT';

            context.clearRect(0, 0, canvas.width, canvas.height);
            let text = "Game Over!";
            context.font = "50px Vardana";
            context.fillText = (text, 80, 100);
            context.strokeText(text, 80, 100);
            context.stroke();

        }

    }



    // Moving directions
    moveRight() {
        this.snake.shift();
        let last = this.snake[this.snake.length - 1];
        let obj = {
            x: last.x + this.width,
            y: last.y
        }
        this.snake.push(obj);
        this.draw();
    }

    moveLeft() {
        this.snake.shift();
        let last = this.snake[this.snake.length - 1];
        let obj = {
            x: last.x - this.width,
            y: last.y
        }
        this.snake.push(obj);
        this.draw();
    }

    moveUp() {

        this.snake.shift();
        let last = this.snake[this.snake.length - 1];

        let obj = {
            x: last.x,
            y: last.y - this.height
        }
        this.snake.push(obj);
        this.draw();

    }

    moveDown() {
        this.snake.shift();
        let last = this.snake[this.snake.length - 1];

        let obj = {
            x: last.x,
            y: last.y + this.height
        }
        this.snake.push(obj);
        this.draw();

    }


}

// Moving snake with arrow keys
document.addEventListener('keydown', function (event) {
    let key = event.keyCode;
    if (key == 37 && direction != "RIGHT") {
        direction = "LEFT";
        xSpeed = -1;
        ySpeed = 0;
    } else if (key == 38 && direction != "DOWN") {
        direction = "UP";
        xSpeed = 0;
        ySpeed = -1;
    } else if (key == 39 && direction != "LEFT") {
        direction = "RIGHT";
        xSpeed = 1;
        ySpeed = 0;
    } else if (key == 40 && direction != "UP") {
        direction = "DOWN";
        xSpeed = 0;
        ySpeed = 1;
    }
})

// Checks if snake hits itself 
function collision(x, y, snake) {
    for (let i = 0; i < snake.length - 1; i++) {
        if (x == snake[i].x && y == snake[i].y) {

            return true;
        }
    }
    return false;


}


let snake = new Snake(x, y, 20, 20, 4);
snake.create();


// Eating apples
function eat() {
    let snakeX = snake.snake[snake.snake.length - 1].x;
    let snakeY = snake.snake[snake.snake.length - 1].y;
    let xA = apple.x;
    let yA = apple.y;
    let tail;
    if (snakeX === xA && snakeY === yA) {
        tail = {
            x: snakeX,
            y: snakeY
        };

        score += 10;
        apple.newApple(); // To create (appear) new apple on canvas

        setScore();

        snake.snake.unshift(tail);
    }
}



let loop = 0;
let game;
let loopnumber = 10;


// Change snake's Speed : (Levels)
function changeSpeed() {

    let hardRange = document.querySelector(".hard-Range");
    let intermediateRange = document.querySelector(".intermadiate-Range");
    let noviceRange = document.querySelector(".novice-Range");
    let hardValue = document.querySelector(".hardvalue");
    hardValue.addEventListener('change', function (e) {
        loopnumber = e.target.value;

    })
    let intermediateValue = document.querySelector(".intermediatevalue");
    intermediateValue.addEventListener("change", function (e) {
        loopnumber = e.target.value;
    })
    let noviceValue = document.querySelector(".novicevalue");
    noviceValue.addEventListener("change", function (e) {
        loopnumber = e.target.value;
    })


    let hard = document.querySelector(".btn3");
    hard.addEventListener("click", function () {
        loopnumber = 5;

        hardRange.classList.remove("hidden");
        intermediateRange.classList.add("hidden");
        noviceRange.classList.add("hidden");

    });

    let intermediate = document.querySelector(".btn2");
    intermediate.addEventListener("click", function () {
        loopnumber = 10;

        hardRange.classList.add("hidden");
        intermediateRange.classList.remove("hidden");
        noviceRange.classList.add("hidden");

    });

    let novice = document.querySelector(".btn1");
    novice.addEventListener("click", function () {
        loopnumber = 20;

        hardRange.classList.add("hidden");
        intermediateRange.classList.add("hidden");
        noviceRange.classList.remove("hidden");

    });



}


function animate() {
    game = requestAnimationFrame(animate);
    if (++loop < loopnumber) {
        return;
    }
    loop = 0;
    snake.draw();
    eat();
    if (direction === 'RIGHT') {
        snake.moveRight();
    }
    else if (direction === 'LEFT') {
        snake.moveLeft();
    }
    else if (direction === 'UP') {
        snake.moveUp();
    }
    else {
        snake.moveDown();
    }
    snake.borders();
    apple.draw();

}

// Set Score 
function setScore(reset) {
    const item = document.querySelector('.score');
    if (reset) {
        item.textContent = 0;
    } else {
        item.textContent = score;
    }
}
setScore();


// Save High Score in Localstorage and show it in html
function highestScore(scoreParam) {
    const item = document.querySelector('.highScore');
    let highScore = parseInt(localStorage.getItem('highScore'));
    if (isNaN(highScore)) {
        highScore = score;
    }
    if (isNaN(scoreParam)) {
        item.innerHTML = highScore;
    }
    if (highScore <= score) {
        localStorage.setItem('highScore', score);
        item.innerHTML = score;
    }
}
highestScore();



// Default Snake length
let snakeSize = 4;

let start = document.querySelector('.start')
start.addEventListener("click", function () {
    setScore(true);
    apple = new Apple(20, 20);
    apple.draw();


    // Get Snake length with input value
    let length = document.querySelector(".length").value;

    // If input value is null make snake length 4
    if (length != true) {
        snakeSize = 4;
    }

    // If input value isn't null make snake size input value
    if (length != false) {
        snakeSize = length;
    }


    snake = new Snake(x, y, 20, 20, snakeSize);
    snake.create();

    animate();
})
changeSpeed(); // add change speed events




let startBtn = document.querySelector('.start');
let boardWidth;
let boardHeight
let appleNum;
let length;
let speed;

startBtn.addEventListener('click', function () {
    boardWidth = document.querySelector('.boardWidth').value;
    boardHeight = document.querySelector('.boardHeight').value;

    canvas.style.width = boardWidth + 'px';
    canvas.style.height = boardHeight + 'px';

    localStorage.setItem('boardWidth', boardWidth)
    localStorage.setItem('boardHeight', boardHeight)
    localStorage.setItem('appleNum', document.querySelector('.appleNum').value)
    localStorage.setItem('length', document.querySelector('.length').value)
    localStorage.setItem('speed', document.querySelector('.speed').value)
})
