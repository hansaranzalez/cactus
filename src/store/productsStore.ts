import { reactive, computed } from "vue";
import { PaginationMetaContract } from "../@types";
import Category from "../entities/Category";
import Product from "../entities/Product";
import { ProductImage } from "../entities/ProductImage";


interface StateContract {
    productsList: Product[];
    productsFormVisible: boolean;
    productsListLoading: boolean;
    productsFormIsEditing: boolean;
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
    productsFormIsEditing: false,
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
    list: {
        get: () => state.productsList,
        set: (value: Product[]) => state.productsList = value.map((product) => new Product(product)),
        isLoading: {
            get: () => state.productsListLoading,
            set: (value: boolean) => state.productsListLoading = value,
        },
        addProduct: (product: Product) => state.productsList.unshift(product),
        removeProduct: (id: string) => state.productsList = state.productsList.filter((product) => product.id !== id),
        getById: (id: string) => state.productsList.find((product) => product.id === id),
    },
    pagination: {
        get: () => state.paginationMeta,
        set: (value: PaginationMetaContract) => state.paginationMeta = value,
        currentPage: {
            get: () => state.paginationMeta.currentPage,
            set: (value: number) => state.paginationMeta.currentPage = value,
        }
    },
    searchQuery: {
        get: () => state.search,
        set: (value: string) => state.search = value,
    },
    form: {
        get: () => state.productFormPayload,
        set: (value: Product) => state.productFormPayload = value,
        isEditing: {
            get: () => state.productsFormIsEditing,
            set: (value: boolean) => state.productsFormIsEditing = value,
        },
        visible: {
            get: () => state.productsFormVisible,
            set: (value: boolean) => state.productsFormVisible = value,
        }
    },
    currentProductImages: {
        get: () => {
            console.log(state.productFormPayload.images)
            return state.productFormPayload.images.sort((a, b) => a.order - b.order);
        },
        setOrder: (imageId: string, order: number) => {
            // find and replace image
            console.log(imageId, order)
            const image = state.productFormPayload.images.find((img) => img.id === imageId);
            if (image) {
                image.order = order;
            }
        },
        add: (image: ProductImage, productImageId?: string) => {
            // find and replace image with first empty spot
            if (productImageId && productImageId !== '') {
                state.productFormPayload.images.splice(state.productsList.findIndex((img) => img.id === productImageId), 1, image);
                return;
            }
            state.productFormPayload.images.splice(state.productsList.findIndex((img) => img.id === ''), 1, image);
        },
        numOfImgs: () => state.productFormPayload.images.length,
        swapOrder: (imgAId: string, imgBId: string) => {
            const images = state.productFormPayload.images;
            const imgA = images.find(image => image.id === imgAId);
            const imgB = images.find(image => image.id === imgBId);
            if (imgA && imgB) {
                const imgAOrder = imgA.order;
                imgA.order = imgB.order;
                imgB.order = imgAOrder;
            }
            state.productFormPayload.images = images;
        },
        // reorder images after moving one image to another spot
        reorderImages: (imgAId: string, imgBId: string) => {
            const images = state.productFormPayload.images;
            const imgA = images.find(image => image.id === imgAId);
            const imgB = images.find(image => image.id === imgBId);
            if (imgA && imgB) {
                const imgAOrder = imgA.order;
                imgA.order = imgB.order;
                imgB.order = imgAOrder;
                console.log('imgB.order', imgB.order, 'imgA.order', imgA.order)
            }
            state.productFormPayload.images = images;
        },
        getLastOrder: () => {
            const images = state.productFormPayload.images.filter((img) => img.name !== '');
            const lastImage = images[images.length - 1];
            return lastImage ? lastImage.order + 1 : 0;
        },
        getImgById: (id: string) => state.productFormPayload.images.find((img) => img.id === id),
    },
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