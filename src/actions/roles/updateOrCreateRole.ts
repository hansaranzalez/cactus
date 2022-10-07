import Http from "../../Http";
import RolesStore from "../../store/rolesStore";
import Role from "../../entities/Role";
import { ElMessage } from "element-plus";

export default async function updateOrCreateRole(role: Role, id?: number): Promise<any> {
    try {
        if (id) {
            const response = await Http.patch(
                `roles/${role.id}`,
                {
                    name: role.name,
                    description: role.description,
                },
            );
            if (response.status !== 200) throw new Error(response.message);
            ElMessage.success(response.message);
            return;
        }
        

        const response = await Http.post("roles", {
            name: role.name,
            description: role.description,
        },);
        if (response.status !== 200) throw new Error(response.message);
        if (!response.data.id) throw new Error("Role procesing error");
        RolesStore.setRole(response.data);
        ElMessage.success(response.message);
    } catch (error) {
        ElMessage.error((error as any).message);
    }
}