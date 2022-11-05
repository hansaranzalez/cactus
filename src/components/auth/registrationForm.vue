<script setup lang="ts">
import { ElMessage, FormInstance } from "element-plus";
import { ref } from "vue";
import appStore from "../../store/appStore";
import { registrationFormValidationRules } from "../../assets/formRules";
import authStore from "../../store/authStore";

const registrationForm = ref<FormInstance>();
const registrationPayload = ref(authStore.registrationPayload.get());
function onSubmit(): void {
  registrationForm.value?.validate(async (valid: boolean) => {
    if (!valid) return false;
    authStore.registrationPayload.set(registrationPayload.value);
    await authStore.registerUser();
  });
}
</script>

<template>
  <el-alert
    v-if="authStore.registrationFailMessage()"
    title="ATENCION!"
    type="error"
    :description="authStore.registrationFailMessage()"
    show-icon
  />
  <el-alert
    v-if="authStore.registrationFailMessage()"
    title="EXITO!"
    type="success"
    :description="authStore.registrationSuccessMessage()"
    show-icon
  />
  <el-form
    :model="registrationPayload"
    ref="registrationForm"
    :rules="registrationFormValidationRules"
    label-width="80px"
    label-position="top"
    :inline="false"
    size="large"
    class="space-y-8"
  >
    <el-form-item prop="name">
      <el-input
        :placeholder="appStore.i18n.authentication.name"
        v-model="registrationPayload.name"
      ></el-input>
    </el-form-item>
    <el-form-item prop="lastname">
      <el-input
        :placeholder="appStore.i18n.authentication.lastname"
        v-model="registrationPayload.lastname"
      ></el-input>
    </el-form-item>
    <el-form-item prop="email">
      <el-input
        :placeholder="appStore.i18n.authentication.email"
        v-model="registrationPayload.email"
      ></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        :placeholder="appStore.i18n.authentication.password"
        type="password"
        v-model="registrationPayload.password"
      ></el-input>
    </el-form-item>
    <el-form-item prop="phone">
      <el-input
        :placeholder="appStore.i18n.authentication.phone"
        v-model="registrationPayload.phone"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <div class="flex w-full flex-col items-center text-center">
        <div class="w-full">
          <el-button
            class="w-full h-12 text-base"
            rounded
            type="primary"
            @click="onSubmit"
            >{{ appStore.i18n.authentication.register }}</el-button
          >
        </div>
        <el-divider>
          <i class="fa-thin fa-leaf"></i>
        </el-divider>
        <div class="w-full">
          <el-button type="text" @click="$router.push('login')">{{
            appStore.i18n.authentication.login
          }}</el-button>
        </div>
      </div>
    </el-form-item>
  </el-form>
  <div>
    <!-- ranbom quaote -->
    <p class="text-xs text-center text-gray-400">Tu entrada a un mundo de posibilidades</p>
  </div>
</template>
