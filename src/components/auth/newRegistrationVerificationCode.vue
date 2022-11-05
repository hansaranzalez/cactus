<script setup lang="ts">
import appStore from "../../store/appStore";
import { verificationCodeFormValidationRules } from "../../assets/formRules";
import authStore from "../../store/authStore";
import { computed, onMounted, ref } from "vue";
import router from "../../router";

const verifyCodePayload = ref(authStore.verifyUserPayload.get());

const verifyCodePayloadFrom = ref();

const submit = (): void => {
  verifyCodePayloadFrom.value.validate(async (valid: boolean) => {
    if (valid) {
      authStore.verifyUserPayload.set(verifyCodePayload.value);
      await authStore.verifyUser();
    }
  });
};

onMounted(() => {
  // get user email from url params
  const urlParams = new URLSearchParams(window.location.search);
  const emailFromRoute = urlParams.get("email");
  if (!emailFromRoute) {
    router.push('/login');
    return;
  }
  verifyCodePayload.value.email = emailFromRoute as string;
});
</script>

<template>
  <el-alert
    v-if="authStore.verifyUserFailMessage()"
    title="ATENCION!"
    type="error"
    :description="authStore.verifyUserFailMessage()"
    show-icon
  />
  <el-form
    :model="verifyCodePayload"
    ref="verifyCodePayloadFrom"
    :rules="verificationCodeFormValidationRules"
    label-width="80px"
    label-position="top"
    :inline="false"
    size="large"
    custom-class="space-y-5"
    class="space-y-8"
  >
    <el-form-item prop="email">
      <el-input
        :placeholder="appStore.i18n.authentication.code"
        v-model="verifyCodePayload.code"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <div class="flex w-full flex-col items-center text-center">
        <div class="w-full">
          <el-button
            class="w-full h-12 text-base"
            round
            type="primary"
            @click="submit"
            >{{ appStore.i18n.authentication.verify }}</el-button
          >
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
    <p class="text-xs text-center text-gray-400">Soy mi propio placeholder</p>
  </div>
</template>
