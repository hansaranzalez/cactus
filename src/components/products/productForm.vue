<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import Product from "../../entities/Product";
import addProductData from "../../assets/data/addProduct.data";
import ProductsStore from "../../store/productsStore";
import updateOrCreateProduct from "../../actions/products/updateOrCreateProduct";
import deleteProduct from "../../actions/products/deleteProduct";
import getProductsList from "../../actions/products/getProductsList";
import { productFormValidationRules } from "../../assets/formRules";
import { UploadProps } from "element-plus";
import deleteProductImage from "../../actions/products/deleteProductImage";
import getCategoriesList from "../../actions/products/getCategoriesList";
import productImagesVue from "./productImages.vue";
import titleDescriptionVue from "./productTitleDescription.vue";
import productPricingVue from "./productPricing.vue";
import productInventoryVue from "./productInventory.vue";
import productOtherConfigurationsVue from "./productOtherConfigurations.vue";
import uploadImages from "../../actions/products/uploadImages";

const dialogVisible = computed({
  get: (): boolean => ProductsStore.productFormVisible.get(),
  set: (value: boolean): void => {
    ProductsStore.productFormVisible.set(value);
  },
});

const pictureDialogVisible = ref(false);
const productsForm = ref();
const isEditing = computed(() => ProductsStore.productsFormEdit());
const confirmDelete = ref(false);
const dialogImageUrl = ref("");
const uploader = ref();

onUnmounted(async () => {
  ProductsStore.setProductFormPayload(new Product());
  ProductsStore.setProductsFormEdit(false);
});

const createOrUpdateProduct = async (): Promise<void> => {
  productsForm.value.validate(async (valid: boolean) => {
    const product = ProductsStore.getProductFormPayload();
    if (!valid) return;
    if (isEditing.value) {
      await updateOrCreateProduct(product, product.id as number);
      await uploadImages(product.images);
      await getProductsList();
      return;
    }
    await updateOrCreateProduct(product);
    await uploader.value.submit();
    await getProductsList();
  });
};

const resetForm = (): void => {
  ProductsStore.setProductFormPayload(new Product());
  ProductsStore.setProductsFormEdit(false);
  dialogVisible.value = false;
};

const handleRemove: UploadProps["onRemove"] = async (
  uploadFile: any,
  uploadFiles
): Promise<void> => {
  const product = ProductsStore.getProductFormPayload();
  if (product.id && uploadFile.id) {
    await deleteProductImage(product.id, uploadFile.id);
    await getProductsList();
  }
};
const handleSuccess = async (response: any, file: any, fileList: any) => {
  await getProductsList();
};
const handlePictureCardPreview: UploadProps["onPreview"] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!;
  pictureDialogVisible.value = true;
};

onMounted(async () => await getCategoriesList());
</script>

<template>
  <el-form
    :model="ProductsStore.getProductFormPayload()"
    ref="titleDescriptionForm"
    :rules="productFormValidationRules"
    label-width="80px"
    :inline="false"
    size="large"
    label-position="top"
  >
    <div class=" px-40">
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
