let divi = document.body.firstElementChild;

let child = divi.children;
for (let i = 0; i < child.length; i++) {
      if (i == 2 || i == 3 || i == 8 || i == 9 || i == 14 || i == 21 || i == 26 || i == 27 || i == 32 || i == 33) {
            child[i].style.backgroundColor = "yellow";
      }
      else if (i == 12 || i == 13 || i == 15 || i == 16 || i == 17 || i == 18 || i == 19 || i == 20 || i == 22 || i == 23) {
            child[i].style.backgroundColor = "blue";

      }

}