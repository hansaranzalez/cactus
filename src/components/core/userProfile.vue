<script lang="ts" setup>
import { computed } from "vue";
import authStore from "../../store/authStore";
const loggedUser = computed(() => authStore.loggedUser.get());
</script>

<template>
    <div class="flex bg-white  p-8 space-x-5 rounded-3xl">
      <div class="flex flex-col flex-1 items-start justify-center">
        <div>
          <el-popover placement="bottom" :width="400" trigger="click">
            <div>
              <el-button
                v-if="loggedUser"
                type="text"
                @click="authStore.logout()"
                >Logout</el-button
              >
              <el-button v-else type="text" @click="$router.push('/login')"
                >Login</el-button
              >
            </div>
            <template #reference>
              <el-button
                v-if="loggedUser"
                type="text"
                size="default"
                class="text-green-florofila text-lg"
                @click=""
                >
                <!-- cog icon button -->
                <i class="fa-thin fa-gear"></i>
                </el-button
              >
              <el-button v-else type="text" size="default" @click=""
                >Hello</el-button
              >
            </template>
          </el-popover>
        </div>
      </div>
      <div class="space-y-3">
        <el-avatar class="mx-auto block border-green-florofila border-solid border-4" icon="el-icon-user-solid" :size="122" shape="circle" :src="loggedUser?.avatar.url" fit="fill"></el-avatar>
        <p v-if="loggedUser" class="text-green-florofila font-bold text-xl uppercase">Hola, {{ loggedUser.name }}</p>
        <p v-else>FLOROFILA ADMIN</p>
      </div>
      <div class="flex flex-col items-end justify-center">
        <div>
            <!-- notifications icon button -->
            <el-button class="text-green-florofila text-lg" type="text" size="default" @click="">
                <i class="fa-thin fa-bell"></i>
            </el-button>
        </div>
      </div>
    </div>
</template>