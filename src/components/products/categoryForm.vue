<script setup lang="ts">
import { computed, onUnmounted, ref, watch } from "vue";
import Category from "../../entities/Category";
import ProductsStore from "../../store/productsStore";
import { categoriesFormValidationRules } from "../../assets/formRules";
import updateOrCreateCategory from "../../actions/products/updateOrCreateCategory";

const dialogVisible = computed({
  get: (): boolean => ProductsStore.categoriesFormVisible(),
  set: (value: boolean): void => {
    if (value) ProductsStore.showCategoriesForm();
    else ProductsStore.hideCategoriesForm();
  },
});

const categoryForm = ref();
const category = computed<Category>({
  get: (): Category => ProductsStore.getCategorieFormPayload(),
  set: (category: Category): void => {
    ProductsStore.setCategorieFormPayload(category);
  },
});
const confirmDelete = ref(false);

const resetForm = (): void => {
  category.value = new Category();
  ProductsStore.setCategoriesFormEditing(false);
  categoryForm.value.resetFields();
  ProductsStore.hideCategoriesForm();
};

const createOrUpdateCategory = async (): Promise<void> => {
    categoryForm.value.validate(async (valid: boolean) => {
    if (!valid) return;
    if (ProductsStore.categoriesFormEditing()) {
      await updateOrCreateCategory(category.value, category.value.id as number);
      return;
    }
    await updateOrCreateCategory(category.value);
  });
};
</script>

<template>
  <el-dialog :title="ProductsStore.categoriesFormEditing() ? 'Actualizar' : 'Crear'" v-model="dialogVisible" width="30%" @close="resetForm">

    <div class="p-5">
      <el-form
        :model="category"
        ref="categoryForm"
        :rules="categoriesFormValidationRules"
        label-width="80px"
        size="normal"
        :inline="false"
        label-position="top"
      >
          <el-form-item prop="name" label="Name">
            <el-input v-model="category.name"></el-input>
          </el-form-item>
          <el-form-item prop="description" label="Description">
            <el-input type="textarea" v-model="category.description"></el-input>
          </el-form-item>
      </el-form>
    </div>
    <span slot="footer">
      <el-button type="text" @click="resetForm">Cancel</el-button>
      <el-button v-if="ProductsStore.categoriesFormEditing()" type="danger" @click="confirmDelete = true"
        >Eliminar</el-button
      >
      <el-button type="primary" @click="createOrUpdateCategory">{{
        ProductsStore.categoriesFormEditing() ? "Actualizar" : "Crear"
      }}</el-button>
    </span>
  </el-dialog>
</template>
