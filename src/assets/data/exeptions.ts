import type { ExeptionContract } from "../../@types";
import i18n from "../../i18n";
import { computed } from "vue";

console.log(i18n.es)
const trans = i18n.es.exeptions;

export default [
    {
        status: 400,
        title: trans.badRequest,
        message: '',
    },
    {
        status: 401,
        title: trans.unauthorize,
        message: '',
    },
    {
        status: 500,
        title: trans.serverError,
        message: '',
    }
] as ExeptionContract[];