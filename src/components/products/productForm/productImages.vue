<script lang="ts" setup>
import { computed, ref } from "vue";
import ProductsStore from "../../../store/productsStore";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import { makeUUID } from "../../../Utils/makeTempId";
import { ProductImage } from "../../../entities/ProductImage";
import deleteProductImage from "../../../actions/products/deleteProductImage";

const dialogImageUrl = ref("");
const dialogVisible = ref(false);
const currnetDraggedImage = ref<any>(null);
const theFile = ref<any>(null);
const imagesGrid = ref();
const selectedImg = ref("");
const dragging = ref(false);

function dragStart(e: any) {
  currnetDraggedImage.value = e.target;
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.dropEffect = "move";
  e.dataTransfer.setData("id", e.target.id);
  dragging.value = true;

  setTimeout(() => {
    e.target.style.opacity = "0";
  }, 0);
}

function dragEnter(e: any) {
  e.preventDefault();
  e.target.style.opacity = ".5";
}

function drop(e: any) {
  const imgAId = e.dataTransfer.getData("id");
  const imgBId = e.target.id;
  if (e.target.id === "") {
    e.target.style.opacity = "1";
    dragging.value = false;
    return;
  }
  console.log("imgAId", imgAId, "imgBId", imgBId);
  ProductsStore.currentProductImages.reorderImages(imgAId, imgBId);
  e.target.style.opacity = "1";
  dragging.value = false;
  // return false;
}

function dragEnd(e: any) {
  e.target.style.opacity = "1";
}

function dragOver(e: any) {
  e.preventDefault();
  e.target.style.opacity = ".4";
}

function dragLeave(e: any) {
  e.preventDefault();
  e.target.style.opacity = "1";
}

function onFileUpload(event: any) {
  console.log(event);
  console.log("Files Uploaded");
}

function uploadFile(imgId: string) {
  selectedImg.value = imgId;
  theFile.value.click();
}

function fileupload(e: any) {
  const files = e.target.files;
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      console.log("selected img", selectedImg.value);
      ProductsStore.currentProductImages.add(
        new ProductImage({
          url: (e as any).target.result as string,
          id: makeUUID(),
          name: file.name,
          file,
          order: ProductsStore.currentProductImages.getLastOrder(),
          isNew: true,
        }),
        selectedImg.value
      );
      selectedImg.value = "";
    };
  }
}

async function delProductImg(image: ProductImage): Promise<void> {
  const productId = ProductsStore.product.get().id;

  if (!productId) return;
  if (ProductsStore.product.isEditing.get() && !image.isNew) {
    await deleteProductImage(productId, image.id);
  }

  ProductsStore.currentProductImages.delete(image.id);
}

function preview(image: ProductImage): void {
  dialogImageUrl.value = image.url;
  dialogVisible.value = true;
}
</script>

<template>
  <div class="imagesGrid">
    <carousel
      ref="imagesGrid"
      class="flex transition-all space-x-3"
      :items-to-show="3"
      :mouseDrag="false"
    >
      <slide
        :draggable="image.name !== '' ? 'true' : 'false'"
        :id="image.id"
        v-for="(image, index) in ProductsStore.currentProductImages.get()"
        :key="image.order"
        @dragstart="dragStart"
        @dragover="dragOver"
        @dragleave="dragLeave"
        @dragenter="dragEnter"
        @drop="drop"
        @dragend="dragEnd"
        :style="{
          backgroundImage: `url(${image.url})`,
          width: '208px !important',
          height: '208px !important',
        }"
        class="bg-gray-200 relative flex justify-center h-52 w-52 flex-shrink-0 items-center rounded-xl bg-cover bg-center overflow-hidden"
      >
        <div
          v-if="!dragging"
          class="absolute inset-0 hover:bg-black hover:bg-opacity-20 opacity-0 hover:opacity-100"
        >
          <el-button
            v-if="image.name !== ''"
            type="text"
            size="default"
            @click="delProductImg(image)"
          >
            <!-- fontawesome remove icon -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </el-button>
          <el-button
            v-if="image.name !== ''"
            type="text"
            size="default"
            @click="preview(image)"
          >
            <!-- preview icon -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </el-button>
          <el-button type="text" size="default" @click="uploadFile(image.id)">
            <!-- upload icon -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </el-button>
        </div>
      </slide>
      <template #addons>
        <navigation />
      </template>
    </carousel>
  </div>

  <input
    ref="theFile"
    @click="onFileUpload"
    @change="fileupload"
    type="file"
    multiple
    hidden
  />
  <el-dialog v-model="dialogVisible" append-to-body>
    <img w-full :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
</template>
<style></style>
