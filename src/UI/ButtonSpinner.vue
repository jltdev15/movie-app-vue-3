<template>

    <span v-if="show" class="transition-all duration-150 loader"></span>

</template>
<script setup>
const props = defineProps(['show'])


</script>
<style scoped>
.loader {
    width: 20px;
    height: 20px;
    border: 3px solid #ffffff;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
}

@keyframes rotation {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>