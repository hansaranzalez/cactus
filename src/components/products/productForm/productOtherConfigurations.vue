<script lang="ts" setup>
import productsStore from "../../../store/productsStore";
</script>

<template>
  <div class="flex space-x-8">
    <el-form-item prop="category">
      <el-select
        :loading="!productsStore.areCategoriesLoaded"
        v-model="productsStore.form.get().category"
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
          :value="category.id"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item prop="visible">
      <el-checkbox
        v-model="productsStore.form.get().visible"
        label=""
        :indeterminate="false"
        @change=""
        >Visible</el-checkbox
      >
    </el-form-item>
  </div>
</template>
