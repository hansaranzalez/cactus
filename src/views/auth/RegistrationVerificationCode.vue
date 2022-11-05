<script setup lang="ts">
import newRegistrationVerificationCodeVue from "../../components/auth/newRegistrationVerificationCode.vue";
import authStore from "../../store/authStore";
import router from "../../router";
import { onMounted } from "vue";
</script>

<template>
  <div
    v-loading="authStore.isVerifyUserLoading()"
    class="bg-white mx-auto p-10 rounded-xl border border-gray-200 shadow-sm space-y-10"
    :style="{ width: '360px' }"
  >
    <!-- centered user lock icon -->
    <div class="flex justify-center">
      <i class="fa-light fa-user-unlock text-4xl text-gray-500"></i>
    </div>
    <newRegistrationVerificationCodeVue />
  </div>
</template>
