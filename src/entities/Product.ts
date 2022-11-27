import Category from "./Category";

export interface ImagesContract {
    id: number;
    name: string;
    url: string;
    file: File;
    order: number;
}

export default class Product {

    public id: number | null;
    public name: string;
    public description: string;
    public price: number;
    public cost_per_unit: number;
    public quantity: number;
    public allow_purchase_when_out_of_stock: boolean;
    public visible: boolean;
    public created_at: string;
    public updated_at: string;
    public images: ImagesContract[];
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
            this.visible = product.visible;
            this.images = productImgs(product.images);
            this.category = product.category;
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
            this.visible = false;
            this.images = productImgs([]);
            this.category = new Category();
            this.created_at = "";
            this.updated_at = "";
        }

        return this;

    }

}


function productImgs(images: ImagesContract[]) {
     // return total of 8 images combine with empty images if needed
     const emptyImages = Array(8 - images.length).fill({ url: '', name: '' });
     // add unique id to each image
     return [...images, ...emptyImages].map((image, index) => ({ ...image, id: index + 1, order: index + 1 }));

}