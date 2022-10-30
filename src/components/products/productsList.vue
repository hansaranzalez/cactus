<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import Product from "../../entities/Product";
import ProductsStore from "../../store/productsStore";
import getProductsList from "../../actions/products/getProductsList";

const tableColumns = ref([
  {
    id: 1,
    label: "Image",
    width: null,
    prop: "images",
  },
  {
    id: 2,
    label: "Name",
    width: null,
    prop: "name",
  },
  {
    id: 3,
    label: "Description",
    width: null,
    prop: "description",
  },
  {
    id: 4,
    label: "Price",
    width: null,
    prop: "price",
  },
  {
    id: 5,
    label: "In stock",
    width: null,
    prop: "in_stock",
  },
]);

const editProduct = (product: Product): void => {
  ProductsStore.setProductFormPayload(JSON.parse(JSON.stringify(product)));
  ProductsStore.setProductsFormEdit(true);
  ProductsStore.showProductsForm();
};

// pagination
const setCurrentPage = async (current: number) => {
  ProductsStore.setPaginationCurrentPage(current);
  await getProductsList();
};

// search query
const search = computed({
  get: (): string => ProductsStore.getSearchQuery(),
  set: (value: string): void => {
    ProductsStore.setProductsListLoading(true);
    ProductsStore.setSearchQuery(value);
    let tout;
    clearTimeout(tout);
    tout = setTimeout(async () => await getProductsList(), 1000);
  },
});

onMounted(async () => await getProductsList());
</script>

<template>
  <div
    class="mx-auto shadow-lg bg-white rounded-lg overflow-hidden"
    :style="{ width: '1250px' }"
  >
    <el-table v-loading="ProductsStore.getProductsListLoading()" :data="ProductsStore.getProductsList()">
      <el-table-column
        v-for="col in tableColumns"
        :prop="col.prop"
        :key="col.id"
        :label="col.label"
        :width="col.width"
        class="break-normal"
      >
        <template v-if="col.id === 1" #default="scope">
          <el-image
            v-if="scope.row.images.length"
            :src="scope.row.images[0].url"
            fit="fill"
            :lazy="true"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column width="650px">
        <template #header>
          <div class="flex space-x-3">
            <div>
              <el-input
                v-model="search"
                size="default"
                placeholder="Type to search"
              />
            </div>
            <div>
              <el-button
                type="primary"
                size="default"
                @click="ProductsStore.showProductsForm()"
                >Add product</el-button
              >
              <el-button
                type="primary"
                size="default"
                @click="ProductsStore.showCategoriesForm()"
                >Add category</el-button
              >
            </div>
          </div>
        </template>
        <template #default="scope">
          <button @click="editProduct(scope.row)" class="text-btn">Edit</button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="flex items-center justify-center"
      layout="prev, pager, next"
      :total="ProductsStore.getPaginationMeta().totalItems"
      :current-page="ProductsStore.getPaginationMeta().currentPage"
      @current-change="setCurrentPage"
    />
  </div>
</template>
