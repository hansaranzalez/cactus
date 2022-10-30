<script setup lang="ts">
import orderComponentVue from "./userListItemComponent.vue";
import shoppingSessionsStore from "../../store/shoppingSessionsStore";
</script>

<template>
  <div
    class="p-5 bg-white rounded-lg shadow-md overflow-auto"
    :style="{ width: '480px', height: '400px' }"
  >
    <orderComponentVue
      v-for="(order, index) in shoppingSessionsStore.shoppingSessions.get()"
      :key="order.id"
      :user="order.user"
      :active="order.active"
      @click="shoppingSessionsStore.currentShoppingSession.set(order)"
    />
  </div>
</template>
