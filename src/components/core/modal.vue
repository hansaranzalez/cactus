<script setup lang="ts">
import { computed } from 'vue';
import Store from '../../store/appStore';
const modal = computed(() => Store.getModal())
</script>

<template>
  <transition>
    <div v-if="modal.visible" class="fixed inset-0 z-40">
      <div
        class="bg-white w-80 rounded-lg shadow-lg absolute z-20 left-0 right-0 mr-auto ml-auto mt-32 overflow-hidden"
      >
        <component :is="modal.component" />
      </div>
      <div
        @click="Store.setModalVisible(false)"
        class="fixed inset-0 flex items-center justify-center bg-black opacity-70"
      />
    </div>
  </transition>
</template>

<style scoped></style>
