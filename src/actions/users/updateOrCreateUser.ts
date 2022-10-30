import { ElMessage } from "element-plus";
import User from "../../entities/Client";
import Http from "../../Http";
import Store from "../../store/appStore";
import UsersStore from "../../store/usersStore";

export default async function updateOrCreateUser(user: User, id?: number): Promise<any> {
    try {
        if (id) {
            const response = await Http.patch(
                `users/${id}`,
                {
                    name: user.name,
                    lastname: user.lastname,
                    email: user.email,
                },
            );
            if (response.status !== 200) throw new Error(response.message);
            ElMessage.success(response.message);
            return;
        }
        

        const response = await Http.post("users", {
            name: user.name,
            lastname: user.lastname,
            email: user.email,
            password: user.password,
        },);
        if (response.status !== 200) throw new Error(response.message);
        if (!response.data.id) throw new Error("User procesing error");
        UsersStore.setUser(response.data);
        ElMessage.success(response.message);
    } catch (error) {
        ElMessage.error((error as any).message);
    }
}