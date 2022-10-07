import { ElMessage } from "element-plus";
import Http from "../../Http";
import Store from "../../store/appStore";
import UsersStore from "../../store/usersStore";


export default async function deleteUser(): Promise<any> {
    try {
        const response = await Http.del(`users/${UsersStore.getUser().id}`);
        if (response.status !== 200) throw new Error(response.message);
        UsersStore.removeUserFromList(UsersStore.getUser().id)
        ElMessage.success(response.message);
    } catch (error: any) {
        ElMessage.error(error.message);
    }
}