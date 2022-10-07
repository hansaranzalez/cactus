import { ElMessage } from "element-plus";
import Http from "../../Http";
import Store from "../../store/appStore";
import ProductsStore from "../../store/productsStore";

export default async function getProductsList(): Promise<void> {
    ProductsStore.setProductsListLoading(true)
    try {
        const page = ProductsStore.getPaginationMeta().currentPage;
        const limit = ProductsStore.getPaginationMeta().itemsPerPage;
        const search = ProductsStore.getSearchQuery();
        const response = await Http.get(`products?page=${page}&limit=${limit}&search=${search}`);
        ProductsStore.setProductsList(response.items);
        ProductsStore.setPaginationMeta(response.meta);
        ProductsStore.setProductsListLoading(false)
    } catch (error: any) {
        ElMessage.error(error.message);
        ProductsStore.setProductsListLoading(false)
    }
    
}