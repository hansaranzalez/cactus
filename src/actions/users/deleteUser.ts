import Http from "../../Http";
import Store from "../../store/appStore";
import UsersStore from "../../store/usersStore";


export default async function deleteUser(): Promise<any> {
    try {
        const response = await Http.del(`users/${UsersStore.getUser().id}`);
        if (response.status !== 200) throw new Error(response.message);
        UsersStore.removeUserFromList(UsersStore.getUser().id)
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