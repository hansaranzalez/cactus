<script setup lang="ts">
import appStore from "../../store/appStore";
import { loginFormValidationRules } from "../../assets/formRules";
import authStore from "../../store/authStore";
import { computed, ref } from "vue";

const loginPayload = ref(authStore.loginPayload.get());

const loginForm = ref();

const submit = (): void => {
  loginForm.value.validate(async (valid: boolean) => {
    if (valid) {
      authStore.loginPayload.set(loginPayload.value);
      await authStore.login();
    }
  });
};
</script>

<template>
  <el-alert
    v-if="authStore.loginFailMessage()"
    title="ATENCION!"
    type="error"
    :description="authStore.loginFailMessage()"
    show-icon
  />
  <el-form
    :model="loginPayload"
    ref="loginForm"
    :rules="loginFormValidationRules"
    label-width="80px"
    label-position="top"
    :inline="false"
    size="large"
    custom-class="space-y-5"
    class="space-y-8"
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
      <div class="w-full">
        <el-button
          class="p-0 text-xs font-semibold"
          type="text"
          @click="$router.push('password-recovery')"
          >{{ appStore.i18n.authentication.forgotPassword }}</el-button
        >
      </div>
    </el-form-item>
    <el-form-item>
      <div class="flex w-full flex-col items-center text-center">
        <div class="w-full">
          <el-button class="w-full h-12 text-base" round type="primary" @click="submit">{{
            appStore.i18n.authentication.login
          }}</el-button>
        </div>
        <el-divider>
          <i class="fa-thin fa-leaf"></i>
        </el-divider>
        <div class="w-full">
          <el-button type="text" @click="$router.push('registration')">{{
            appStore.i18n.authentication.register
          }}</el-button>
        </div>
      </div>
    </el-form-item>
  </el-form>
  <div>
    <!-- ranbom quaote -->
    <p class="text-xs text-center text-gray-400">Los alimentos, tu medicina</p>
  </div>
</template>
