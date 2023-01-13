import { makeUUID } from "../Utils/makeTempId";
import Category from "./Category";
import { ProductImage } from "./ProductImage";




export default class Product {

    public id: string | null;
    public name: string;
    public description: string;
    public price: number;
    public cost_per_unit: number;
    public quantity: number;
    public allow_purchase_when_out_of_stock: boolean;
    public active: boolean;
    public created_at: string;
    public updated_at: string;
    public images: ProductImage[];
    public category: Category;

    constructor(product?: Product) {

        if (product) {
            this.id = product.id;
            this.name = product.name;
            this.description = product.description;
            this.price = product.price;
            this.cost_per_unit = product.cost_per_unit;
            this.quantity = product.quantity;
            this.allow_purchase_when_out_of_stock = product.allow_purchase_when_out_of_stock;
            this.active = product.active;
            this.images = productImgs(product.images);
            this.category = new Category(product.category);
            this.created_at = product.created_at;
            this.updated_at = product.updated_at;
        } else {
            this.id = null;
            this.name = "";
            this.description = "";
            this.price = 0;
            this.cost_per_unit = 0;
            this.quantity = 0;
            this.allow_purchase_when_out_of_stock = false;
            this.active = false;
            this.images = productImgs([]);
            this.category = new Category();
            this.created_at = "";
            this.updated_at = "";
        }

        return this;

    }

}


function productImgs(images: ProductImage[]) {
    // return total of 8 images combine with empty images if needed
    const emptyImages = makeEmptyImages(images.length);
    const productImages = images.map(image => (new ProductImage(image)));
    
    return [...productImages, ...emptyImages].sort((a, b) => a.order - b.order);
}

function makeEmptyImages(numberOfImagesFromProduct: number) {
    const emptyImages = Array(8 - numberOfImagesFromProduct).fill(new ProductImage());
    return emptyImages.map((image, index) => {
        const temp = new ProductImage(image);
        temp.order = 99999;
        return temp;
    });
}