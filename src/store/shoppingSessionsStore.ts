import { ElMessage, UploadProps, UploadRawFile } from "element-plus";
import { reactive, computed, watch } from "vue";
import { PaginationMetaContract } from "../@types";
import ShoppingSession from "../entities/ShoppingSession";
import Http from "../Http";
import router from "../router";


interface UsersStoreStateContract {
    shoppingSessions: ShoppingSession[];
    currentShoppingSession: ShoppingSession | null;
    shoppingSessionsListLoading: boolean;
    search: string,
    paginationMeta: PaginationMetaContract,
    inView: boolean,
}

const state = reactive<UsersStoreStateContract>({
    shoppingSessions: [],
    currentShoppingSession: null,
    shoppingSessionsListLoading: false,
    search: '',
    paginationMeta: {
        totalItems: 0,
        itemCount: 0,
        itemsPerPage: 10,
        totalPages: 0,
        currentPage: 1,
    },
    inView: false,
});


watch(() => state.inView, async (inView) => {
    if (inView) {
        await ShoppingSessionsStore().getShoppingSessions();
    }
})


const ShoppingSessionsStore = () => ({
    currentShoppingSession: {
        get: () => state.currentShoppingSession,
        set: (shoppingSession: ShoppingSession) => {console.log(shoppingSession);state.currentShoppingSession = shoppingSession},
    },
    inView: {
        get: () => state.inView,
        set: (inView: boolean) => state.inView = inView,
    },
    shoppingSessions: {
        get: () => state.shoppingSessions,
        set: (shoppingSessions: ShoppingSession[]) => { state.shoppingSessions = shoppingSessions }
    },
    shoppingSessionsListLoading: {
        get: () => state.shoppingSessionsListLoading,
        set: (value: boolean) => { state.shoppingSessionsListLoading = value }
    },
    paginationMeta: {
        get: () => state.paginationMeta,
        set: (pagination: PaginationMetaContract) => { state.paginationMeta = pagination },
        getCurrentPage: () => state.paginationMeta.currentPage,
        setCurrentPage: (page: number) => { state.paginationMeta.currentPage = page },
    },
    search: {
        get: () => state.search,
        set: (search: string) => { state.search = search }
    },

    // http actions
    getShoppingSessions: async () => {
        state.shoppingSessionsListLoading = true;
        try {
            const page = state.paginationMeta.currentPage;
            const limit =   state.paginationMeta.itemsPerPage;
            const search =  state.search;
            const response = await Http.get(`shopping-sessions?page=${page}&limit=${limit}&search=${search}`);
            state.shoppingSessions = response.items.map((shoppingSession: any) => new ShoppingSession(shoppingSession));
            state.paginationMeta = response.meta;
            state.shoppingSessionsListLoading = false;
        } catch (error: any) {
            ElMessage.error(error.message);
            state.shoppingSessionsListLoading = false;
        }
    }

});


export default computed(() => ShoppingSessionsStore()).value;