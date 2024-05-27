<template>

    <div class="flex flex-wrap gap-1">
        <p class="inline-block px-3 py-1 text-[0.5rem] md:text-xs font-semibold text-center bg-blue-600 text-gray-50 rounded"
            v-for="g in props.genre" :key="g.key">{{
                g
            }}</p>
    </div>

</template>

<script setup>
const props = defineProps(['genre']);
</script>