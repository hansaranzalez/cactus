import { ElMessage } from "element-plus";
import Http from "../../Http";
import Store from "../../store/appStore";

export default async function deleteUserAvatar(avatarId: number, id: number): Promise<void> {
    try {
        const response = await Http.del(`users/${avatarId}/avatar/${id}`);
        if (response.status !== 200) throw new Error(response.message);
        ElMessage.success(response.message);
    } catch (error) {
        ElMessage.error((error as any).message);
    }
}