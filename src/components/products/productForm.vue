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


const dialogVisible = computed({
  get: (): boolean => ProductsStore.productsFormVisible(),
  set: (value: boolean): void => {
    if (value) ProductsStore.showProductsForm();
    else ProductsStore.hideProductsForm();
  },
});

const pictureDialogVisible = ref(false);
const productsForm = ref();
const product = computed<Product>({
  get: (): Product => ProductsStore.getProductFormPayload(),
  set: (product: Product): void => {
    ProductsStore.setProductFormPayload(product);
  },
});
const isEditing = computed(() => ProductsStore.productsFormEdit());
const confirmDelete = ref(false);
const dialogImageUrl = ref("");
const uploader = ref();

const uploadImageUrl = computed(
  () =>
    `http://localhost:3000/v1/products/${
      ProductsStore.getProductFormPayload().id
    }/upload`
);


onUnmounted(async () => {
  product.value = new Product();
  ProductsStore.setProductsFormEdit(false);
});

const createOrUpdateProduct = async (): Promise<void> => {
  productsForm.value.validate(async (valid: boolean) => {
    if (!valid) return;
    if (isEditing.value) {
      await updateOrCreateProduct(product.value, product.value.id as number);
      await getProductsList();
      return;
    }
    await updateOrCreateProduct(product.value);
    await uploader.value.submit();
    await getProductsList();
  });
};

const resetForm = (): void => {
  product.value = new Product();
  ProductsStore.setProductsFormEdit(false);
  productsForm.value.resetFields();
  ProductsStore.hideProductsForm();
};

const handleRemove: UploadProps["onRemove"] = async (
  uploadFile: any,
  uploadFiles
): Promise<void> => {
  if (product.value.id && uploadFile.id) {
    await deleteProductImage(product.value.id, uploadFile.id);
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
  <el-dialog title="" v-model="dialogVisible" width="30%" @close="resetForm">
    <transition
      enter-active-class="animate__animated animate__fadeInDown"
      leave-active-class="animate__animated animate__fadeOutUp"
    >
      <div
        v-if="confirmDelete"
        @click="deleteProduct(product)"
        class="bg-red-500 absolute text-white cursor-pointer text-center h-12 font-semibold w-full left-0 right-0 flex items-center justify-center top-0"
      >
        <p class="text-center">DELETE</p>
      </div>
    </transition>

    <div class="p-5">
      <el-upload
        ref="uploader"
        :action="uploadImageUrl"
        list-type="picture-card"
        :auto-upload="ProductsStore.productsFormEdit()"
        multiple
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        :on-preview="handlePictureCardPreview"
        :file-list="ProductsStore.getProductFormPayload().images"
      >
        <el-icon>
          <Plus />
        </el-icon>
      </el-upload>

      <el-dialog v-model="pictureDialogVisible">
        <img w-full :src="dialogImageUrl" alt="Preview Image" />
      </el-dialog>
      <h1 class="title-1">
        {{ ProductsStore.productsFormEdit() ? "Update" : "Create" }}
      </h1>
      <el-form
        :model="product"
        ref="productsForm"
        :rules="productFormValidationRules"
        label-width="80px"
        :inline="false"
        size="normal"
      >
        <div class="flex flex-col items-center justify-center space-y-3">
          <el-form-item prop="name" label="Name">
            <el-input v-model="product.name"></el-input>
          </el-form-item>
          <el-form-item prop="description" label="Description">
            <el-input type="textarea" v-model="product.description"></el-input>
          </el-form-item>
          <el-form-item prop="price" label="Price">
            <el-input v-model="product.price"></el-input>
          </el-form-item>
          <el-form-item prop="in_stock" label="In stock">
            <el-input-number v-model="product.in_stock" />
          </el-form-item>
          <el-form-item prop="category" label="Categoria">
            <el-select
              :loading="!ProductsStore.areCategoriesLoaded"
              v-model="product.category"
              value-key="id"
              placeholder="Por favor seleccione una categoria"
              clearable
              filterable
              @change=""
            >
              <el-option
                v-for="category, index in ProductsStore.getCategoriesList()"
                :key="index"
                :label="category.name"
                :value="category"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <span slot="footer">
      <el-button type="text" @click="resetForm">Cancel</el-button>
      <el-button v-if="isEditing" type="danger" @click="confirmDelete = true"
        >Delete</el-button
      >
      <el-button type="primary" @click="createOrUpdateProduct">{{
        isEditing ? "Update" : "Create"
      }}</el-button>
    </span>
  </el-dialog>
</template>

<style scoped></style>
