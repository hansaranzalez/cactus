import { ElMessage } from "element-plus";
import Product from "../../entities/Product";
import Http from "../../Http";
import ProductsStore from "../../store/productsStore";

export default async function deleteProduct(product: Product): Promise<any> {
    try {
        if (!product.id) throw new Error('Product id is null')
        const response = await Http.del(`products/${product.id}`);
        if (response.status !== 200) throw new Error(response.message);
        ProductsStore.list.removeProduct(product.id)
        ElMessage.success(response.message);
    } catch (error: any) {
        ElMessage.error(error.message);
    }
}