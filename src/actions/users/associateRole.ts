import { ElMessage } from "element-plus";
import Role from "../../entities/Role";
import User from "../../entities/User";
import Http from "../../Http";
import Store from "../../store/appStore";

export default async function assosiateRole(user: User, role: Role): Promise<any> {
    try {
        const response = await Http.get(`users/${user.id}/assosiate/${role.id}`);
        if (response.status !== 200) throw new Error(response.message);
       ElMessage.success(response.message);
    } catch (error: any) {
        ElMessage.error(error.message);
    }
}