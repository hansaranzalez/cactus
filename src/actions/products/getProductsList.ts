import { ElMessage } from "element-plus";
import Http from "../../Http";
import ProductsStore from "../../store/productsStore";

export default async function getProductsList(): Promise<void> {
    ProductsStore.list.isLoading.set(true)
    try {
        const page = ProductsStore.pagination.currentPage.get();
        const limit = ProductsStore.pagination.get().itemsPerPage;
        const search = ProductsStore.searchQuery.get();
        const response = await Http.get(`products?page=${page}&limit=${limit}&search=${search}`);
        ProductsStore.list.set(response.items);
        ProductsStore.pagination.set(response.meta);
        ProductsStore.list.isLoading.set(false)
    } catch (error: any) {
        ElMessage.error(error.message);
        ProductsStore.list.isLoading.set(false)
    }
    
}