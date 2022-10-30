<script lang="ts" setup>
import { ref, computed } from "vue";
import orderItemComponentVue from "./orderItemComponent.vue";
import shoppingSessionsStore from "../../store/shoppingSessionsStore";
import convertToCopCurrency from "../../Utils/convertToCopCurrency";
const shoppingSession = computed(() => shoppingSessionsStore.currentShoppingSession.get());
</script>

<template>
  <div
    class="p-5 bg-white rounded-lg shadow-md overflow-auto"
    :style="{ width: '480px', height: '400px' }"
    v-if="shoppingSession"
  >
    <div class="flex flex-1 flex-col items-start justify-center">
      <!-- products -->
      <div v-if="shoppingSession.cart && shoppingSession.cart.products.length > 0">
        <orderItemComponentVue
          v-for="(orderItem, index) in shoppingSession.cart.products"
          :key="index"
          :product="orderItem.product"
          :totalPrice="shoppingSession.cart.total_price"
        />
      </div>
    </div>
    <div>
        <div v-if="shoppingSession.cart" class="flex w-1/2 space-x-2 p-1 ml-auto">
            <p class="text-xs font-semibold text-gray-500">Total:</p>
            <p class="text-xs text-gray-600 font-semibold">
            {{ convertToCopCurrency(shoppingSession.cart.total_price) }}
            </p>
        </div>
    </div>
    <div class="flex flex-col items-end justify-center">
      <!-- transaction status -->
      <p>{{ shoppingSession.active ? "Pendiente" : "Pagada" }}</p>
    </div>
  </div>
</template>
