import Http from "../../Http";
import Store from "../../store/appStore";

export default async function deleteProductImage(productId: number, id: number): Promise<void> {
    try {
        const response = await Http.del(`products/${productId}/upload/${id}`);
        if (response.status !== 200) throw new Error(response.message);
        Store.setToast({
            message: response.message,
            visible: true,
            type: "success-toast",
        });
    } catch (error) {
        Store.setToast({
            message: (error as any).message,
            visible: true,
            type: "danger-toast",
        });
    }
}