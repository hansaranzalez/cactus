import ShoppingCart from "./ShoppingCart";
import User from "./User";

export default class ShoppingSession {
    public id: string;
    public user: User;
    public cart: ShoppingCart;
    public delivery_fee: number;
    public discount: number;
    public active: boolean;
    public total_price: number;

    constructor(shoppingSession?: ShoppingSession) {
        if(shoppingSession) {
            this.id = shoppingSession.id;
            this.user = shoppingSession.user;
            this.cart = shoppingSession.cart;
            this.delivery_fee = shoppingSession.delivery_fee;
            this.discount = shoppingSession.discount;
            this.active = shoppingSession.active;
            this.total_price = shoppingSession.total_price;
        } else {
            this.id = '';
            this.user = new User();
            this.cart = new ShoppingCart();
            this.delivery_fee = 0;
            this.discount = 0;
            this.active = true;
            this.total_price = 0;
        }
    }
}