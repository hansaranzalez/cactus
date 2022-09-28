import Http from "../../Http";
import Store from "../../store/appStore";
import RolesStore from "../../store/rolesStore";
import Role from "../../entities/Role";

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
            Store().setToast({
                message: response.message,
                type: "success-toast",
                visible: true,
            });
            return;
        }
        

        const response = await Http.post("roles", {
            name: role.name,
            description: role.description,
        },);
        if (response.status !== 200) throw new Error(response.message);
        if (!response.data.id) throw new Error("Role procesing error");
        RolesStore.setRole(response.data);
        Store().setToast({
            message: response.message,
            type: "success-toast",
            visible: true,
        });
    } catch (error) {
        Store().setToast({
            message: (error as any).message,
            type: "danger-toast",
            visible: true,
        });
    }
}