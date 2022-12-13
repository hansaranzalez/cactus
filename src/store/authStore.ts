import { computed, reactive } from "vue";
import { Login } from "../entities/Login";
import { Registration } from "../entities/Registration";
import User from "../entities/User";

interface AuthStoreStateContract {
    loggedUser: User | null;
    login: Login;
    registration: Registration;
}

const state = reactive<AuthStoreStateContract>({
    loggedUser: null,
    login: new Login(),
    registration: new Registration()
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
    },

    // registration
    registrationPayload: {
        get: () => ({
            name: state.registration.name,
            lastname: state.registration.lastname,
            email: state.registration.email,
            password: state.registration.password,
            phone: state.registration.phone
        }),
        set: (payload: {
            name: string,
            lastname: string,
            email: string,
            password: string,
            phone: string
        }) => {
            state.registration.name = payload.name;
            state.registration.lastname = payload.lastname;
            state.registration.email = payload.email;
            state.registration.password = payload.password;
            state.registration.phone = payload.phone;
        }
    },

    isRegistrationLoading: () => state.registration.loading,

    registrationFailMessage: () => state.registration.error,

    registrationSuccessMessage: () => state.registration.success,

    registerUser: async () => {
        await state.registration.registerUser()
    },

    verifyUserPayload: {
        get: () => ({
            email: state.registration.email,
            code: state.registration.verificationCode
        }),
        set: (payload: {
            email: string,
            code: number
        }) => {
            state.registration.email = payload.email;
            state.registration.verificationCode = payload.code;
        }
    },

    isVerifyUserLoading: () => state.registration.verificationCodeLoading,

    verifyUserFailMessage: () => state.registration.verificationCodeError,

    verifyUser: async () => {
        await state.registration.verifyUser()
    }

})).value;

export default authStore;