import { makeUUID } from "../Utils/makeTempId";

export class ProductImage {
    public id: string;
    public name: string;
    public url: string;
    public file: File | null;
    public order: number;
    public isNew?: boolean;
    constructor(image?: ProductImage) {
        if (image) {
            this.id = image.id;
            this.name = image.name;
            this.url = image.url;
            this.file = image.file;
            this.order = image.order;
            this.isNew = (image.isNew === undefined) ? false : image.isNew;
        } else {
            this.id = "";
            this.name = "";
            this.url = "";
            this.file = null;
            this.order = 0;
            this.isNew = true;
        }
        return this;
    }
}