import { ElMessage } from "element-plus";
import { UserRegistrationPayload } from "../../entities/User";
import Http from "../../Http";

export default async function registerUser(registerPayload: UserRegistrationPayload): Promise<void> {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await Http.post('auth/register', registerPayload);
            console.log(response);
            const {token, user} = response;
            localStorage.setItem('cactus-token', token);
            localStorage.setItem('cactus-user', JSON.stringify(user));
            ElMessage.success('Registration successful');
            resolve();
        } catch (error: any) {
            ElMessage.error(error.message);
            reject(error);
        }
    });
}