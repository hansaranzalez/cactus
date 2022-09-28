<script setup lang="ts">
import { ElMessage, FormInstance } from 'element-plus';
import { ref } from 'vue';
import User from '../../entities/User';
import appStore from '../../store/appStore';
import {registrationFormValidationRules} from '../../assets/formRules';
import registerUser from '../../actions/auth/registerUser';


const registrationForm = ref<FormInstance>();
const registrationPayload = ref(new User().getRegisterPayload());
function onSubmit(): void {
  try {
    registrationForm.value?.validate(async (valid: boolean) => {
      if (!valid) return false;
      await registerUser(registrationPayload.value);
    });
  } catch (error: any) {
    ElMessage(error.message)
  }
}
</script>

<template>
  <el-form
    :model="registrationPayload"
    ref="registrationForm"
    :rules="registrationFormValidationRules"
    label-width="80px"
    label-position="top"
    :inline="false"
    size="large"
  >
    <el-form-item prop="name">
      <el-input :placeholder="appStore.i18n.authentication.name" v-model="registrationPayload.name"></el-input>
    </el-form-item>
    <el-form-item prop="lastname">
      <el-input :placeholder="appStore.i18n.authentication.lastname" v-model="registrationPayload.lastname"></el-input>
    </el-form-item>
    <el-form-item prop="email">
      <el-input :placeholder="appStore.i18n.authentication.email" v-model="registrationPayload.email"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input :placeholder="appStore.i18n.authentication.password" type="password" v-model="registrationPayload.password"></el-input>
    </el-form-item>
    <el-form-item prop="phone">
      <el-input :placeholder="appStore.i18n.authentication.phone" v-model="registrationPayload.phone"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">{{ appStore.i18n.authentication.register }}</el-button>
      <el-button type="text" @click="$router.push('login')">{{ appStore.i18n.authentication.login }}</el-button>
    </el-form-item>
  </el-form>
</template>
