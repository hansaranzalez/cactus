import { ElMessage } from "element-plus";
import Http from "../../Http";
import Store from "../../store/appStore";
import RolesStore from "../../store/rolesStore";

export default async function getRolesList(): Promise<any> {
    try {
        RolesStore.setRolesListLoading(true)
        const page = RolesStore.getPaginationMeta().currentPage;
        const limit = RolesStore.getPaginationMeta().itemsPerPage;
        const search = RolesStore.getSearchQuery();
        const response = await Http.get(`roles?page=${page}&limit=${limit}&search=${search.toUpperCase()}`);
        RolesStore.setRolesList(response.items);
        RolesStore.setPaginationMeta(response.meta);
        RolesStore.setRolesListLoading(false)
    } catch (error: any) {
        ElMessage.error(error.message);
    }
}