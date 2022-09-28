<script setup lang="ts">
import { ElMessage } from "element-plus";
import { computed, ref } from "vue";
import validationRules from './@store/validationRules';
import State from "@/State";
import changePassword from "./@actions/changePassword";
import AuthStore from "./@store";
import type { PasswordRecoveryVerificationModuleContract } from "./@store/passwordRecoveryVerificationModule";
import router from "@/router";

const store = AuthStore().getModule('passwordRecoveryVerificationModule') as PasswordRecoveryVerificationModuleContract;

const i18n = computed(() => State().getI18n());

const payload = ref({ password: "", rePassword: "" });
const passwordChangeForm = ref();

function onSubmit(): void {
  try {
    passwordChangeForm.value.validate(async (valid: boolean) => {
      if (!valid) return false;
      const email = store.getVerificationEmail();
      const codeid = store.getVerificationCodeId();
      const password = payload.value.password;
      const result = await changePassword({email,codeid,password});
      ElMessage.success(result.message);
      router.push('/');
    });
  } catch (error: any) {
    ElMessage.error(error.message)
  }
}

</script>

<template>
  <p class="text-bold">{{ i18n.authentication.pleaseEnterNewPassword }}</p>
  <el-form
    :model="payload"
    ref="passwordChangeForm"
    :rules="validationRules.loginForm"
    label-width="80px"
    label-position="top"
    :inline="false"
    size="large"
  >
    <el-form-item :label="i18n.authentication.password" prop="password">
      <el-input type="password" v-model="payload.password"></el-input>
    </el-form-item>
    <el-form-item :label="i18n.authentication.repeatPassword" prop="rePassword">
      <el-input v-model="payload.rePassword" type="password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">{{ i18n.authentication.changePassword }}</el-button>
      <el-button type="text" @click="$router.push('login')">{{ i18n.authentication.login }}</el-button>
    </el-form-item>
  </el-form>
</template>
