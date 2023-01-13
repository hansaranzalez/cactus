import { ElMessage } from "element-plus";
import Http from "../../Http";
import ProductsStore from "../../store/productsStore";

export default async function getProductsList(): Promise<void> {
    ProductsStore.list.isLoading.set(true)
    try {
        const page = ProductsStore.filters.get().pagination.currentPage;
        const limit = ProductsStore.filters.get().pagination.itemsPerPage;
        const search = ProductsStore.filters.get().searchQuery;
        const categoryId = ProductsStore.filters.get().category.id;
        const statusId = ProductsStore.filters.get().status.id;
        const response = await Http.get(`products?page=${page}&limit=${limit}&search=${search}&category=${categoryId}&status=${statusId}`);
        ProductsStore.list.set(response.items);
        ProductsStore.filters.sePagination(response.meta);
        ProductsStore.list.isLoading.set(false)
    } catch (error: any) {
        ElMessage.error(error.message);
        ProductsStore.list.isLoading.set(false)
    }
    
}