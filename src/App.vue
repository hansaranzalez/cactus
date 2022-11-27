<script setup lang="ts">
import { computed } from "vue";
import facebookSdk from "./actions/Facebook/facebookSdk";
import shareInstagramPost from "./actions/Facebook/shareInstagramPost";
import headerBar from "./components/core/headerBar.vue";
import authStore from "./store/authStore";
import userProfileVue from "./components/core/userProfile.vue";

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
  <div class="flex h-full ">
    <div class="h-full absolute top-0 left-0 bottom-0 w-80">
      <headerBar class=""/>
    </div>
    <div class="flex-1 ml-64 p-8 relative overflow-auto rounded-tl-[50px] rounded-bl-[50px] bg-cloud-white-florofila">
      <router-view></router-view>
    </div>
    <div class="p-8">
      <userProfileVue />
    </div>
  </div>
</template>

<style scoped></style>
