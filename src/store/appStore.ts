import { computed, reactive } from "vue";
import { I18nContract, I18nType, LanguageTransContract } from "../i18n/i18nContract";
import i18n from "../i18n";

interface StateContract {
    i18n: {locale:I18nType;content:I18nContract;};
}

const state = reactive<StateContract>({
    i18n: {
        locale: 'es',
        content: i18n
    },
});

const Store = () => ({
    setLocale: (locale: I18nType): void => { state.i18n.locale = locale },
    i18n: computed(() => state.i18n.content[state.i18n.locale]).value
})

export default computed(() => Store()).value;