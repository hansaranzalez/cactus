<script lang="ts" setup>
import { UploadProps } from "element-plus";
import { computed, ref } from "vue";
import ProductsStore from "../../store/productsStore";

const uploadImageUrl = computed(
  () =>
    `http://localhost:3000/v1/products/${
      ProductsStore.getProductFormPayload().id
    }/upload`
);
const dialogImageUrl = ref("");
const dialogVisible = ref(false);

const handleRemove: UploadProps["onRemove"] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles);
};

const handlePictureCardPreview: UploadProps["onPreview"] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!;
  dialogVisible.value = true;
};
</script>

<template>
  <el-upload
    ref="uploader"
    :action="uploadImageUrl"
    list-type="picture-card"
    :auto-upload="ProductsStore.getIsEditing()"
    multiple
    :on-remove="handleRemove"
    :on-preview="handlePictureCardPreview"
    :file-list="ProductsStore.getProductFormPayload().images"
    with-credentials
  >
    <el-icon>
      <Plus />
    </el-icon>
  </el-upload>

  <el-dialog v-model="dialogVisible">
    <img w-full :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
</template>
