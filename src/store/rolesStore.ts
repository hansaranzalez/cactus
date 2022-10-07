import { reactive, computed } from "vue";
import { PaginationMetaContract } from "../@types";
import Role from "../entities/Role";

interface RolesStateContract {
    roles: Role[];
    rolesFormVisible: boolean;
    rolesListLoading: boolean;
    isEditing: boolean;
    role: Role,
    search: string,
    paginationMeta: PaginationMetaContract,
}

const state = reactive<RolesStateContract>({
    roles: [],
    rolesFormVisible: false,
    rolesListLoading: false,
    isEditing: false,
    role: new Role(),
    search: '',
    paginationMeta: {
        totalItems: 0,
        itemCount: 0,
        itemsPerPage: 10,
        totalPages: 0,
        currentPage: 1,
    },
});

const RolesStore = () => ({
    showRolesForm: () => { state.rolesFormVisible = true },
    hideRolesForm: () => { state.rolesFormVisible = false },
    rolesFormVisible: () => state.rolesFormVisible,
    getRolesListLoading: (): boolean => state.rolesListLoading,
    setRolesListLoading: (value: boolean): void => { state.rolesListLoading = value },
    setPaginationCurrentPage: (page: number): void => { state.paginationMeta.currentPage = page },
    getPaginationMeta: (): PaginationMetaContract => state.paginationMeta,
    setPaginationMeta: (pagination: PaginationMetaContract): void => { state.paginationMeta = pagination },
    getSearchQuery: (): string => state.search,
    setSearchQuery: (search: string): void => { state.search = search },
    getRole: (): Role => state.role,
    setRole: (role: Role): void => { state.role = role },
    getIsEditing: (): boolean => state.isEditing,
    setIsEditing: (value: boolean): void => { state.isEditing = value },
    getRolesList: (): Role[] => state.roles,
    setRolesList: (roles: Role[]): void => {
        state.roles = roles.map(role => new Role(role));
    },
    addRoleIntoList: (role: Role): void => { state.roles.unshift(role) },
    getRoleByIdFromList: (id: number): Role | undefined => state.roles.find((role) => role.id === id),
    removeRoleFromList: (id: number | null): void => { state.roles = state.roles.filter((role) => role.id !== id) }
})

export default computed(() => RolesStore()).value;