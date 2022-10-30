import { ElMessage } from "element-plus";
import Category from "../../entities/Category";
import Http from "../../Http";
import ProductsStore from "../../store/productsStore";

export default async function deleteCategory(category: Category): Promise<any> {
    try {
        if (!category.id) throw new Error('Category id is null')
        const response = await Http.del(`categories/${category.id}`);
        if (response.status !== 200) throw new Error(response.message);
        ProductsStore.removeCategoryFromList(category.id)
        ElMessage.success(response.message);
    } catch (error: any) {
        ElMessage.error(error.message);
    }
}