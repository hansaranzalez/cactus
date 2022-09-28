import { computed, reactive } from "vue";
import { I18nContract, I18nType, LanguageTransContract } from "../i18n/i18nContract";
import i18n from "../i18n";
import User from "../entities/User";

type ToastType = 'success-toast' | 'info-toast' | 'warning-toast' | 'danger-toast'

interface ToastContract {
    visible: boolean;
    message: string;
    type: ToastType;
}

interface ModalContract {
    visible: boolean;
    component: any;
}

interface StateContract {
    loggedUser: User | null;
    i18n: {locale:I18nType;content:I18nContract;};
    modal: ModalContract;
    toast: ToastContract;
}

const state = reactive<StateContract>({
    loggedUser: null,
    i18n: {
        locale: 'es',
        content: i18n
    },
    modal: {
        visible: false,
        component: null
    },
    toast: {
        visible: false,
        message: '',
        type: 'info-toast'
    }
});

const Store = () => ({
    getLoggedUser: computed(() => state.loggedUser),
    setLoggedUser: (user: User) => state.loggedUser = user,
    getModal: (): ModalContract => state.modal,
    setModal: (modal: ModalContract): void => { state.modal = modal },
    setModalVisible: (value: boolean): void => { state.modal.visible = value },
    getToast: (): ToastContract => state.toast,
    setToast: (toast: ToastContract): void => { state.toast = toast },
    setLocale: (locale: I18nType): void => { state.i18n.locale = locale },
    i18n: computed(() => state.i18n.content[state.i18n.locale]).value
})

export default computed(() => Store()).value;