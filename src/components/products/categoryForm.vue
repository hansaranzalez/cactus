<script setup lang="ts">
import { computed, onUnmounted, ref, watch } from "vue";
import Category from "../../entities/Category";
import ProductsStore from "../../store/productsStore";
import { categoriesFormValidationRules } from "../../assets/formRules";
import deleteCategory from "../../actions/products/deleteCategory";
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

const createOrUpdateProduct = async (): Promise<void> => {
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
  <el-dialog title="" v-model="dialogVisible" width="30%" @close="resetForm">
    <transition
      enter-active-class="animate__animated animate__fadeInDown"
      leave-active-class="animate__animated animate__fadeOutUp"
    >
      <div
        v-if="confirmDelete"
        @click="deleteCategory(category)"
        class="bg-red-500 absolute text-white cursor-pointer text-center h-12 font-semibold w-full left-0 right-0 flex items-center justify-center top-0"
      >
        <p class="text-center">DELETE</p>
      </div>
    </transition>

    <div class="p-5">
      <h1 class="title-1">
        {{ ProductsStore.categoriesFormEditing() ? "Update" : "Create" }}
      </h1>
      <el-form
        :model="category"
        ref="categoryForm"
        :rules="categoriesFormValidationRules"
        label-width="80px"
        :inline="false"
        size="normal"
      >
        <div class="flex flex-col items-center justify-center space-y-3">
          <el-form-item prop="name" label="Name">
            <el-input v-model="category.name"></el-input>
          </el-form-item>
          <el-form-item prop="description" label="Description">
            <el-input type="textarea" v-model="category.description"></el-input>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <span slot="footer">
      <el-button type="text" @click="resetForm">Cancel</el-button>
      <el-button v-if="ProductsStore.categoriesFormEditing()" type="danger" @click="confirmDelete = true"
        >Delete</el-button
      >
      <el-button type="primary" @click="createOrUpdateProduct">{{
        ProductsStore.categoriesFormEditing() ? "Update" : "Create"
      }}</el-button>
    </span>
  </el-dialog>
</template>
