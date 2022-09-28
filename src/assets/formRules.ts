import { FormRules } from 'element-plus';
import { reactive } from 'vue';

export const productFormValidationRules = reactive<FormRules>({
  name: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
  ],
  description: [{ required: true, message: 'Please input activity form', trigger: 'blur' }],
  price: [
    {
      required: true,
      message: 'A price is required to create a product',
      trigger: 'blur',
    },
  ],
  in_stok: [
    {
      type: 'number',
      message: 'Numbers only please',
      trigger: 'blur',
    },
  ],
})

export const userFormValidationRules = reactive<FormRules>({
  name: [
    { required: true, message: 'A name is required to create a user', trigger: 'blur' },
  ],
  lastname: [{ required: true, message: 'A lastname is required to create a user', trigger: 'blur' }],
  email: [
    {
      type: 'email',
      required: true,
      message: 'An email is required to create a user',
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      message: 'A password is required to create a user',
      trigger: 'blur',
    },
  ],
})

export const roleFormValidationRules = reactive<FormRules>({
  name: [
    { required: true, message: 'A name is required to create a role', trigger: 'blur' },
  ],
  description: [{ required: true, message: 'A description is required to create a role', trigger: 'blur' }]
})

export const loginFormValidationRules = reactive<FormRules>({
  email: [
    {
      type: 'email',
      required: true,
      message: 'An email is required to login',
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      message: 'A password is required to login',
      trigger: 'blur',
    },
  ],
})

export const registrationFormValidationRules = reactive<FormRules>({
  name: [
    { required: true, message: 'A name is required to create a user', trigger: 'blur' },
  ],
  lastname: [{ required: true, message: 'A lastname is required to create a user', trigger: 'blur' }],
  email: [
    {
      type: 'email',
      required: true,
      message: 'An email is required to create a user',
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      message: 'A password is required to create a user',
      trigger: 'blur',
    },
  ],
  repeatPassword: [
    {
      required: true,
      message: 'A password confirmation is required to create a user',
      trigger: 'blur',
    },
  ],
  phone: [
    {
      required: true,
      message: 'A phone number is required to create a user',
      trigger: 'blur',
    },
  ],
})