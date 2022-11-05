<script setup lang="ts">
import { computed } from 'vue';
import navigation from "../../assets/navigation";
import authStore from '../../store/authStore';
const loggedUser = computed(() => authStore.loggedUser.get());

</script>


<template>
    <div v-if="loggedUser" class="absolute top-0 left-0 right-0 z-20">
        <div class="flex px-20 bg-green-800 py-3 text-white">
            <div class="flex flex-col flex-1 items-start justify-center">
                <!-- logged user name -->
                <p v-if="loggedUser">{{ loggedUser.name }} {{ loggedUser.lastname }}</p>
                <p v-else>FLOROFILA ADMIN</p>
            </div>
            <div class="flex flex-col flex-1 items-end justify-center">
                <!-- logged user profile menu -->
                <div>
                    <el-popover placement="bottom" :width="400" trigger="click">
                        <!-- profile menu items -->
                        <div>
                            <el-button v-if="loggedUser" type="text" @click="authStore.logout()">Logout</el-button>
                            <el-button v-else type="text" @click="$router.push('/login')">Login</el-button>
                        </div>
                        <template #reference>
                            <el-button v-if="loggedUser" type="text" size="default" @click="">{{ loggedUser.name }}</el-button>
                            <el-button v-else type="text" size="default" @click="">Hello</el-button>
                            
                        </template>
                    </el-popover>
                </div>
            </div>
        </div>
        <div class="flex px-20 py-1 bg-white space-x-8 shadow-md">
            <p class="font-semibold text-green-800 py-2">FLOROFILA</p>
            <!-- navigation bar menu items horizontally -->
            <div :class="{'border-green-800 border-b': item.inRouterPath(), 'border-b border-transparent': !item.inRouterPath() }" class="cursor-pointer hover:border-green-800 py-2" @click="item.onClick" v-for="(item, index) in navigation">
                <p class="text-green-800">{{ item.name }}</p>
            </div>
        </div>
    </div>
</template>