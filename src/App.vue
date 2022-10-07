<script setup lang="ts">
  import logout from './actions/auth/logout';


</script>

<template>
  <el-button type="primary" size="default" @click="logout">Salir</el-button>
  <router-view></router-view>
</template>

<style scoped>

</style>
