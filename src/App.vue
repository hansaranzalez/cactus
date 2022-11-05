<script setup lang="ts">
import { computed } from "vue";
import facebookSdk from "./actions/Facebook/facebookSdk";
import shareInstagramPost from "./actions/Facebook/shareInstagramPost";
import headerBar from "./components/core/headerBar.vue";
import authStore from "./store/authStore";

const postCaption = computed({
  get: () => facebookSdk.postCaption.get(),
  set: (value) => facebookSdk.postCaption.set(value),
});

const postImage = computed({
  get: () => facebookSdk.intagramPost.get().media_url,
  set: (value) => facebookSdk.setMediaImageUrl(value),
});
</script>

<template>
  <headerBar />
  <div class="pt-32">
    <router-view></router-view>
  </div>
  <!-- footer -->
  <div v-if="!authStore.loggedUser.get()" class="w-full py-3 text-center text-gray-400 bg-gray-50 border-t border-gray-100 absolute bottom-0 left-0 right-0">
    <p>FLOROFILA</p>
  </div>
</template>

<style scoped></style>
