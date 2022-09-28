import User from "../../entities/User";
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
            Store.setToast({
                message: response.message,
                type: "success-toast",
                visible: true,
            });
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
        Store.setToast({
            message: response.message,
            type: "success-toast",
            visible: true,
        });
    } catch (error) {
        Store.setToast({
            message: (error as any).message,
            type: "danger-toast",
            visible: true,
        });
    }
}