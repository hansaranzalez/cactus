import Role from "../../entities/Role";
import User from "../../entities/User";
import Http from "../../Http";
import Store from "../../store/appStore";

export default async function assosiateRole(user: User, role: Role): Promise<any> {
    try {
        const response = await Http.get(`users/${user.id}/assosiate/${role.id}`);
        if (response.status !== 200) throw new Error(response.message);
        Store.setModalVisible(false);
        Store.setToast({
            message: response.message,
            type: "success-toast",
            visible: true,
        });
    } catch (error: any) {
        Store.setToast({
            message: (error as any).message,
            type: "danger-toast",
            visible: true,
        });
    }
}