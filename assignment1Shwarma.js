const Order = require("./assignment1Order");

const OrderState = Object.freeze({
    WELCOMING:   Symbol("welcoming"),
    SIZE:   Symbol("size"),
    TOPPINGS:   Symbol("toppings"),
    DRINKS:  Symbol("drinks"),
    DESSERT: Symbol("dessert")
});

module.exports = class ShwarmaOrder extends Order{
    constructor(){
        super();
        this.stateCur = OrderState.WELCOMING;
        this.sSize = "";
        this.sToppings = "";
        this.sDrinks = "";
        this.sItem = "shawarma";
        this.sDessert = "";
        this.price = 0;
    }
    handleInput(sInput){
        let aReturn = [];
        let totalPrice = 0;
        switch(this.stateCur){
            case OrderState.WELCOMING:
                this.stateCur = OrderState.SIZE;
                aReturn.push("Welcome to Rich's Shawarma.");
                aReturn.push("What size would you like?");
                this.price += 10;
                break;
            case OrderState.SIZE:
                this.stateCur = OrderState.TOPPINGS
                this.sSize = sInput;
                aReturn.push("What toppings would you like?");
                this.price += 5;
                break;
            case OrderState.TOPPINGS:
                this.stateCur = OrderState.DRINKS
                this.sToppings = sInput;
                aReturn.push("Would you like drinks with that?");
                this.price += 5;
                break;
            case OrderState.DRINKS:
                this.stateCur = OrderState.DESSERT;
                if(sInput.toLowerCase != "no"){
                    this.sDrinks = `${sInput} drinks, Thanks.`;
                } 
                aReturn.push("Thank-you for your order of");
                aReturn.push(`${this.sSize} ${this.sItem} with ${this.sToppings}`);
                if(this.sDrinks){
                    aReturn.push(this.sDrinks);
                } else {
                    this.price += 2;
                }
                aReturn.push(`What dessert you would like?`);
                break;
            case OrderState.DESSERT:
                this.isDone(true);
                this.sDessert = sInput;
                aReturn.push("Thank you for your order of");
                aReturn.push(`${this.sDessert}`);
                this.price += 5;

                let d = new Date();
                d.setMinutes(d.getMinutes() + 20);
                aReturn.push(`Please pick it up at ${d.toTimeString()}`);
                aReturn.push(`Your total is: $${this.price}.`);
                break;
        }
        return aReturn;
    }
}