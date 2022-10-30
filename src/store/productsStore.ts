import { reactive, computed } from "vue";
import { PaginationMetaContract } from "../@types";
import Category from "../entities/Category";
import Product from "../entities/Product";


interface StateContract {
    productsList: Product[];
    productsFormVisible: boolean;
    productsListLoading: boolean;
    productsFormEditing: boolean;
    productFormPayload: Product,
    search: string,
    paginationMeta: PaginationMetaContract,
    categoriesList: Category[],
    categoriesFormVisible: boolean,
    categoriesFormEditing: boolean,
}

const state = reactive<StateContract>({
    productsList: [],
    productsFormVisible: false,
    productsListLoading: false,
    productsFormEditing: false,
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
    categoriesFormEditing: false,
    categoriesFormVisible: false,
});

const ProductsStore = () => ({
    showProductsForm: () => { state.productsFormVisible = true },
    hideProductsForm: () => { state.productsFormVisible = false },
    productsFormVisible: () => state.productsFormVisible,
    getProductsListLoading: (): boolean => state.productsListLoading,
    setProductsListLoading: (value: boolean): void => { state.productsListLoading = value },
    setPaginationCurrentPage: (page: number): void => { state.paginationMeta.currentPage = page },
    getPaginationMeta: (): PaginationMetaContract => state.paginationMeta,
    setPaginationMeta: (pagination: PaginationMetaContract): void => { state.paginationMeta = pagination },
    getSearchQuery: (): string => state.search,
    setSearchQuery: (search: string): void => { state.search = search },
    getProductFormPayload: (): Product => state.productFormPayload,
    setProductFormPayload: (product: Product): void => { state.productFormPayload = product },
    productsFormEdit: (): boolean => state.productsFormEditing,
    setProductsFormEdit: (value: boolean): void => { state.productsFormEditing = value },
    getProductsList: (): Product[] => state.productsList,
    setProductsList: (products: Product[]): void => { state.productsList = products },
    addProductIntoList: (product: Product): void => { state.productsList.unshift(product) },
    getProductByIdFromList: (id: number): Product | undefined => state.productsList.find((prod) => prod.id === id),
    removeProductFromList: (id: number): void => { state.productsList = state.productsList.filter((prod) => prod.id !== id) },
    // categories
    categoriesFormEditing: (): boolean => state.categoriesFormEditing,
    setCategoriesFormEditing: (value: boolean): void => { state.categoriesFormEditing = value },
    getCategoriesList: (): Category[] => state.categoriesList,
    setCategoriesList: (categories: Category[]): void => { state.categoriesList = categories },
    areCategoriesLoaded: computed(() => state.categoriesList.length > 0),
    getProductsByCategory: (categoryId: number): Product[] => state.productsList.filter((prod) => prod.category.id === categoryId),
    showCategoriesForm: () => { state.categoriesFormVisible = true },
    hideCategoriesForm: () => { state.categoriesFormVisible = false },
    categoriesFormVisible: () => state.categoriesFormVisible,
    setCategorieFormPayload: (category: Category): void => { state.productFormPayload.category = category },
    getCategorieFormPayload: (): Category => state.productFormPayload.category,
    removeCategoryFromList: (id: number): void => { state.categoriesList = state.categoriesList.filter((cat) => cat.id !== id) },
    addCategoryIntoList: (category: Category): void => { state.categoriesList.unshift(category) },
    updateCategoryFromList: (category: Category): void => {
        const index = state.categoriesList.findIndex((cat) => cat.id === category.id);
        state.categoriesList[index] = category;
    }
})

export default computed(() => ProductsStore()).value;