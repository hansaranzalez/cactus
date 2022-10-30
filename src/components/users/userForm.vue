<script setup lang="ts">
import deleteUser from "../../actions/users/deleteUser";
import { computed, onUnmounted, ref, watch } from "vue";
import getUsersList from "../../actions/users/getUsersList";
import updateOrCreateUser from "../../actions/users/updateOrCreateUser";
import User from "../../entities/Client";
import UsersStore from "../../store/usersStore";
import { userFormValidationRules } from "../../assets/formRules";
import deleteUserAvatar from "../../actions/users/deleteUserAvatar";
import { ElMessage, UploadProps } from "element-plus";

const dialogVisible = computed({
  get: (): boolean => UsersStore.usersFormVisible(),
  set: (value: boolean): void => {
    if (value) UsersStore.showUsersForm();
    else UsersStore.hideUsersForm();
  },
});

const userForm = ref();
const user = computed<User>({
  get: (): User => UsersStore.getUser(),
  set: (user: User): void => {
    UsersStore.setUser(user);
  },
});

const isEditing = computed(() => UsersStore.getIsEditing());
const confirmDelete = ref(false);

const pictureDialogVisible = ref(false);
const dialogImageUrl = ref("");
const avatarUploader = ref();
const uploadImageUrl = computed(
  () => `http://localhost:3000/v1/users/${UsersStore.getUser().id}/avatar`
);

onUnmounted(() => {
  user.value = new User();
  UsersStore.setIsEditing(false);
});

const createOrUpdateUser = async (): Promise<void> => {
  userForm.value.validate(async (valid: boolean) => {
    if (!valid) return;
    if (isEditing.value) {
      await updateOrCreateUser(user.value, user.value.id as number);
      await getUsersList();
      return;
    }
    await updateOrCreateUser(user.value);
    const result = await avatarUploader.value.submit();

    await getUsersList();
  });
};
const resetForm = (): void => {
  UsersStore.hideUsersForm();
  user.value = new User();
};

const handleRemove: UploadProps["onRemove"] = async (
  uploadFile: any,
  uploadFiles
): Promise<void> => {
  if (user.value.id && uploadFile.id) {
    await deleteUserAvatar(user.value.id, uploadFile.id);
    await getUsersList();
  }
};
const handleSuccess = async (response: any, file: any, fileList: any) => {
  console.log(response, file, fileList);
  await getUsersList();
};
const handlePictureCardPreview: UploadProps["onPreview"] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!;
  pictureDialogVisible.value = true;
};
const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
  if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("Avatar picture size can not exceed 2MB!");
    return false;
  }
  UsersStore.setCurrentUserAvatarUrl(rawFile);
  if (!UsersStore.getIsEditing()) {
    return false;
  }

  return true;
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
        @click="deleteUser()"
        class="bg-red-500 absolute text-white cursor-pointer text-center h-12 font-semibold w-full left-0 right-0 flex items-center justify-center top-0"
      >
        <p class="text-center">DELETE</p>
      </div>
    </transition>

    <div class="p-5">
      <el-upload
        ref="avatarUploader"
        class="avatar-uploader"
        :action="uploadImageUrl"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        :on-preview="handlePictureCardPreview"
        :show-file-list="false"
        :before-upload="beforeAvatarUpload"
      >
        <img
          v-if="UsersStore.getCurrentUserAvatarUrl()"
          :src="UsersStore.getCurrentUserAvatarUrl()"
          class="avatar"
        />
        <el-icon v-else>
          <Plus />
        </el-icon>
      </el-upload>
      <h1 class="title-1">
        {{ UsersStore.getIsEditing() ? "Update" : "Create" }}
      </h1>
      <el-form
        :model="user"
        ref="userForm"
        :rules="userFormValidationRules"
        label-width="80px"
        :inline="false"
        size="normal"
      >
        <div class="flex flex-col items-center justify-center space-y-3">
          <el-form-item prop="name" label="Name">
            <el-input v-model="user.name"></el-input>
          </el-form-item>
          <el-form-item prop="description" label="Lastname">
            <el-input v-model="user.lastname"></el-input>
          </el-form-item>
          <el-form-item prop="price" label="Email">
            <el-input v-model="user.email"></el-input>
          </el-form-item>
          <el-form-item prop="price" label="Password">
            <el-input
              :disabled="isEditing"
              type="password"
              v-model="user.password"
            ></el-input>
          </el-form-item>
          <el-form-item
            v-if="isEditing"
            disabled
            prop="created_at"
            label="Created"
          >
            <el-input v-model="user.created_at" />
          </el-form-item>
          <el-form-item
            v-if="isEditing"
            disabled
            prop="updated_at"
            label="Updated"
          >
            <el-input v-model="user.updated_at" />
          </el-form-item>
        </div>
      </el-form>
    </div>
    <span slot="footer">
      <el-button type="text" @click="resetForm">Cancel</el-button>
      <el-button v-if="isEditing" type="danger" @click="confirmDelete = true"
        >Delete</el-button
      >
      <el-button type="primary" @click="createOrUpdateUser">{{
        isEditing ? "Update" : "Create"
      }}</el-button>
    </span>
  </el-dialog>
</template>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
