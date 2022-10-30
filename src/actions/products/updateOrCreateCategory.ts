import { ElMessage } from "element-plus";
import Category from "../../entities/Category";
import Http from "../../Http";
import ProductsStore from "../../store/productsStore";

export default async function updateOrCreateCategory(category: Category, id?: number): Promise<any> {
    try {
        if (id) {
            const response = await Http.patch(
                `categories/${category.id}`,
                {
                    name: category.name,
                    description: category.description,
                }
            );
            if (response.status !== 200) throw new Error(response.message);
            ElMessage.success(response.message);
            ProductsStore.updateCategoryFromList(new Category(response.data));
            return;
        }
        const response = await Http.post("categories", {
            name: category.name,
            description: category.description,
        });
        if (response.status !== 200) throw new Error(response.message);
        if (!response.data.id) throw new Error("Category procesing error");
        ProductsStore.setCategorieFormPayload(response.data);
        console.log(response.data)
        ProductsStore.addCategoryIntoList(new Category(response.data));
        ElMessage.success(response.message);
    } catch (error) {
        ElMessage.error((error as any).message);
    }
}