<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import Product from "../../../entities/Product";
import ProductsStore from "../../../store/productsStore";
import updateOrCreateProduct from "../../../actions/products/updateOrCreateProduct";
import getProductsList from "../../../actions/products/getProductsList";
import { productFormValidationRules } from "../../../assets/formRules";
import getCategoriesList from "../../../actions/products/getCategoriesList";
import productImagesVue from "./productImages.vue";
import titleDescriptionVue from "./productTitleDescription.vue";
import productPricingVue from "./productPricing.vue";
import productInventoryVue from "./productInventory.vue";
import productOtherConfigurationsVue from "./productOtherConfigurations.vue";
import uploadImages from "../../../actions/products/uploadImages";
import { ElMessage } from "element-plus";

const dialogVisible = computed({
  get: (): boolean => ProductsStore.form.visible.get(),
  set: (value: boolean): void => {
    ProductsStore.form.visible.set(value);
  },
});

const productsForm = ref();
const isEditing = computed(() => ProductsStore.form.isEditing.get());

onUnmounted(async () => {
  ProductsStore.form.set(new Product());
  ProductsStore.form.isEditing.set(false);
});

const createOrUpdateProduct = async (): Promise<void> => {uploadImages
  productsForm.value.validate(async (valid: boolean) => {
    const product = ProductsStore.form.get();
    if (valid) {
      await updateOrCreateProduct(product, product.id);
      await uploadImages();
      await getProductsList();
      return;
    }
    ElMessage.error("Por favor revise los campos marcados con asterisco (*)");
  });
};

const resetForm = (): void => {
  ProductsStore.form.set(new Product());
  ProductsStore.form.isEditing.set(false);
  dialogVisible.value = false;
};

onMounted(async () => {
  await getCategoriesList();
  ElMessage.warning("Los campos marcados con asterisco (*) son obligatorios");
});
</script>

<template>
  <el-form
    :model="ProductsStore.form.get()"
    ref="productsForm"
    :rules="productFormValidationRules"
    label-width="80px"
    :inline="false"
    size="large"
    label-position="top"
  >
    <div class="px-40 space-y-5">
      <productOtherConfigurationsVue />
      <productImagesVue />
      <titleDescriptionVue />
      <productPricingVue />
      <productInventoryVue />
    </div>
    <div class="text-center">
      <el-button type="primary" @click="createOrUpdateProduct">{{
        isEditing ? "Update" : "Create"
      }}</el-button>
      <el-button type="danger" @click="resetForm">Cancel</el-button>
    </div>
  </el-form>
</template>

<style scoped></style>
