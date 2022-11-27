import { computed, reactive } from "vue";
import router from "../router";
import appStore from "../store/appStore";

interface NavigationItemContract {
    id: number;
    name: string;
    icon: string;
    onClick: () => void;
    forAdmin: boolean;
    inRouterPath: () => boolean;
}


export default reactive<NavigationItemContract[]>([
    {
        id: 0,
        name: "Home",
        icon: "fa-thin fa-house",
        onClick: () => router.push("/"),
        forAdmin: false,
        inRouterPath: () => router.currentRoute.value.path === "/",
    },
    {
        id: 1,
        name: 'Productos',
        icon: 'fa-thin fa-box',
        onClick: () => router.push('/products'),
        forAdmin: false,
        inRouterPath: () => router.currentRoute.value.path === '/products'
    },
    {
        id: 2,
        name: 'Usuarios',
        icon: 'fa-thin fa-users',
        onClick: () => router.push('/users'),
        forAdmin: true,
        inRouterPath: () => router.currentRoute.value.path === '/users'
    },
    {
        id: 3,
        name: 'Orders',
        icon: 'fa-thin fa-ballot-check',
        onClick: () => router.push('/shopping-sessions'),
        forAdmin: true,
        inRouterPath: () => router.currentRoute.value.path === '/shopping-sessions'
    },
]);
