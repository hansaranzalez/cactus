import ProductsStore from "../../store/productsStore";
import appStore from "../../store/appStore";
import Http from "../../Http";
import { ElMessage } from "element-plus";


export default async function getCategoriesList(): Promise<void> {
    try {
        const response = await Http.get(`categories`);
        ProductsStore.setCategoriesList(response.items);
    } catch (error: any) {
        ElMessage.error(error.message)
    }
    
}