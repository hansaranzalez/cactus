<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import getRolesList from "../../actions/roles/getRolesList";
import Role from "../../entities/Role";
import RolesStore from "../../store/rolesStore";

const tableColumns = ref([
{
    id: 1,
    label: "ID",
    width: '39px',
    prop: "id",
  },
  {
    id: 2,
    label: "Name",
    width: '70px',
    prop: "name",
  },
  {
    id: 3,
    label: "Description",
    width: null,
    prop: "description",
  },
]);

const editUser = (role: Role): void => {
  RolesStore.setRole(JSON.parse(JSON.stringify(role)));
  RolesStore.setIsEditing(true);
  RolesStore.showRolesForm();
};

const setCurrentPage = async (current: number) => {
  RolesStore.setPaginationCurrentPage(current);
  await getRolesList();
};

const search = computed({
  get: (): string => RolesStore.getSearchQuery(),
  set: (value: string): void => {
    RolesStore.setRolesListLoading(true);
    RolesStore.setSearchQuery(value);
    let tout;
    clearTimeout(tout);
    tout = setTimeout(async () => await getRolesList(), 1000);
  },
});

onMounted(async () => await getRolesList());
</script>
<template>
  <div
    class="mx-auto shadow-lg bg-white rounded-lg overflow-hidden"
    :style="{ width: '950px' }"
  >
    <el-table
      v-loading="RolesStore.getRolesListLoading()"
      :data="RolesStore.getRolesList()"
    >
      <el-table-column
        v-for="col in tableColumns"
        :prop="col.prop"
        :key="col.id"
        :label="col.label"
        :width="col.width"
        class="break-normal"
      >
      </el-table-column>
      <el-table-column width="250px">
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
                @click="RolesStore.showRolesForm()"
                >Create</el-button
              >
            </div>
          </div>
        </template>
        <template #default="scope">
          <button @click="editUser(scope.row)" class="text-btn">Edit</button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="flex items-center justify-center"
      layout="prev, pager, next"
      :total="RolesStore.getPaginationMeta().totalItems"
      :current-page="RolesStore.getPaginationMeta().currentPage"
      @current-change="setCurrentPage"
    />
  </div>
</template>
