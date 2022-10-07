import { computed, reactive } from "vue";
import { I18nContract, I18nType, LanguageTransContract } from "../i18n/i18nContract";
import i18n from "../i18n";
import User from "../entities/User";

interface StateContract {
    loggedUser: User | null;
    i18n: {locale:I18nType;content:I18nContract;};
}

const state = reactive<StateContract>({
    loggedUser: null,
    i18n: {
        locale: 'es',
        content: i18n
    },
});

const Store = () => ({
    getLoggedUser: computed(() => state.loggedUser),
    setLoggedUser: (user: User) => state.loggedUser = user,
    setLocale: (locale: I18nType): void => { state.i18n.locale = locale },
    i18n: computed(() => state.i18n.content[state.i18n.locale]).value
})

export default computed(() => Store()).value;