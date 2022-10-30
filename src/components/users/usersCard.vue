<script setup lang="ts">
import { onMounted } from "vue";
import getUsersList from "../../actions/users/getUsersList";
import UsersStore from "../../store/usersStore";

onMounted(async () => await getUsersList());
</script>

<template>
  <div class="p-5 bg-white rounded-lg shadow-md overflow-auto" :style="{ width: '480px', height: '400px'}">
    <div v-for="(user, index) in UsersStore.getUsersList()" class="flex">
      <div class="flex flex-1 flex-col items-start justify-center">
        <!-- user name and avatar-->
        <div class="flex flex-col items-start justify-center">
          <el-avatar
            icon="el-icon-user-solid"
            size="large"
            shape="circle"
            :src="user.avatar.url"  
            fit="fill"
          />
        </div>
        <div class="flex flex-col items-start justify-center">
          <span>{{ user.name }}</span>
        </div>
      </div>
      <div class="flex flex-col items-end justify-center">
        <!-- transaction status -->
        <p>Pending</p>
      </div>
    </div>
  </div>
</template>
