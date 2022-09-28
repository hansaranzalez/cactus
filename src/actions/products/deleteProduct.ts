import Product from "../../entities/Product";
import Http from "../../Http";
import Store from "../../store/appStore";
import ProductsStore from "../../store/productsStore";

export default async function deleteProduct(product: Product): Promise<any> {
    try {
        if (!product.id) throw new Error('Product id is null')
        const response = await Http.del(`products/${product.id}`);
        if (response.status !== 200) throw new Error(response.message);
        ProductsStore.removeProductFromList(product.id)
        Store.setModalVisible(false);
        Store.setToast({
            message: response.message,
            type: "success-toast",
            visible: true,
        });
    } catch (error: any) {
        Store.setToast({
            message: (error as any).message,
            type: "danger-toast",
            visible: true,
        });
    }
}