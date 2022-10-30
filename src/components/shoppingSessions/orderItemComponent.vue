<script setup lang="ts">
import Product from "../../entities/Product";
import convertToCopCurrency from "../../Utils/convertToCopCurrency";

defineProps<{
  product: Product;
  totalPrice: number;
}>();
</script>

<template>
  <div v-if="product" class="bg-white relative h-44 shadow-sm">
    <div class="flex h-full">
      <div class="flex-1">
        <div class="flex space-x-2 py-5 mx-5">
          <div>
            <img
              :src="product.images[0].url"
              alt=""
              srcset=""
              class="rounded-2xl w-28 h-28"
            />
          </div>
          <div>
            <p
              class="text-sm text-gray-500"
              @click="
                $router.push({ name: 'product', params: { id: product.id } })
              "
            >
              {{ product.name }}
            </p>
            <p class="text-lg font-semibold text-gray-600">
              {{ convertToCopCurrency(product.price) }}
            </p>
            <div>
              <quantityVue :product="product" />
            </div>
          </div>
        </div>
        <div>
          <div class="flex w-1/2 space-x-2 p-1 ml-auto">
            <p class="text-xs font-semibold text-gray-500">Sub total:</p>
            <p class="text-xs text-gray-600 font-semibold">
              {{ convertToCopCurrency(totalPrice) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
