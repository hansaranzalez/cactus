import { ElMessage } from "element-plus";
import Product from "../../entities/Product";
import Http from "../../Http";
import Store from "../../store/appStore";
import ProductsStore from "../../store/productsStore";

export default async function updateOrCreateProduct(product: Product, id?: number): Promise<any> {
    try {
        if (id) {
            const response = await Http.patch(
                `products/${product.id}`,
                {
                    name: product.name,
                    price: product.price,
                    description: product.description,
                    in_stock: product.in_stock,
                }
            );
            if (response.status !== 200) throw new Error(response.message);
            ElMessage.success(response.message);
            return;
        }
        

        const response = await Http.post("products", {
            name: product.name,
            price: product.price,
            description: product.description,
            in_stock: product.in_stock,
        });
        if (response.status !== 200) throw new Error(response.message);
        if (!response.data.id) throw new Error("Product procesing error");
        ProductsStore.setProductFormPayload(response.data);
        ElMessage.success(response.message);
    } catch (error) {
        ElMessage.error((error as any).message);
    }
}
