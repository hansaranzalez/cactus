<script setup lang="ts">
import navigation from "../../assets/navigation";
import appStore from "../../store/appStore";
import logout from "../../actions/auth/logout";
</script>
<template>
  
  <div class="flex flex-wrap justify-center">
    <div
      v-for="card in navigation"
      :key="card.id"
      class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2 hover:cursor-pointer"
      @click="card.onClick"
    >
      <div
        v-if="
          (appStore.getLoggedUser.value &&
            card.forAdmin &&
            appStore.getLoggedUser.value?.role.name === 'ADMIN') ||
          !card.forAdmin
        "
        class="bg-white rounded-lg shadow-lg p-4"
      >
        <div class="flex flex-col items-center">
          <div
            class="flex items-center justify-center w-16 h-16 rounded-full bg-gray-100"
          >
            <i :class="card.icon" class="text-2xl text-gray-600"></i>
          </div>
          <div class="text-center mt-4">
            <h5 class="text-lg font-semibold text-gray-700">
              {{ card.name }}
            </h5>
            <p class="text-sm text-gray-600">{{ card.name }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
