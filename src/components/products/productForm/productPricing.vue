<script lang="ts" setup>
import { computed } from "vue";
import productsStore from "../../../store/productsStore";
import convertToCopCurrency from "../../../Utils/convertToCopCurrency";

const convertAndValidatePrice = (price: string): number => {
  const valueWithoutDollarSign = price.replace("$", "");
  const valueWithoutCommas = valueWithoutDollarSign.replace(/,/g, "");
  const valueWithoutPeriods = valueWithoutCommas.replace(/\./g, "");
  const isNumber = !isNaN(Number(valueWithoutPeriods));
  if (isNumber) {
    return Number(valueWithoutPeriods);
  }
  return 0;
};
const price = computed({
  get: (): string => {
    const price = productsStore.product.get().price;
    console.log(price)
    return convertToCopCurrency(price);
  },
  set: (value: string): void => {
    const price = convertAndValidatePrice(value);
    productsStore.product.get().price = price;
  },
});
const costPerUnit = computed({
  get: (): string =>
    convertToCopCurrency(productsStore.product.get().cost_per_unit),
  set: (value: string): void => {
    const price = convertAndValidatePrice(value);
    productsStore.product.get().cost_per_unit = price;
  },
});
</script>

<template>
  <div class="flex space-x-5">
    <el-form-item class="flex-1" prop="price" label="Precio">
      <el-input v-model="price"></el-input>
    </el-form-item>
    <el-form-item class="flex-1" prop="cost_per_unit" label="Costo por unidad">
      <el-input v-model="costPerUnit"></el-input>
    </el-form-item>
  </div>
</template>
