function Calculator() {
    let operators = {
        "+": (a, b) => a + b,
        "-": (a, b) => a - b
    };
    this.calculate = function (str) {
        let split = str.split(' '),
            a = Number(split[0]),
            operator = split[1],
            b = Number(split[2]);


        return operators[operator](a, b);
    };

    this.addMethod = function (name, func) {
        operators[name] = func;
    };
}

let calc = new Calculator();
alert(calc.calculate("3 + 7")); 

let powerCalc = new Calculator();
powerCalc.addMethod("*", (a, b) => a * b);
powerCalc.addMethod("/", (a, b) => a / b);
powerCalc.addMethod("**", (a, b) => a ** b);

let result = powerCalc.calculate("2 ** 3");
alert(result);