import { PaginationMetaContract } from "../@types";
import Category from "./Category";

export interface ProductStatus {
    id: number,
    name: string,
}

export interface MinMax {
    min: number,
    max: number,
}

export class ProductFilters {
    public pagination: PaginationMetaContract;
    public searchQuery: string;
    public category: Category;
    public price: MinMax;
    public quantity: MinMax;
    public status: ProductStatus;

    constructor(filters?: ProductFilters) {
        if (filters) {
            this.pagination = filters.pagination;
            this.searchQuery = filters.searchQuery;
            this.category = filters.category;
            this.price = filters.price;
            this.quantity = filters.quantity;
            this.status = filters.status;
        } else {
            this.pagination = {
                totalItems: 0,
                itemCount: 0,
                itemsPerPage: 10,
                totalPages: 0,
                currentPage: 1,
            };
            this.searchQuery = '';
            this.category = new Category();
            this.price = {
                min: 0,
                max: 0,
            };
            this.quantity = {
                min: 0,
                max: 0,
            };
            this.status = {
                id: 0,
                name: '',
            };
        }

        return this;
    }

}