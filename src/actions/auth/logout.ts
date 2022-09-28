import router from "../../router";

export default function logout() {
    localStorage.removeItem('cactus-token');
    localStorage.removeItem('cactus-user');
    router.push('/login');
}