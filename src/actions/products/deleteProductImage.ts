import { ElMessage } from "element-plus";
import Http from "../../Http";
import Store from "../../store/appStore";

export default async function deleteProductImage(productId: number, id: number): Promise<void> {
    try {
        const response = await Http.del(`products/${productId}/upload/${id}`);
        if (response.status !== 200) throw new Error(response.message);
        ElMessage.success(response.message);
    } catch (error: any) {
        ElMessage.error(error.message);
    }
}