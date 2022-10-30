<script setup lang="ts">
import appStore from '../../store/appStore'
import User from '../../entities/Client'
import {loginFormValidationRules} from '../../assets/formRules'
import login from '../../actions/auth/login';
import { ref } from 'vue';

const loginPayload = ref(new User().getLoginPayload());

const loginForm = ref();

const submit = (): void => {
    loginForm.value.validate(async (valid: boolean) => {
        if (valid) {
            await login(loginPayload.value)
        }
    });
}


</script>

<template>
  <el-form
    :model="loginPayload"
    ref="loginForm"
    :rules="loginFormValidationRules"
    label-width="80px"
    label-position="top"
    :inline="false"
    size="large"
  >
    <el-form-item prop="email">
      <el-input
        :placeholder="appStore.i18n.authentication.email"
        v-model="loginPayload.email"
      ></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        :placeholder="appStore.i18n.authentication.password"
        v-model="loginPayload.password"
        type="password"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <div class="flex w-full flex-col items-center text-center">
        <div class="w-full">
          <el-button type="primary" @click="submit">{{
            appStore.i18n.authentication.login
          }}</el-button>
        </div>
        <div class="w-full">
          <el-button type="text" @click="$router.push('registration')">{{
            appStore.i18n.authentication.register
          }}</el-button>
        </div>
        <div class="w-full">
          <el-button type="text" @click="$router.push('password-recovery')">{{
            appStore.i18n.authentication.forgotPassword
          }}</el-button>
        </div>
      </div>
    </el-form-item>
  </el-form>
</template>

