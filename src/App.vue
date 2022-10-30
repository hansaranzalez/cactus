<script setup lang="ts">
import { computed } from "vue";
import facebookSdk from "./actions/Facebook/facebookSdk";
import shareInstagramPost from "./actions/Facebook/shareInstagramPost";
import headerBar from "./components/core/headerBar.vue";

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
  <!-- login to facebook button -->
  <div>
    <el-button
      v-if="!facebookSdk.facebookUserAccessToken.get()"
      type="primary"
      size="default"
      @click="facebookSdk.login"
      >Entrar a facebook</el-button
    >
    <el-button v-else type="primary" size="default" @click="facebookSdk.logout"
      >Salir de facebook</el-button
    >
  </div>
  <!-- intagram post from-->
  <div>
    <h1>Envia post</h1>
    <!-- image url input -->
    <el-input
      v-model="postImage"
      placeholder="url de la imagen"
    ></el-input>

    <el-input
      type="text"
      :rows="2"
      v-model="postCaption"
      placeholder="Escriba post para instagram"
      :maxlength="-1"
      :show-word-limit="false"
      :autosize="{ minRows: 2, maxRows: 4 }"
    >
    </el-input>

    <el-button type="primary" @click="shareInstagramPost"
      >Enviar post</el-button
    >
  </div>

  <!-- <headerBar />
  <div class="pt-32">
    <router-view></router-view>
  </div> -->
</template>

<style scoped></style>
