import { reactive, computed } from "vue";
import { PaginationMetaContract } from "../@types";
import Product from "../entities/Product";


interface StateContract {
    productsList: Product[];
    productsListLoading: boolean;
    isEditing: boolean;
    productFormPayload: Product,
    search: string,
    paginationMeta: PaginationMetaContract,
}

const state = reactive<StateContract>({
    productsList: [],
    productsListLoading: false,
    isEditing: false,
    productFormPayload: new Product(),
    search: '',
    paginationMeta: {
        totalItems: 0,
        itemCount: 0,
        itemsPerPage: 10,
        totalPages: 0,
        currentPage: 1,
    },
});

const ProductsStore = () => ({
    getProductsListLoading: (): boolean => state.productsListLoading,
    setProductsListLoading: (value: boolean): void => {state.productsListLoading = value },
    setPaginationCurrentPage: (page: number): void => { state.paginationMeta.currentPage = page },
    getPaginationMeta: (): PaginationMetaContract => state.paginationMeta,
    setPaginationMeta: (pagination: PaginationMetaContract): void => { state.paginationMeta = pagination },
    getSearchQuery: (): string => state.search,
    setSearchQuery: (search: string): void => { state.search = search },
    getProductFormPayload: (): Product => state.productFormPayload,
    setProductFormPayload: (product: Product): void => { state.productFormPayload = product },
    getIsEditing: (): boolean => state.isEditing,
    setIsEditing: (value: boolean): void => { state.isEditing = value },
    getProductsList: (): Product[] => state.productsList,
    setProductsList: (products: Product[]): void => { state.productsList = products },
    addProductIntoList: (product: Product): void => { state.productsList.unshift(product) },
    getProductByIdFromList: (id: number): Product | undefined => state.productsList.find((prod) => prod.id === id),
    removeProductFromList: (id: number): void => { state.productsList = state.productsList.filter((prod) => prod.id !== id) }
})

export default computed(() => ProductsStore()).value;