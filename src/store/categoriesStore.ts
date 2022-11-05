import { computed, reactive } from "vue";
import { PaginationMetaContract } from "../@types";
import Category from "../entities/Category";

interface CategoriesStateContract {
    categories: Category[];
    loading: boolean;
    error: boolean;
    categoryFormPayload: Category;
    isEditing: boolean;
    paginationMeta: PaginationMetaContract;
    formVisible: boolean;
}

const state = reactive<CategoriesStateContract>({
    categories: [],
    loading: false,
    error: false,
    categoryFormPayload: new Category(),
    isEditing: false,
    paginationMeta: {
        totalItems: 0,
        itemCount: 0,
        itemsPerPage: 10,
        totalPages: 0,
        currentPage: 1,
    },
    formVisible: false,
});

const CategoriesStore = computed(() => ({
    categories: {
        get: (): Category[] => state.categories,
        set: (categories: Category[]): void => { state.categories = categories },
    },
    loading: {
        get: (): boolean => state.loading,
        set: (value: boolean): void => { state.loading = value },
    },
    error: {
        get: (): boolean => state.error,
        set: (value: boolean): void => { state.error = value },
    },
    categoryFormPayload: {
        get: (): Category => state.categoryFormPayload,
        set: (category: Category): void => { state.categoryFormPayload = category },
    },
    isEditing: {
        get: (): boolean => state.isEditing,
        set: (value: boolean): void => { state.isEditing = value },
    },
    paginationMeta: {
        get: (): PaginationMetaContract => state.paginationMeta,
        set: (pagination: PaginationMetaContract): void => { state.paginationMeta = pagination },
    },
    formVisible: {
        get: (): boolean => state.formVisible,
        set: (value: boolean): void => { state.formVisible = value },
    },
}));

export default CategoriesStore.value;