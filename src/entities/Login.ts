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
        this.error = null;
        this.loading = true;
        try {
            const response = await Http.post('auth/admin/login', { email: this.email, password: this.password });
            if (response.status) throw response;
            const { token, user } = response;
            localStorage.setItem('cactus-token', token);
            authStore.loggedUser.set(user)
            this.loading = false;
            router.push({ name: 'home' });
        } catch (error: any) {
            this.error = error.message;
            this.logout();
            this.loading = false;
            router.push({ name: 'login' });
        }
    }

    logout() {
        authStore.loggedUser.set(null)
        localStorage.removeItem('cactus-token');
        localStorage.removeItem('cactus-user');
        
        router.push({ name: 'login' });
    }

    async authCheck(): Promise<void> {
        try {
            const result = await Http.get('auth/auth-check');
            console.log(result)
            if (!result || result.statusCode) throw result;
            authStore.loggedUser.set(result)
            this.loading = false;
            router.push({ name: 'home' });
        } catch (error: any) {
            if (!error || error.statusCode === 401) {
                this.logout();
            }
        }
    }

}