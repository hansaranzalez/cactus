<script setup lang="ts">
import { computed } from "vue";
import navigation from "../../assets/navigation";
import authStore from "../../store/authStore";
const loggedUser = computed(() => authStore.loggedUser.get());
</script>

<template>
  <div v-if="loggedUser" class="relative h-full">
    
    <div class="bg-green-florofila h-full pr-16">
      <div class="py-8">
        <p class="text-3xl text-white font-bold text-center">FLOROFILA</p>
      </div>
      
      <!-- navigation bar menu items horizontally -->
      <div
        class="cursor-pointer"
        @click="item.onClick"
        v-for="(item, index) in navigation"
      >
        <div
          :class="{
            'bg-opacity-20': item.inRouterPath(),
            'bg-opacity-0': !item.inRouterPath(),
          }"
          class=" bg-white  hover:bg-opacity-20"
        >
        <div class="flex space-x-4 mx-10 border-b border-white">
          <p class="text-white text-base uppercase py-8">
            <i :class="item.icon"></i>
          </p>
          <p class="text-white text-base uppercase py-8 flex-1">
            {{ item.name }}
          </p>
        </div>
          
        </div>
      </div>
    </div>
  </div>
</template>
