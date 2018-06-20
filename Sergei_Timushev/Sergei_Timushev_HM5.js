/**
 * Константы гамбургера
 */
Hamburger.SIZE_STANDART = { price: 50, calory: 20, name: "STANDART", property: "SIZE" };
Hamburger.SIZE_MEDIUM = { price: 100, calory: 40, name: "MEDIUM", property: "SIZE" };
Hamburger.SIZE_LARGE = { price: 150, calory: 60, name: "LARGE", property: "SIZE" };
Hamburger.STUFFING_CHEESE = { price: 10, calory: 20, name: "CHEESE", property: "STUFFING" };
Hamburger.STUFFING_SALAD = { price: 20, calory: 5, name: "SALAD", property: "STUFFING" };
Hamburger.STUFFING_POTATO = { price: 15, calory: 10, name: "POTATO", property: "STUFFING" };

/**
 * Константы салатов
 */
Salad.SIZE_STANDART = { price: 1, calory: 1, name: "STANDART", property: "SIZE" };
Salad.SIZE_MEDIUM = { price: 1.5, calory: 1.5, name: "MEDIUM", property: "SIZE" };
Salad.SIZE_LARGE = { price: 2, calory: 2, name: "LARGE", property: "SIZE" };
Salad.CAESAR = { price: 100, calory: 20, name: "CAESAR", property: "STUFFING" };
Salad.OLIVIER = { price: 50, calory: 80, name: "OLIVIER", property: "STUFFING" };

/**
 * Константы напитков
 */
Drink.SIZE_STANDART = { price: 1, calory: 1, name: "STANDART", property: "SIZE" };
Drink.SIZE_MEDIUM = { price: 1.5, calory: 1.5, name: "MEDIUM", property: "SIZE" };
Drink.SIZE_LARGE = { price: 2, calory: 2, name: "LARGE", property: "SIZE" };
Drink.COLA = { price: 50, calory: 40, name: "Coca-Cola", property: "STUFFING" };
Drink.COFFEE = { price: 80, calory: 20, name: "COFFEE", property: "STUFFING" };

//Begin parent class and methods
function Product(size, stuffing) {
    // Check that first param is size
    if (size.property == "SIZE") {
        this.size = size;
    } else {
        throw new Error('Size of product is not set');
    }
    // Check that second param is stuffing
    if (stuffing.property == "STUFFING") {
        this.stuffing = stuffing;
    } else {
        throw new Error('Wrong param');
    }

    this.price = 0;
    this.calory = 0;
}

/**
 * Получить размер продукта
 */
Product.prototype.getSize = function() {
    return this.size.name;
    //console.log( "Size is " + this.size.name );
}

/**
 * Получить цену продукта
 */
Product.prototype.calculatePrice = function() {
    this.price = this.size.price * this.stuffing.price;
    //console.log( "Price is " + this.stuffing.length);
    return this.price;
}

/**
 * Получить калории продукта
 */
Product.prototype.calculateCalories = function() {
        this.calory = this.size.calory * this.stuffing.calory;
        return this.calory;
        //console.log( "Calory is " + this.calory);
    }
    //End parent class and methods

//Begin child hamburger class and methods
function Hamburger(size, stuffing) {
    Product.apply(this, arguments);
    this.stuffing = [];
    for (i = 1; i < arguments.length; i++) {
        if (arguments[i].property == "STUFFING") {
            this.stuffing.push(arguments[i]);
        } else {
            throw new Error('Wrong param');
        }
    }
}

// Унаследовать
Hamburger.prototype = Object.create(Product.prototype);
Hamburger.prototype.constructor = Hamburger;

/**
 * Добавить начинку в гамбургер
 */
Hamburger.prototype.addStuffing = function(stuffing) {
    for (i = 0; i < arguments.length; i++) {
        this.stuffing.push(arguments[i]);
    };
    return this.stuffing;
}

/**
 * Удалить начинку
 */
Hamburger.prototype.removeStuffing = function(stuffing) {
    for (i = 0; i < arguments.length; i++) {
        if (this.stuffing.indexOf(arguments[i]) != -1) {
            this.stuffing.splice(this.stuffing.indexOf(arguments[i]), 1);
        }
    }
    return this.stuffing;
}

/**
 * Узнать начинку гамбургера
 */
Hamburger.prototype.getStuffing = function() {
    var allStuff = '';
    for (i = 0; i < this.stuffing.length; i++) {
        allStuff += this.stuffing[i].name + ' ';
    }
    console.log("Hamburger includes " + allStuff);
}

/**
 * Узнать цену гамбургера
 */
Hamburger.prototype.calculatePrice = function() {
    //Product.prototype.calculatePrice.apply(this);
    this.price = this.size.price;
    for (j = 0; j < this.stuffing.length; j++) {
        this.price += this.stuffing[j].price;
    }

    //console.log( "Price of hamburger is " + this.price);
    return this.price;
}

/**
 * Узнать калорийность
 */
Hamburger.prototype.calculateCalories = function() {
        this.calory = this.size.calory;
        for (j = 0; j < this.stuffing.length; j++) {
            this.calory += this.stuffing[j].calory;
        }
        return this.calory;
        //console.log( "Calory of hamburger is " + this.calory);
    }
    //End child hamburger class and methods

//Begin child salad class and methods
function Salad(size, stuffing) {
    Product.apply(this, arguments);
}

// Унаследовать
Salad.prototype = Object.create(Product.prototype);
Salad.prototype.constructor = Salad;
//End child salad class and methods

//Begin child drink class and methods
function Drink(size, stuffing) {
    Product.apply(this, arguments);
}

// Унаследовать
Drink.prototype = Object.create(Product.prototype);
Drink.prototype.constructor = Drink;
//End child drink class and methods

//Begin order class and methods
function Order() {
    this.price = 0;
    this.calory = 0;
    this.flag = 1; //Флаг возможности добавления и удаления, если 1 то можно
    this.order_items = [];
    for (i = 0; i < arguments.length; i++) {
        this.order_items.push(arguments[i]);
    }
}

Order.prototype.addToOrder = function() {
    if (this.flag == 1) {
        for (i = 0; i < arguments.length; i++) {
            this.order_items.push(arguments[i]);
        }
        return this.order_items;
    } else {
        throw new Error('Order was closed');
    }
}

Order.prototype.removeItem = function() {
    if (this.flag == 1) {
        for (i = 0; i < arguments.length; i++) {
            if (this.order_items.indexOf(arguments[i]) != -1) {
                this.order_items.splice(this.order_items.indexOf(arguments[i]), 1);
            }
        }
        return this.order_items;
    } else {
        throw new Error('Order was closed');
    }
}

Order.prototype.getOrderAmount = function() {
    this.price = 0;
    for (i = 0; i < this.order_items.length; i++) {
        this.price += this.order_items[i].calculatePrice();
    }
    console.log('Your order amount is: ' + this.price);
}

Order.prototype.getOrderCalory = function() {
    this.calory = 0;
    for (i = 0; i < this.order_items.length; i++) {
        this.calory += this.order_items[i].calculateCalories();
    }
    console.log('Your calory is: ' + this.calory);
}

Order.prototype.paidOrder = function(obj) {
        return Object.freeze(obj);
    }
    //End order class and methods

var hamburger = new Hamburger(Hamburger.SIZE_STANDART, Hamburger.STUFFING_CHEESE, Hamburger.STUFFING_POTATO, Hamburger.STUFFING_POTATO);
//hamburger.removeStuffing(Hamburger.STUFFING_POTATO, Hamburger.STUFFING_CHEESE);
//hamburger.addStuffing(Hamburger.STUFFING_POTATO, Hamburger.STUFFING_CHEESE);
//hamburger.getStuffing();
console.log(hamburger.getSize(), hamburger.calculateCalories(), hamburger.calculatePrice());

var salad = new Salad(Salad.SIZE_LARGE, Salad.CAESAR);
console.log(salad.getSize(), salad.calculateCalories(), salad.calculatePrice());

var drink = new Drink(Drink.SIZE_MEDIUM, Drink.COLA);
console.log(drink.getSize(), drink.calculateCalories(), drink.calculatePrice());

var order = new Order(salad, hamburger, drink);
order.getOrderAmount(); // show amount
order.getOrderCalory(); // show calory
order.paidOrder(order);
order.removeItem(hamburger); // Nothing