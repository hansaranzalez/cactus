<script setup lang="ts">
import headerBar from "./components/core/headerBar.vue";
import authStore from "./store/authStore";
import userProfileVue from "./components/core/userProfile.vue";
import { onMounted, computed } from "vue";
onMounted(async () => {
  await authStore.authCheck();
});

const userlogged = computed(() => authStore.loggedUser.get());
</script>

<template>
  <div class="flex h-full">
    <div v-if="userlogged?.id" class="h-full absolute top-0 left-0 bottom-0 w-80">
      <headerBar />
    </div>
    <div
      :class="{ 'ml-64': userlogged?.id }"
      class="flex-1 p-8 relative overflow-auto rounded-tl-[50px] rounded-bl-[50px] bg-cloud-white-florofila"
    >
      <router-view />
    </div>
    <div v-if="userlogged?.id" class="p-8">
      <userProfileVue />
    </div>
  </div>
</template>

<style scoped></style>
