function Car() {

    this.setName = function (name) {
        this.name = name;
    }

    this.setColor = function (color) {
        this.color = color;
    }

    this.setBrand = function (brand) {
        this.brand = brand;
    }

    this.save = function () {
        console.log(`saving ${this.name}, color - ${this.color}, brand - ${this.brand}`)
    }


}

let car = new Car();
car.setName('Jetta')
car.setColor('Platinum Gray Metallic')
car.setBrand('VW')
car.save();



