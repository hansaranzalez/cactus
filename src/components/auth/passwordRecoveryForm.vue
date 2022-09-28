<script setup lang="ts">
import recoverPassword from "./@actions/recoverPassword";
import { ElMessage } from "element-plus";
import { computed, ref } from "vue";
import validationRules from "./@store/validationRules";
import passwordRecoveryVerificationCode from "./passwordRecoveryVerificationCodeForm.vue";
import State from "@/State";

const i18n = computed(() => State().getI18n());

const payload = ref({ email: "" });
const passwordRecoveryForm = ref();

type InViewType = "recoveryForm" | "verificationCode";

const inView = ref<InViewType>("recoveryForm");

function onSubmit(): void {
  try {
    passwordRecoveryForm.value.validate(async (valid: boolean) => {
      if (!valid) return false;
      await recoverPassword(payload.value.email);
      if (State().getExeption() !== null) return;
      inView.value = 'verificationCode';
    });
  } catch (error: any) {
    ElMessage(error.message);
  }
}
</script>

<template>
  <passwordRecoveryVerificationCode
    :user-email="payload.email"
    v-if="inView === 'verificationCode'"
  />
  <el-form
    v-if="inView === 'recoveryForm'"
    :model="payload"
    ref="passwordRecoveryForm"
    :rules="validationRules.passwordRecovery"
    label-width="80px"
    label-position="top"
    :inline="false"
    size="large"
  >
    <el-form-item prop="email">
      <el-input :placeholder="i18n.authentication.email" v-model="payload.email"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit"
        >{{ i18n.authentication.recoverPassword }}</el-button
      >
      <el-button type="text" @click="$router.push('login')">{{ i18n.authentication.login }}</el-button>
    </el-form-item>
  </el-form>
</template>
