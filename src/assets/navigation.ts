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
        id: 1,
        name: 'Productos',
        icon: 'apps',
        onClick: () => router.push('/products'),
        forAdmin: false,
        inRouterPath: () => router.currentRoute.value.path === '/products'
    },
    {
        id: 2,
        name: 'Usuarios',
        icon: 'apps',
        onClick: () => router.push('/users'),
        forAdmin: true,
        inRouterPath: () => router.currentRoute.value.path === '/users'
    },
    {
        id: 3,
        name: 'Rols',
        icon: 'apps',
        onClick: () => router.push('/roles'),
        forAdmin: true,
        inRouterPath: () => router.currentRoute.value.path === '/roles'
    },
    {
        id: 3,
        name: 'Orders',
        icon: 'apps',
        onClick: () => router.push('/shopping-sessions'),
        forAdmin: true,
        inRouterPath: () => router.currentRoute.value.path === '/shopping-sessions'
    },
]);
