import Http from "../Http";
import router from "../router";

export class Registration {
    name: string;
    lastname: string;
    email: string;
    password: string;
    phone: string;
    loading?: boolean = false;
    error?: string | null = null;
    success?: string | null = null;
    verificationCode: number = 0;
    verificationCodeError?: string | null = null;
    verificationCodeSuccess?: string | null = null;
    verificationCodeLoading?: boolean = false;

    constructor(registration?: Registration) {
        if (registration) {
            this.name = registration.name;
            this.lastname = registration.lastname;
            this.email = registration.email;
            this.password = registration.password;
            this.phone = registration.phone;
        } else {
            this.name = "";
            this.lastname = "";
            this.email = "";
            this.password = "";
            this.phone = "";
        }
        return this;
    }

    registerUser(): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                this.error = null;
                this.loading = true;
                const response = await Http.post('auth/register', {
                    name: this.name,
                    lastname: this.lastname,
                    email: this.email,
                    password: this.password,
                    phone: this.phone
                });
                if (response.statusCode !== 200) throw new Error(response.message);
                this.success = response.message;
                this.loading = false;
                resolve();
            } catch (error: any) {
                this.error = error.message;
                this.success = null;
                this.loading = false;
                reject(error);
            }
        });
    }

    async verifyUser(): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                this.verificationCodeLoading = true;
                const response = await Http.post('auth/admin/verify-registration-code', {
                    email: this.email,
                    code: this.verificationCode,
                });
                if (response.statusCode !== 200) {
                    console.log(response)
                    this.verificationCodeError = 'Verification code expired or invalid. Please try again.';
                    this.verificationCodeLoading = false;
                    reject(response);
                }
                this.verificationCodeSuccess = response.message;
                this.verificationCodeLoading = false;
                resolve();
            } catch (error: any) {
                this.error = error.message;
                this.verificationCodeLoading = false;
                reject(error);
            }
        });
    }

}