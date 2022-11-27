import Http from "../Http";
import router from "../router";
import authStore from "../store/authStore";

export class Login {
    email: string;
    password: string;
    loading?: boolean = false;
    error?: string | null = null;

    constructor(payload?: Login) {
        this.email = payload?.email || '';
        this.password = payload?.password || '';
        return this;
    }

    async login(): Promise<void> {
        return new Promise(async (resolve, reject) => {
            this.error = null;
            this.loading = true;
            try {
                const response = await Http.post('auth/admin/login', {email: this.email, password: this.password});
                if(response.status) throw response;
                const {token, user} = response;
                localStorage.setItem('cactus-token', token);
                localStorage.setItem('cactus-user', JSON.stringify(user));
                authStore.loggedUser.set(user)
                Http.setJwtToken();
                this.loading = false;
                router.push('/');
                
                resolve();
            } catch (error: any) {
                this.error = error.message;
                this.logout();
                this.loading = false;
                reject(error);
            }
        });
    }

    logout() {
        localStorage.removeItem('cactus-token');
        localStorage.removeItem('cactus-user');
        router.push('/login');
    }

    async authCheck(): Promise<boolean> {
        try {
            const result = await Http.get('auth/auth-check');
            if (!result || result.statusCode) throw result;
            localStorage.setItem('cactus-user', JSON.stringify(result));
            authStore.loggedUser.set(result)
            Http.setJwtToken();
            this.loading = false;
            return true;
        } catch (error: any) {
            return false;
        }
    }

}