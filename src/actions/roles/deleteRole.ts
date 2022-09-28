import Http from "../../Http";
import Store from "../../store/appStore";
import RolesStore from "../../store/rolesStore";


export default async function deleteRole(): Promise<any> {
    try {
        const response = await Http.del(`roles/${RolesStore.getRole().id}`);
        if (response.status !== 200) throw new Error(response.message);
        RolesStore.removeRoleFromList(RolesStore.getRole().id)
        Store().setModalVisible(false);
        Store().setToast({
            message: response.message,
            type: "success-toast",
            visible: true,
        });
    } catch (error: any) {
        Store().setToast({
            message: (error as any).message,
            type: "danger-toast",
            visible: true,
        });
    }
}