<template>

    <nav :class="isShow" class="absolute transition-all delay-150 ">
        <ul class="flex flex-col justify-between w-40 h-64 gap-3 px-3 py-3 text-sm text-gray-800 bg-white rounded-md">

            <div>
                <li class="border-b-2 border-gray-200">
                    <router-link @click="linkClick"
                        class="inline-block w-full px-3 py-3 font-semibold transition-colors rounded hover:text-gray-50 hover:bg-blue-800"
                        to="/favorites">Favorites</router-link>
                </li>
            </div>
            <li>
                <a href="/" @click="authStore.logout"
                    class="inline-block w-full px-3 py-3 font-semibold bg-red-600 rounded text-gray-50"
                    to="/profile">Sign
                    out</a>
            </li>
        </ul>
    </nav>

</template>

<script setup>
import { useAuthStore } from '@/stores/AuthStore';
import { computed, ref } from 'vue'
const authStore = useAuthStore()
const props = defineProps(['show'])
const emit = defineEmits(['toggleLinked'])
const linkClick = () => {
    emit('toggleLinked')
}

const isShow = computed(() => {
    return props.show ? 'right-5 z-50 top-[100%] opacity-100 ' : 'right-[-200%] top-[100%]'
})

console.log(props.show);

</script>