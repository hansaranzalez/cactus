import Http from "../../Http";
import Store from "../../store/appStore";
import UsersStore from "../../store/usersStore";

export default async function getUsersList() {
    try {
        const page = UsersStore.getPaginationMeta().currentPage;
        const limit = UsersStore.getPaginationMeta().itemsPerPage;
        const search = UsersStore.getSearchQuery();
        const response = await Http.get(`users?page=${page}&limit=${limit}&search=${search}`);
        UsersStore.setUsersList(response.items);
        UsersStore.setPaginationMeta(response.meta);
        UsersStore.setUsersListLoading(false)
    } catch (error) {
        Store.setToast({
            message: (error as any).message,
            type: "danger-toast",
            visible: true,
        });
    }
}