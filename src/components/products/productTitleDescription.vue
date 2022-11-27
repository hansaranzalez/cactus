<script lang="ts" setup>
import productsStore from "../../store/productsStore";
</script>

<template>
  <div class="p-5">
    <el-form-item prop="name" label="Name">
      <el-input v-model="productsStore.getProductFormPayload().name"></el-input>
    </el-form-item>
    <el-form-item prop="description" label="Description">
      <el-input
        type="textarea"
        v-model="productsStore.getProductFormPayload().description"
      ></el-input>
    </el-form-item>
  </div>
</template>
