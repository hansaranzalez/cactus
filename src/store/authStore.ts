import { computed, reactive } from "vue";
import { Login } from "../entities/Login";
import User from "../entities/User";

interface AuthStoreStateContract {
    loggedUser: User | null;
    login: Login;
}

const state = reactive<AuthStoreStateContract>({
    loggedUser: null,
    login: new Login()
});

const authStore = computed(() => ({

    loggedUser: {
        get: () => {
            if (localStorage.getItem('cactus-user')) {
                state.loggedUser = new User(JSON.parse(localStorage.getItem('cactus-user') || '{}'));
            }
            return state.loggedUser
        },
        set: (user: User) => { state.loggedUser = new User(user); }
    },

    loginPayload: {
        get: () => ({ email: state.login.email, password: state.login.password }),
        set: (payload: { email: string, password: string }) => { state.login.email = payload.email; state.login.password = payload.password; }
    },
    
    isLoginLoading: () => state.login.loading,

    loginFailMessage: () => state.login.error,

    login: async () => {
        await state.login.login()
    },

    logout: () => {
        state.loggedUser = null;
        state.login.logout()
    },

    authCheck: async () => {
        return await state.login.authCheck()
    }

})).value;

export default authStore;