<script setup lang="ts">
import categoriesStore from "../../store/categoriesStore";
</script>
<template>
<!-- categories list table -->
<div>
    <div></div>
    <div>
        <div v-for="(category, index) in categoriesStore.categories.get()">
        </div>
    </div>
</div>
</template>