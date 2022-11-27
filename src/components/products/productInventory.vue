<script lang="ts" setup>
import productsStore from "../../store/productsStore";


</script>

<template>
  <div class=" p-5 flex space-x-5">
    <el-form-item class="flex-1" prop="quantity" label="Cantidad">
      <el-input
        type="number"
        v-model="productsStore.getProductFormPayload().quantity"
      ></el-input>
    </el-form-item>
    <el-form-item
      class="flex-1"
      prop="allow_purchase_when_out_of_stock"
      label="Mostrar si cantidad es 0"
    >
      <el-checkbox
        v-model="productsStore.getProductFormPayload().allow_purchase_when_out_of_stock"
        :indeterminate="false"
        @change=""
        >SI</el-checkbox
      >
    </el-form-item>
  </div>
</template>
