<script setup lang="ts">
import { ElMessage } from "element-plus";
import { computed, ref } from "vue";
import validationRules from "./@store/validationRules";
import State from "@/State";
import verifyPasswordRecoveryCode from "./@actions/verifyPasswordRecoveryCode";
import AuthStore from "./@store";
import type { PasswordRecoveryVerificationModuleContract } from "./@store/passwordRecoveryVerificationModule";
import router from '@/router/index'

const store = AuthStore().getModule('passwordRecoveryVerificationModule') as PasswordRecoveryVerificationModuleContract;

const i18n = computed(() => State().getI18n());

const props = defineProps<{ userEmail: string }>();
const payload = ref({ code: "" });
const verifyCodeForm = ref();

function onSubmit(): void {
  try {
    verifyCodeForm.value.validate(async (valid: boolean) => {
      if (!valid) return false;
      const result = await verifyPasswordRecoveryCode(props.userEmail, payload.value.code);
      const {recoveryCode} = result;
      store.setVerificationCodeId(recoveryCode.id);
      store.setVerificationEmail(props.userEmail);
      router.push('/password-change');
    });
  } catch (error: any) {
    ElMessage(error.message);
  }
}
</script>

<template>
  <p class="text-semibold capitalize">{{ i18n.authentication.passwordRecovery }}</p>
  <p>{{ i18n.authentication.passwordRecoveryCodeInstructions.replace('#email#', `<b>${props.userEmail}</b>`)}}</p>
  <el-form
    :model="payload"
    ref="verifyCodeForm"
    :rules="validationRules.passwordRecoveryVerificationCode"
    label-width="80px"
    label-position="top"
    :inline="false"
    size="large"
  >
    <el-form-item prop="code">
      <el-input :placeholder="i18n.authentication.code" v-model="payload.code"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit"><span class="capitalize">{{ i18n.authentication.verify }}</span></el-button>
    </el-form-item>
  </el-form>
</template>
