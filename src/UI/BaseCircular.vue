<template>
    <svg :width="size" :height="size" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" fill="none" :stroke="trackColor" stroke-width="10" />
        <circle cx="50" cy="50" r="45" fill="none" :stroke="progressColor" stroke-width="10"
            :stroke-dasharray="dashArray" :stroke-dashoffset="dashOffset" transform="rotate(-90 50 50)" />
        <text x="50" y="50" text-anchor="middle" dy="0.3em" class="rating">
            {{ rating.toFixed(1) }}
        </text>
    </svg>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
    rating: {
        type: Number,
        required: true,
    },
    size: { type: Number, default: 60 },
    trackColor: { type: String, default: "#e0e0e0" }, // Grey track
    progressColor: { type: String, default: "#4caf50" }, // Green progress
});

const circumference = computed(() => 2 * Math.PI * 45);
const dashArray = computed(() => circumference.value);
const dashOffset = computed(() => (1 - props.rating / 10) * circumference.value);
</script>

<style scoped>
.rating {
    fill: rgb(154, 155, 160);
    font-size: 24px;
    font-family: sans-serif;
    font-weight: 600;
}
</style>