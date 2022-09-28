import { ElMessage } from "element-plus";
import Http from "../../Http";
import router from "../../router";
import appStore from "../../store/appStore";
import logout from "./logout";


interface LoginPayloadContract {
    email: string;
    password: string;
}

export default async function login({email, password}: LoginPayloadContract): Promise<void> {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await Http.post('auth/admin/login', {email, password});
            if(response.status) throw response;
            const {token, user} = response;
            localStorage.setItem('cactus-token', token);
            appStore.setLoggedUser(user);
            Http.setJwtToken();
            router.push('/');
            resolve();
        } catch (error: any) {
            ElMessage.error(error.message);
            logout();
            reject(error);
        }
    });
}