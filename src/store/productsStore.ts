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
    product: Product,
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
    product: new Product(),
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
        set: (value: Product[]) => {
            console.log(value)
            state.productsList = value.map((product) => new Product(product))},
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
    product: {
        get: (): Product => {
            console.log(state.product)
            return state.product},
        set: (value: Product) => state.product = value,
        isEditing: {
            get: (): boolean => state.productsFormIsEditing,
            set: (value: boolean) => state.productsFormIsEditing = value,
        },
        visible: {
            get: (): boolean => state.productsFormVisible,
            set: (value: boolean) => state.productsFormVisible = value,
        },
        getCategory: () => state.product.category,
    },
    currentProductImages: {
        get: () => {
            return state.product.images.sort((a, b) => a.order - b.order);
        },
        setOrder: (imageId: string, order: number) => {
            // find image
            const image = state.product.images.find((img) => String(img.id) === String(imageId));
        },
        add: (image: ProductImage, productImageId?: string) => {
            // if number of non-empty images is 8, return
            if (state.product.images.filter((img) => img.name !== '').length === 8) return;
            if (productImageId) {
                const foundImg = state.product.images.find((img) => String(img.id) === String(productImageId));
                if (foundImg) {
                    const order = foundImg.order;
                    const index = state.product.images.findIndex((img) => String(img.id) === String(productImageId));
                    if (index !== -1) {
                        state.product.images.splice(index, 1, image);
                        state.product.images[index].order = order;
                    }
                }
            }
            const emptyImageIndex = state.product.images.findIndex((img) => img.name === '');
            if (emptyImageIndex !== -1) {
                state.product.images.splice(emptyImageIndex, 1);
            }
            const lastImageOrder = state.product.images.find((img) => img.name !== '')?.order || 0;
            image.order = (lastImageOrder) ? lastImageOrder + 1 : 0;
            state.product.images.push(image);
        },
        numOfImgs: () => state.product.images.length,
        swapOrder: (imgAId: string, imgBId: string) => {
            const images = state.product.images;
            const imgA = images.find(image => image.id === imgAId);
            const imgB = images.find(image => image.id === imgBId);
            if (imgA && imgB) {
                const imgAOrder = imgA.order;
                imgA.order = imgB.order;
                imgB.order = imgAOrder;
            }
            state.product.images = images;
        },
        // reorder images after moving one image to another spot
        reorderImages: (imgAId: string, imgBId: string) => {
            const images = state.product.images;
            const imgA = images.find(image => image.id === imgAId);
            const imgB = images.find(image => image.id === imgBId);
            if (imgA && imgB) {
                const imgAOrder = imgA.order;
                const imgBOrder = imgB.order;
                const imgAIndex = images.findIndex(image => image.id === imgAId);
                const imgBIndex = images.findIndex(image => image.id === imgBId);
                if (imgAIndex !== -1 && imgBIndex !== -1) {
                    images.splice(imgAIndex, 1, imgB);
                    images.splice(imgBIndex, 1, imgA);
                    imgA.order = imgBOrder;
                    imgB.order = imgAOrder;
                }
            }
            state.product.images = images;
        },
        getLastOrder: () => {
            const images = state.product.images.filter((img) => img.name !== '');
            const lastImage = images[images.length - 1];
            return lastImage ? lastImage.order + 1 : 0;
        },
        getImgById: (id: string) => state.product.images.find((img) => img.id === id),
        delete: (id: string) => {
            const index = state.product.images.findIndex((img) => img.id === id);
            console.log(index)
            if (index !== -1) {

                // add empty image
                const emptyImg = new ProductImage();
                emptyImg.order = 99999;
                state.product.images.push(emptyImg);

                // remove image
                state.product.images.splice(index, 1);
            }
        }
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
    setCategorieFormPayload: (category: Category): void => { state.product.category = category },
    getCategorieFormPayload: (): Category => state.product.category,
    removeCategoryFromList: (id: number): void => { state.categoriesList = state.categoriesList.filter((cat) => cat.id !== id) },
    addCategoryIntoList: (category: Category): void => { state.categoriesList.unshift(category) },
    updateCategoryFromList: (category: Category): void => {
        const index = state.categoriesList.findIndex((cat) => cat.id === category.id);
        state.categoriesList[index] = category;
    },

})

export default computed(() => ProductsStore()).value;