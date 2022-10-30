<script setup lang="ts">
import { onMounted } from 'vue';
import usersListComponentVue from '../../components/shoppingSessions/usersListComponent.vue';
import shoppingSessionsStore from '../../store/shoppingSessionsStore';
import orderComponentVue from '../../components/shoppingSessions/orderComponent.vue';
 onMounted(() => shoppingSessionsStore.inView.set(true));

</script>


<template>
  <usersListComponentVue />
  <orderComponentVue />
</template>