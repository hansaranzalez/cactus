import Product from "./Product";

export default class ShoppingCartProduct {
    public id?: number | null;
    public product: Product;
    public quantity: number;
    public price: number;

    constructor(shoppingCartProduct?: ShoppingCartProduct) {
        if (shoppingCartProduct) {
            this.id = shoppingCartProduct.id || null;
            this.product = shoppingCartProduct.product;
            this.quantity = shoppingCartProduct.quantity;
            this.price = shoppingCartProduct.price;
        } else {
            this.id = null;
            this.product = new Product();
            this.quantity = 0;
            this.price = 0;
        }

        return this;
    }

}
   