<script lang="ts" setup>
import { ref } from "vue";
import productsStore from "../../../store/productsStore";
import deleteProduct from "../../../actions/products/deleteProduct";
const confirmDeleteVisible = ref(false);
</script>

<template>
  <div class="flex space-x-8">
    <el-form-item prop="category">
      <el-select
        :loading="!productsStore.areCategoriesLoaded"
        v-model="productsStore.product.get().category"
        value-key="id"
        placeholder="Por favor seleccione una categoria"
        clearable
        filterable
        @change=""
      >
        <el-option
          v-for="(category, index) in productsStore.getCategoriesList()"
          :key="category"
          :label="category.name"
          :value="category"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item prop="visible">
      <el-checkbox
        v-model="productsStore.product.get().visible"
        label=""
        :indeterminate="false"
        @change=""
        >Visible</el-checkbox
      >
    </el-form-item>
    <el-form-item prop="visible">
      <el-popover :visible="confirmDeleteVisible" placement="bottom" :width="160">
        <p>Estas seguro?</p>
        <div style="text-align: right; margin: 0;">
          <el-button size="small" text @click="confirmDeleteVisible = false"
            >cancel</el-button
          >
          <el-button size="small" type="primary" @click="deleteProduct(productsStore.product.get())"
            >confirm</el-button
          >
        </div>
        <template #reference>
          <el-button
            class="py-3"
            type="text"
            size="default"
            @click="confirmDeleteVisible = true"
          >
            <i class="fas fa-trash-alt text-red-600"></i>
          </el-button>
        </template>
      </el-popover>
    </el-form-item>
  </div>
</template>
