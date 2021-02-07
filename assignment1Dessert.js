const Order = require("./assignment1Order");

const OrderState = Object.freeze({
    WELCOMING:   Symbol("welcoming"),
    SIZE:   Symbol("size"),
    TOPPINGS:   Symbol("toppings"),
    DRINKS:  Symbol("drinks")
});

module.exports = class DessertOrder extends Order{
    constructor(){
        super();
        this.stateCur = OrderState.WELCOMING;
        this.sSize = "";
        this.sToppings = "";
        this.sDrinks = "";
        this.sItem = "ice cream";
        this.price = 0;
    }
    handleInput(sInput){
        let aReturn = [];
        switch(this.stateCur){
            case OrderState.WELCOMING:
                this.stateCur = OrderState.SIZE;
                aReturn.push("Welcome to Emi's Ice Cream.");
                aReturn.push("What size would you like?");
                this.price += 10;
                break;
            case OrderState.SIZE:
                this.stateCur = OrderState.TOPPINGS
                this.sSize = sInput;
                aReturn.push("What ice cream topping would you like?");
                this.price += 5;
                break;
            case OrderState.TOPPINGS:
                this.stateCur = OrderState.DRINKS
                this.sToppings = sInput;
                aReturn.push("Would you like drinks with that?");
                this.price += 3;
                break;
            case OrderState.DRINKS:
                this.isDone(true);
                if(sInput.toLowerCase != "no"){
                    this.sDrinks = `${sInput} drinks, Thanks.`;
                } else {
                    this.price += 2;
                }
                aReturn.push("Thank-you for your order of");
                aReturn.push(`${this.sSize} ${this.sItem} with ${this.sToppings}`);
                if(this.sDrinks){
                    aReturn.push(this.sDrinks);
                }
                let d = new Date(); 
                d.setMinutes(d.getMinutes() + 20);
                aReturn.push(`Please pick it up at ${d.toTimeString()}`);
                aReturn.push(`Your ice cream order total is: $${this.price}`);
                break;
        }
        return aReturn;
    }
}