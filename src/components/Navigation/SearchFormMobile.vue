<script setup>
import { ref } from "vue";
const props = defineProps(['isAuth'])
const emit = defineEmits(['find_movie'])
const searchValue = ref('');

const handleSearch = () => {
    emit('find_movie', searchValue.value)

}


</script>

<template>
    <div class="px-2 py-3 md:hidden">
        <input @input="handleSearch" v-model.trim="searchValue" placeholder="Search your favorite movie"
            class="inline-block w-full px-3 py-2 text-gray-800 rounded" />

    </div>


</template>