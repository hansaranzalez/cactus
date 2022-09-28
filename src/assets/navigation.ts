import { computed, reactive } from "vue";
import router from "../router";
import appStore from "../store/appStore";

interface NavigationItemContract {
    id: number;
    name: string;
    icon: string;
    onClick: () => void;
    forAdmin: boolean;
}


export default reactive<NavigationItemContract[]>([
    {
        id: 1,
        name: 'Productos',
        icon: 'apps',
        onClick: () => router.push('/products'),
        forAdmin: false,
    },
    {
        id: 2,
        name: 'Usuarios',
        icon: 'apps',
        onClick: () => router.push('/users'),
        forAdmin: true,
    },
    {
        id: 3,
        name: 'Rols',
        icon: 'apps',
        onClick: () => router.push('/roles'),
        forAdmin: true,
    },
]);
