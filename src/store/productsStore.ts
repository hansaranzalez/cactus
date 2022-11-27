import { reactive, computed } from "vue";
import { PaginationMetaContract } from "../@types";
import Category from "../entities/Category";
import Product, { ImagesContract } from "../entities/Product";


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

    productFormVisible: {
        get: () => state.productsFormVisible,
        set: (value: boolean) => state.productsFormVisible = value,
    },
    getProductsListLoading: (): boolean => state.productsListLoading,
    setProductsListLoading: (value: boolean): void => { state.productsListLoading = value },
    setPaginationCurrentPage: (page: number): void => { state.paginationMeta.currentPage = page },
    getPaginationMeta: (): PaginationMetaContract => state.paginationMeta,
    setPaginationMeta: (pagination: PaginationMetaContract): void => { state.paginationMeta = pagination },
    getSearchQuery: (): string => state.search,
    setSearchQuery: (search: string): void => { state.search = search },
    getProductFormPayload: (): Product => state.productFormPayload,
    getProductFormPayloadImages: (): ImagesContract[] => {
        // sort by order
        return state.productFormPayload.images.sort((a, b) => a.order - b.order);
    },
    addProductFormPayloadImage: (image: ImagesContract, imageSpotId: number): void => {
        // find and replace image
        const imageSpot = state.productFormPayload.images.find((img) => img.id === imageSpotId);
        if (imageSpot) {
            imageSpot.name = image.name;
            imageSpot.url = image.url;
        }
    },
    setProductFormPayloadImageOrder: (imageId: number, order: number): void => {
        // find and replace image
        const image = state.productFormPayload.images.find((img) => img.id === imageId);
        if (image) {
            image.order = order;
        }
    },
    swapProductImageOrder(imgAId: number, imgBId: number): void {
        const images = state.productFormPayload.images;
        const imgA = images.find(image => image.id === Number(imgAId));
        const imgB = images.find(image => image.id === Number(imgBId));
        if (imgA && imgB) {
            const imgAOrder = imgA.order;
            imgA.order = imgB.order;
            imgB.order = imgAOrder;
        }
        state.productFormPayload.images = images;
    },
    setProductFormPayload: (product: Product): void => { state.productFormPayload = product },
    addProductImage: (image: ImagesContract): void => { state.productFormPayload.images.push(image) },
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
    },
   
})

export default computed(() => ProductsStore()).value;