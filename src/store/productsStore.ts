import { reactive, computed } from "vue";
import { PaginationMetaContract } from "../@types";
import Category from "../entities/Category";
import Product from "../entities/Product";


interface StateContract {
    productsList: Product[];
    productsFormVisible: boolean;
    productsListLoading: boolean;
    isEditing: boolean;
    productFormPayload: Product,
    search: string,
    paginationMeta: PaginationMetaContract,
    categoriesList: Category[],
}

const state = reactive<StateContract>({
    productsList: [],
    productsFormVisible: false,
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
    categoriesList: [],
});

const ProductsStore = () => ({
    showProductsForm: () => { state.productsFormVisible = true },
    hideProductsForm: () => { state.productsFormVisible = false },
    productsFormVisible: () => state.productsFormVisible,
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
    removeProductFromList: (id: number): void => { state.productsList = state.productsList.filter((prod) => prod.id !== id) },
    getCategoriesList: (): Category[] => state.categoriesList,
    setCategoriesList: (categories: Category[]): void => { state.categoriesList = categories },
    areCategoriesLoaded: computed(() => state.categoriesList.length > 0),
    getProductsByCategory: (categoryId: number): Product[] => state.productsList.filter((prod) => prod.category.id === categoryId),
})

export default computed(() => ProductsStore()).value;