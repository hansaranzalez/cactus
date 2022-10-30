import Product from "./Product";
import ShoppingCartProduct from "./ShoppingCartProduct";

export default class ShoppingCart {
    public id: string;
    public products: ShoppingCartProduct[];
    public total_price: number;

    constructor(shoppingCart?: ShoppingCart) {
        if (shoppingCart) {
            this.id = shoppingCart.id;
            this.products = shoppingCart.products;
            this.total_price = shoppingCart.total_price;
        } else {
            this.id = '';
            this.products = [];
            this.total_price = 0;
        }
        return this;
    }
}