<script setup lang="ts">
import ShoppingSession from "../../entities/ShoppingSession";
import User from "../../entities/User";
import shoppingSessionsStore from "../../store/shoppingSessionsStore";

defineProps<{
  user: User;
  active: boolean;
}>();
</script>

<template>
  <div class="flex">
    <div class="flex flex-1 flex-col items-start justify-center">
      <!-- user name and avatar-->
      <div class="flex flex-col items-start justify-center">
        <el-avatar
          icon="el-icon-user-solid"
          size="large"
          shape="circle"
          :src="(user.avatar)? user.avatar.url : ''"
          fit="fill"
        />
      </div>
      <div class="flex flex-col items-start justify-center">
        <span>{{ user.name }}</span>
      </div>
    </div>
    <div class="flex flex-col items-end justify-center">
      <!-- transaction status -->
      <p>{{ active ? "Pendiente" : "Pagada" }}</p>
    </div>
  </div>
</template>
