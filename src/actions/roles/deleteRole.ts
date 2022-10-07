import { ElMessage } from "element-plus";
import Http from "../../Http";
import Store from "../../store/appStore";
import RolesStore from "../../store/rolesStore";


export default async function deleteRole(): Promise<any> {
    try {
        const response = await Http.del(`roles/${RolesStore.getRole().id}`);
        if (response.status !== 200) throw new Error(response.message);
        RolesStore.removeRoleFromList(RolesStore.getRole().id)
        ElMessage.success(response.message);
    } catch (error: any) {
        ElMessage.error(error.message);
    }
}