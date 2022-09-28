export type I18nType = 'es' | 'en';

export interface FormValidationMessagesContract {
    required: string;
    pleaseEnterYourPassword: string;
    pleaseInputCorrectEmail: string;
    pleaseEnterEmailAddress: string;
    pleaseEnterYourName: string;
    pleaseEnterYourLastname: string;
    minSevenCharacters: string;
    minSixCharacters: string;
    twoPasswordsDontMatch: string;
    pleaseInputPasswordAgain: string;
}

export interface AuthenticationI18nContract {
    name: string;
    lastname: string;
    email: string;
    password: string;
    phone: string;
    repeatPassword: string;
    register: string;
    login: string;
    recoverPassword: string;
    passwordRecovery: string;
    passwordRecoveryCodeInstructions: string;
    registrationSuccess: string;
    registrationSuccessMessage: string;
    verify: string;
    forgotPassword: string;
    passwordChangeSuccessMessage: string;
    changePassword: string;
    pleaseEnterNewPassword: string;
    code: string;
}

export interface ExeptionsI18nContract {
    badRequest: string,
    serverError: string;
    unauthorize: string;
}

export interface LanguageTransContract {
    authentication: AuthenticationI18nContract,
    formValidationMessages: FormValidationMessagesContract,
    exeptions: ExeptionsI18nContract
}

export interface I18nContract {
    es: LanguageTransContract,
    en: LanguageTransContract,
}
