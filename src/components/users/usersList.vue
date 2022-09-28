<script setup lang="ts">
import { ElMessage, ElMessageBox } from "element-plus";
import { computed, onMounted, ref } from "vue";
import { RoleType } from "../../@types";
import getRolesList from "../../actions/roles/getRolesList";
import assosiateRole from "../../actions/users/associateRole";
import getUsersList from "../../actions/users/getUsersList";
import User from "../../entities/User";
import Store from "../../store/appStore";
import UsersStore from "../../store/usersStore";
import UsersForm from "./userForm.vue";
import RolesStore from "../../store/rolesStore";

const tableColumns = ref([
  {
    id: 1,
    label: "Name",
    width: null,
    prop: "name",
  },
  {
    id: 2,
    label: "Lastname",
    width: null,
    prop: "lastname",
  },
  {
    id: 3,
    label: "Email",
    width: null,
    prop: "email",
  },
]);

const editUser = (user: User): void => {
  UsersStore.setUser(JSON.parse(JSON.stringify(user)));
  UsersStore.setIsEditing(true);
  Store.setModal({
    visible: true,
    component: UsersForm,
  });
};

const setCurrentPage = async (current: number) => {
  UsersStore.setPaginationCurrentPage(current);
  await getUsersList();
};

const search = computed({
  get: (): string => UsersStore.getSearchQuery(),
  set: (value: string): void => {
    UsersStore.setUsersListLoading(true);
    UsersStore.setSearchQuery(value);
    let tout;
    clearTimeout(tout);
    tout = setTimeout(async () => await getUsersList(), 1000);
  },
});

const setRole = (event: boolean, role: RoleType, user: User): void => {
  ElMessageBox.confirm("user role change?", "Warning", {
    confirmButtonText: "OK",
    cancelButtonText: "Cancel",
    type: "warning",
  })
    .then(async () => {
      await getRolesList();
      const rolesList = RolesStore.getRolesList();
      const roleCtx = rolesList.find((r) => r.name === role);
      if (!roleCtx) return;
      await assosiateRole(user, roleCtx);
      getUsersList();
    })
    .catch(() => {
      if (role === "ADMIN") user.isAdmin = !event;
      if (role === "USER") user.isUser = !event;
      if (role === "GUEST") user.isGuest = !event;
      ElMessage({
        type: "info",
        message: "Role update canceled",
      });
    });
};

onMounted(async () => await getUsersList());
</script>
<template>
  <div
    class="mx-auto shadow-lg bg-white rounded-lg overflow-hidden"
    :style="{ width: '1350px' }"
  >
    <el-table
      v-loading="UsersStore.getUsersListLoading()"
      :data="UsersStore.getUsersList()"
    >
      <el-table-column width="100px" label="User">
        <template #default="{ row }">
          <el-avatar
            icon="el-icon-user-solid"
            size="large"
            shape="circle"
            :src="row.avatar.url"
            fit="fill"
          ></el-avatar>
        </template>
      </el-table-column>
      <el-table-column
        v-for="col in tableColumns"
        :prop="col.prop"
        :key="col.id"
        :label="col.label"
        :width="col.width"
        class="break-normal"
      >
      </el-table-column>
      <el-table-column width="100px" label="Admin">
        <template #default="{ row }">
          <el-switch
            v-model="row.isAdmin"
            :disabled="row.isAdmin"
            :active-value="true"
            :inactive-value="false"
            @change="setRole($event, 'ADMIN', row)"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column width="100px" label="User">
        <template #default="{ row }">
          <el-switch
            v-model="row.isUser"
            :disabled="row.isUser"
            :active-value="true"
            :inactive-value="false"
            @change="setRole($event, 'USER', row)"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column width="100px" label="Gest">
        <template #default="{ row }">
          <el-switch
            v-model="row.isGuest"
            :disabled="row.isGuest"
            :active-value="true"
            :inactive-value="false"
            @change="setRole($event, 'GUEST', row)"
          >
          </el-switch>
        </template>
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
                @click="
                  Store.setModal({
                    visible: true,
                    component: UsersForm,
                  })
                "
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
      :total="UsersStore.getPaginationMeta().totalItems"
      :current-page="UsersStore.getPaginationMeta().currentPage"
      @current-change="setCurrentPage"
    />
  </div>
</template>
