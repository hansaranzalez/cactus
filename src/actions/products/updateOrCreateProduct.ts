import { ElMessage } from "element-plus";
import Product from "../../entities/Product";
import Http from "../../Http";
import ProductsStore from "../../store/productsStore";
import {updateImagesOrder} from "./updateImagesOrder";

export default async function updateOrCreateProduct(product: Product, id?: string | null): Promise<any> {
    try {
        if (id) {
            const response = await Http.patch(
                `products/${product.id}`,
                {
                    name: product.name,
                    description: product.description,
                    category: product.category,
                    quantity: product.quantity,
                    price: product.price,
                    cost_per_unit: product.cost_per_unit,
                    allow_purchase_when_out_of_stock: product.allow_purchase_when_out_of_stock,
                    active: product.active,
                }
            );
            await updateImagesOrder();
            if (response.status !== 200) throw new Error(response.message);

            ElMessage.success(response.message);
            return;
        }


        const response = await Http.post("products",
            {
                name: product.name,
                description: product.description,
                category: product.category,
                quantity: product.quantity,
                price: product.price,
                cost_per_unit: product.cost_per_unit,
                allow_purchase_when_out_of_stock: product.allow_purchase_when_out_of_stock,
                active: product.active,
            });
        if (response.status !== 200) throw new Error(response.message);
        if (!response.data.id) throw new Error("Product procesing error");
        response.data.images = product.images;
        ProductsStore.product.set(new Product(response.data));
        ElMessage.success(response.message);
    } catch (error) {
        ElMessage.error((error as any).message);
    }
}
