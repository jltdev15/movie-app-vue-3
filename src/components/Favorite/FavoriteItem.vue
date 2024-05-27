<template>
    <div class="relative ">
        <router-link :to="{ path: '/movie/' + props.movie_id }">
            <div class="overflow-hidden shadow">
                <img class="transition duration-300 transform shadow-lg md:h-96 max-h-min hover:scale-110"
                    :src="imageSrc" alt="Movie poster">
            </div>
            <div class="py-2">
                <h1 class="text-xs font-bold leading-3 md:text-base text-gray-50">{{ title }}</h1>
                <p class="text-xs text-gray-400">{{ taglineValue }}</p>

            </div>
        </router-link>

    </div>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps(['poster_path', 'title', 'tagline', 'movie_id'])

const imageSrc = computed(() => {
    if (props.poster_path === null) {
        return 'https://www.movienewz.com/img/films/poster-holder.jpg'
    }
    return `https://image.tmdb.org/t/p/w1280/${props.poster_path}`
})

const taglineValue = computed(() => {
    if (props.tagline === '') {
        return 'Tagline not available'
    }
    return props.tagline
})



</script>