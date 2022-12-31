<script lang="ts" setup>
import productsStore from "../../../store/productsStore";
</script>

<template>
  <div>
    <el-form-item prop="name" label="Nombre">
      <el-input v-model="productsStore.product.get().name"></el-input>
    </el-form-item>
    <el-form-item prop="description" label="Descripcion">
      <el-input
        type="textarea"
        v-model="productsStore.product.get().description"
      ></el-input>
    </el-form-item>
  </div>
</template>
