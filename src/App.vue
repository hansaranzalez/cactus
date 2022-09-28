<script setup lang="ts">
  import { auth } from './firebase'
  import toast from './components/core/toast.vue';
  import Toast from './components/core/toast.vue';
  import logout from './actions/auth/logout';


</script>

<template>
  <toast message="HELLO TOAST" type="info-toast"/>
  <el-button type="primary" size="default" @click="logout">Salir</el-button>
  <router-view></router-view>
</template>

<style scoped>

</style>
