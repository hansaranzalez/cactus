<script setup lang="ts">
import { computed, onUnmounted, ref, watch } from "vue";
import RolesStore from "../../store/rolesStore";
import Role from "../../entities/Role";
import Store from "../../store/appStore";
import getRolesList from "../../actions/roles/getRolesList";
import updateOrCreateRole from "../../actions/roles/updateOrCreateRole";
import deleteRole from "../../actions/roles/deleteRole";
import { roleFormValidationRules } from "../../assets/formRules";


const dialogVisible = computed({
  get: (): boolean => RolesStore.rolesFormVisible(),
  set: (value: boolean): void => {
    if (value) RolesStore.showRolesForm();
    else RolesStore.hideRolesForm();
  },
});

const roleForm = ref();
const role = computed<Role>({
  get: (): Role => RolesStore.getRole(),
  set: (role: Role): void => {
    RolesStore.setRole(role);
  },
});
const isEditing = computed(() => RolesStore.getIsEditing());
const confirmDelete = ref(false);

onUnmounted(() => {
  role.value = new Role();
  RolesStore.setIsEditing(false);
});

const createOrUpdateRoles = async (): Promise<void> => {
  roleForm.value.validate(async (valid: boolean) => {
    if (!valid) return;
    if (isEditing.value) {
      await updateOrCreateRole(role.value, role.value.id as number);
      await getRolesList();
      return;
    }
    await updateOrCreateRole(role.value);
    RolesStore.hideRolesForm();
    await getRolesList();
  });
};
const resetForm = (): void => {
  RolesStore.hideRolesForm();
  role.value = new Role();
};
</script>

<template>
  <el-dialog title="" v-model="dialogVisible" width="30%" @close="resetForm">
    <transition
    enter-active-class="animate__animated animate__fadeInDown"
    leave-active-class="animate__animated animate__fadeOutUp"
  >
    <div
      v-if="confirmDelete"
      @click="deleteRole()"
      class="bg-red-500 absolute text-white cursor-pointer text-center h-12 font-semibold w-full left-0 right-0 flex items-center justify-center top-0"
    >
      <p class="text-center">DELETE</p>
    </div>
  </transition>

  <div class="p-5">
    <h1 class="title-1">
      {{ RolesStore.getIsEditing() ? "Update" : "Create" }}
    </h1>
    <el-form
      :model="role"
      ref="roleForm"
      :rules="roleFormValidationRules"
      label-width="80px"
      :inline="false"
      size="normal"
    >
      <div class="flex flex-col items-center justify-center space-y-3">
        <el-form-item prop="name" label="Name">
          <el-input v-model="role.name"></el-input>
        </el-form-item>
        <el-form-item prop="description" label="Description">
          <el-input v-model="role.description"></el-input>
        </el-form-item>
        <el-form-item
          v-if="isEditing"
          disabled
          prop="created_at"
          label="Created"
        >
          <el-input v-model="role.created_at" />
        </el-form-item>
        <el-form-item
          v-if="isEditing"
          disabled
          prop="updated_at"
          label="Updated"
        >
          <el-input v-model="role.updated_at" />
        </el-form-item>
      </div>

      <span slot="footer">
        <el-button type="text" @click="resetForm">Cancel</el-button>
          <el-button
            v-if="isEditing"
            type="danger"
            @click="confirmDelete = true"
            >Delete</el-button
          >
          <el-button type="primary" @click="createOrUpdateRoles">{{
            isEditing ? "Update" : "Create"
          }}</el-button>
      </span>
    </el-form>
  </div>

</el-dialog>
  
</template>
