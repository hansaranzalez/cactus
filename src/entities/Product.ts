import Category from "./Category";

interface ProductContract {
    id: number | null;
    name: string;
    description: string;
    price: number | null;
    in_stock: number | null;
    created_at: string;
    updated_at: string;
}

interface ImagesContract {
    name: string;
    url: string;
}

export default class Product implements ProductContract {

    public id: number | null;
    public name: string;
    public description: string;
    public price: number | null;
    public in_stock: number | null;
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
            this.in_stock = product.in_stock;
            this.images = product.images;
            this.category = product.category;
            this.created_at = product.created_at;
            this.updated_at = product.updated_at;
        } else {
            this.id = null;
            this.name = "";
            this.description = "";
            this.price = null;
            this.in_stock = null;
            this.images = [];
            this.category = new Category();
            this.created_at = "";
            this.updated_at = "";
        }

        return {
            id: this.id,
            name: this.name,
            description: this.description,
            price: this.price,
            in_stock: this.in_stock,
            images: this.images,
            category: this.category,
            created_at: this.created_at,
            updated_at: this.updated_at,
        };

    }

}
