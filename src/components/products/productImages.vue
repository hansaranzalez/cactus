<script lang="ts" setup>
import { computed, ref } from "vue";
import ProductsStore from "../../store/productsStore";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";

const dialogImageUrl = ref("");
const dialogVisible = ref(false);
const currnetDraggedImage = ref<any>(null);
const theFile = ref<any>(null);
const currentUploadImageId = ref<number | null>(null);
const imagesGrid = ref();

function dragStart(e: any) {
  currnetDraggedImage.value = e.target;
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.dropEffect = "move";
  e.dataTransfer.setData("id", e.target.id);

  setTimeout(() => {
    e.target.style.opacity = "0";
  }, 0);
}

function dragEnter(e: any) {
  e.preventDefault();
  e.target.style.opacity = ".5";
}

function drop(e: any) {
  const itemID = e.dataTransfer.getData("id");
  const it = e.target.id;
  console.log(itemID, it);
  ProductsStore.swapProductImageOrder(itemID, it);
  e.target.style.opacity = "1";
  return false;
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

function uploadFile(id: number) {
  currentUploadImageId.value = id;
  theFile.value.click();
}

function fileupload(e: any) {
  const files = e.target.files;
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      if (!currentUploadImageId.value) return;
      ProductsStore.addProductFormPayloadImage(
        {
          url: (e as any).target.result as string,
          id: Math.random(),
          name: file.name,
          file: file,
          order: ProductsStore.getProductFormPayload().images.length,
        },
        currentUploadImageId.value
      );
      currentUploadImageId.value += 1;
    };
  }
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
        draggable="true"
        :id="String(image.id)"
        v-for="(image, index) in ProductsStore.getProductFormPayloadImages()"
        :key="index"
        @dragstart="dragStart"
        @dragover="dragOver"
        @dragleave="dragLeave"
        @dragenter="dragEnter"
        @drop="drop"
        @dragend="dragEnd"
        @click="uploadFile(image.id)"
        :style="{
            backgroundImage: `url(${image.url})`,
            width: '208px !important',
            height: '208px !important',
          }"
        class="bg-gray-200 flex justify-center h-52 w-52 flex-shrink-0 items-center rounded-xl bg-cover bg-center overflow-hidden"
      >
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
  <el-dialog v-model="dialogVisible">
    <img w-full :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
</template>
<style>

</style>
