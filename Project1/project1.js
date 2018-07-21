"use strict";

/* Add Date */

let date = new Date(2018, 3, 28);   //assign date. 
function nextLessonDate(date) {
    let weekday = date.getDay(); //0-6  getDay() returns the day of the week (in this example will return saturday,because 28 april is : saturday)
    let monthDay = date.getDate(); //1-31  getDate() returns date( in this example : 28) 
    if (weekday == 5) { // if day is 5(index=5=friday) then the date should be increase by 1
        monthDay++;  //(28+1)
        date.setDate(monthDay); //setDate() method sets the day of the month to the date object. (example: (2018,3,29) )
    }
    else {    // if day doesn't equal 5 then day should be increase by 2
        monthDay += 2;    //(28+2)
        date.setDate(monthDay);  // (example: (2018,3,30) )
    }
    return date;
}

/* Delete Date*/

function perviousLessonDate(date) {
    if (date.getDate() == 28 && date.getMonth() == 3 && date.getFullYear() == 2018) {  // if date=(2018,3,28) then it exit from function da returns nothing
        return;
    } else {  //else if date doesn't equal (2018,3,28) do this....
        let weekday = date.getDay();  //weekday equals the days which getDay() returns
        let monthDay = date.getDate();  //monthDay equals the dates which getDate() returns
        if (weekday == 6) {   //if day is 6(index=6=saturday) then the date should be decrease by 1
            monthDay--;  //date-1
            date.setDate(monthDay);
        }
        else {   //if day is not 6(saturday) then the date should be decrease by 2
            monthDay -= 2;  //date-2
            date.setDate(monthDay);
        }
    }
}

/* Add Button */

let addBtn = document.querySelector('.btn1'); //with querySelector() method it will reach nodes classnamed:btn1 then grabs and saves in variable named addBtn
const studentClasses = ['date', 'elene', 'temo', 'salo', 'gocha', 'mari', 'ana', 'boris', 'dato', 'grigol', 'mariam', 'saba', 'sandro', 'tea', 'tonrike', 'nino'];

addBtn.addEventListener('click', function (e) {  //when user clicks on add button what will happen:
    let scoreDiv = document.createElement('div'); //create div element and save it in variable named scoreDiv
    let forAddColumn = document.querySelector(".forAddColumn"); //with querySelector() method it will reach nodes classnamed:forAddColumn
    scoreDiv.setAttribute('class', 'day'); //setAttribute() method will add class named : day to created scoreDiv
    forAddColumn.appendChild(scoreDiv);  //appendChild() method will append a scoreDiv as the last child of a forAddColumn


    for (let i = 0; i < 16; i++) {  // it is for adding 15 div(name:score, class:num) in scoreDiv

        if (i != 0) {  //it means that if scoreDiv child-div(score) is not first div then do this...
            let score = document.createElement('div'); //create div element and save it in variable named score
            score.setAttribute('class', 'num'); //it sets attribute - class named: num to created score div
            score.classList.add(studentClasses[i]); //classList.add() method will add class to score from studentClasses array

            scoreDiv.appendChild(score); //appends score in a scoreDiv
            score.innerHTML = "0"; //score content is 0

            score.addEventListener('click', function (e) {  //when user clicks on score div(it is cells where will be written students scores)
                let pr = prompt("Enter Score"); //displays a dialog box for users to input number
                if (isNaN(pr)) {  //if entered number is not a numberi then...
                    alert("Enter a Number!");
                }
                else if (pr < 0 || pr == 0) { //if entered number is less 0 or equal 0 then...
                    pr = 0; // the entered number will assign  0
                    score.style.backgroundColor = "red"; //the cell where is written 0 it's background color will be red
                    score.textContent = pr; //in div will be written entered number (0)
                }
                else if (pr > 5) { //if entered number is greater than 5 
                    pr = 5; //in this score div number will be 5
                    score.style.backgroundColor = "green";
                    score.textContent = pr;
                }
                else if (pr > 0 && pr <= 5) { //if entered number is greater than 0 AND less or equals 5 then...
                    score.textContent = pr; //The entered number by the user will be written in score div
                    score.style.backgroundColor = "green"; //the cell where is written number between 0 and 5 it's background color will be green
                }

                populateAverage(); //calls function when user clicks addButton ( it is for average..to calculate average scores for each student  when user enters number again)
                missedLessons(); //when user clicks addButton then calculate how many missed lessons are in total.it's because when user enters number greater than 0 calculate miised lessons again

            });
        }
        else { //if this div is the first score div(title:date)
            let score = document.createElement('div'); //create div element and save it in variable named score
            score.setAttribute('class', 'numForTitle'); //it sets attribute - class named: numForTitle to created score div
           
            scoreDiv.appendChild(score); //appends score in a scoreDiv

            score.classList.add(studentClasses[i]); // amshemtxvevashi klasi iqneba 0 da gamoitans date klass.. da tarigis divs mianichebs klass:date-s

            let dateTitle = nextLessonDate(date).toDateString(); //toDateString() method converts the date of a Date object into a readable string.
            score.innerHTML = dateTitle.substr(0, dateTitle.length - 5); //first score div content will be date.substr() will extract parts of a string(date)
        }

    }
   //when user clicks addButton it calls these function
    populateAverage(); //calculate average scores for each student, when user enters number in score divs

    calculateTotalDays(); //calculates how many days are added with clicking addButton

    missedLessons(); //calculate how many missed lessons are in total
});

/* Remove Button */  

let removeBtn = document.querySelector(".btn2"); //it will reach nodes classnamed:btn2 then grabs and saves in variable named removeBtn
removeBtn.addEventListener('click', function (e) { //when user clicks on remove button what will happen:
    let forAddColumn = document.querySelector(".forAddColumn"); //with querySelector() method it will reach nodes classnamed:forAddColumn

    forAddColumn.removeChild(forAddColumn.lastChild); //the last child-div of forAddColumn div will be removed
    perviousLessonDate(date); //calls date function

    populateAverage(); //calculate average scores for each student, when user deletes divs

    calculateTotalDays(); //calculates how many days are stayed after clicking remove button

    missedLessons(); //calculate how many missed lessons are in total after deleting divs
});


/* Missed Lessons */
function missedLessons() {
    let missedDays = 0;
    Array.from(document.querySelectorAll(".num")).forEach(function (element) { // Array.from() method returns an Array object from any object
        if (element.innerHTML == "0") { //if score divs content is 0 then increase missedDays
            missedDays++;
        }
    });
    document.querySelector(".MissLess").children[0].innerHTML = missedDays;//div MissLess.children[0] (span)content should equal how many missed lessons are
}
/* Number of Adding Days */

function calculateTotalDays() {
    document.querySelector(".TotDays").children[0].innerHTML =  //In this divs span's content should equal adding days
        document.querySelectorAll(".day").length; 
}

/* Total Average */
function totalAverage() {
    let averageDivs = document.getElementsByClassName("ave"); //it grabs divs classnamed:ave
    let points = 0;
    for (let i = 1; i < averageDivs.length; i++) { 
        points += parseInt(averageDivs[i].innerHTML); // it will sum averages numbers
    }
    let count = (averageDivs.length - 1); // average divs length is 16 which includes first div: title so it needs to subtruct
    let totalAverage = Math.round((points / count) * 100) / 100; // sum of average/15
    document.querySelector(".AverMark").children[0].innerHTML = totalAverage; // this div's span equals total average
}

/* Average */
function calculateAverage(students) {
    let averagePoints = []; //in this array will be saved each students average score
    for (let i = 1; i < studentClasses.length; i++) { //it's index starts from 1,because in 0 index content is date
        let student = document.getElementsByClassName(studentClasses[i]); //it is class:elene,temo.salome and so on
        let points = 0;
        for (let j = 0; j < student.length; j++) { //it passes each students rowsscores..student.length means how many day's scores are in each row.
            points += parseInt(student[j].innerHTML); //0+each students row scores
        }
        let avg = student.length == 0 ? 0 : Math.round((points / student.length)* 100) / 100; //If added days are 0 return 0 else rounded number of point/days
        averagePoints.push(avg);  //It pushes averages in array to save 
    }
    return averagePoints;
}

/* Print Average Score in div*/
function populateAverage() {
    let averageDivs = document.getElementsByClassName("ave");
    let avgs = calculateAverage(studentClasses); // It returns array,where are written each students scores..first is elene..
    for (let i = 1; i < averageDivs.length; i++) {
        averageDivs[i].innerHTML = avgs[i - 1]; //if it isn't -1 then temo's average meaning will be in elene's average div...
    }
    totalAverage();
}

