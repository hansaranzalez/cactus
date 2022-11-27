<script lang="ts" setup>
import productsStore from "../../store/productsStore";
</script>

<template>
  <div class="p-5 flex space-x-5">
    <el-form-item class="flex-1" prop="price" label="Precio">
      <el-input type="number" v-model="productsStore.getProductFormPayload().price"></el-input>
    </el-form-item>
    <el-form-item class="flex-1" prop="cost_per_unit" label="Costo por unidad">
      <el-input
        type="number"
        v-model="productsStore.getProductFormPayload().cost_per_unit"
      ></el-input>
    </el-form-item>
  </div>
</template>
