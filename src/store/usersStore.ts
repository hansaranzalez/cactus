import { UploadProps, UploadRawFile } from "element-plus";
import { reactive, computed } from "vue";
import { PaginationMetaContract } from "../@types";
import Role from "../entities/Role";
import User from "../entities/User";


interface UsersStoreStateContract {
    users: User[];
    usersFormVisible: boolean;
    usersListLoading: boolean;
    isEditing: boolean;
    user: User,
    search: string,
    paginationMeta: PaginationMetaContract,
}

const state = reactive<UsersStoreStateContract>({
    users: [],
    usersFormVisible: false,
    usersListLoading: false,
    isEditing: false,
    user: new User(),
    search: '',
    paginationMeta: {
        totalItems: 0,
        itemCount: 0,
        itemsPerPage: 10,
        totalPages: 0,
        currentPage: 1,
    },
});

const UsersStore = () => ({
    showUsersForm: () => { state.usersFormVisible = true },
    hideUsersForm: () => { state.usersFormVisible = false },
    usersFormVisible: () => state.usersFormVisible,
    getCurrentUserAvatarUrl: () => {
        return state.user.avatar.url;
    },
    setCurrentUserAvatarUrl: (avatar: UploadRawFile) => {
        state.user.avatar.url = URL.createObjectURL(avatar)
    },
    getUsersListLoading: (): boolean => state.usersListLoading,
    setUsersListLoading: (value: boolean): void => { state.usersListLoading = value },
    setPaginationCurrentPage: (page: number): void => { state.paginationMeta.currentPage = page },
    getPaginationMeta: (): PaginationMetaContract => state.paginationMeta,
    setPaginationMeta: (pagination: PaginationMetaContract): void => { state.paginationMeta = pagination },
    getSearchQuery: (): string => state.search,
    setSearchQuery: (search: string): void => { state.search = search },
    getUser: (): User => state.user,
    setUser: (user: User): void => { state.user = user },
    getIsEditing: (): boolean => state.isEditing,
    setIsEditing: (value: boolean): void => { state.isEditing = value },
    getUsersList: (): User[] => state.users,
    setUsersList: (users: User[]): void => {
        state.users = users.map(user => new User(user));
    },
    addUserIntoList: (user: User): void => { state.users.unshift(user) },
    getUserByIdFromList: (id: number): User | undefined => state.users.find((user) => user.id === id),
    removeUserFromList: (id: number): void => { state.users = state.users.filter((user) => user.id !== id) },
})

export default computed(() => UsersStore()).value;