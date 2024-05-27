<template>
    <div class="relative ">
        <router-link :to="{ path: '/movie/' + movie_id }">
            <div class="overflow-hidden shadow">
                <img class="transition duration-300 transform shadow-lg  hover:scale-110" :src="imageSrc"
                    alt="Movie poster">
            </div>
            <div :class="checkedRating"
                class=" absolute top-1 flex items-center justify-center text-[0.6rem] text-gray-50 font-semibold right-1 rounded-[50%] h-8 w-8">
                <p>{{ singDecimalRating }}</p>
            </div>
            <div class="pt-3">
                <h1 class="text-xs font-bold leading-3 md:text-lg text-gray-50">{{ title }}</h1>
                <p class="text-[0.6rem] md:text-sm py-2 text-gray-500">Release date <span>{{ date }}</span></p>

            </div>
        </router-link>
        <MovieCategory :genre="genre_name" />
    </div>
</template>


<script setup>
import { computed, onMounted, ref } from "vue"
import MovieCategory from './MovieCategory.vue'
const props = defineProps(['src', 'title', 'date', 'rating', 'genre_id', 'overview_detail', 'movie_id'])
const genre_name = ref([])
const imageSrc = computed(() => {
    if (props.src === null) {
        return 'https://www.movienewz.com/img/films/poster-holder.jpg'
    }
    return `https://image.tmdb.org/t/p/w1280/${props.src}`
})
const singDecimalRating = computed(() => {
    return props.rating.toFixed(1);
})
const checkedRating = computed(() => {
    if (props.rating < 6) {
        return 'bg-blue-200 text-gray-800'
    }
    return 'bg-blue-800 '
})


const convertToName = async (arr) => {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === 28) {
            genre_name.value.push('Action')
        }
        else if (arr[i] === 12) {
            genre_name.value.push('Adventure')
        }
        else if (arr[i] === 16) {
            genre_name.value.push('Animation')
        }
        else if (arr[i] === 35) {
            genre_name.value.push('Comedy')
        }
        else if (arr[i] === 80) {
            genre_name.value.push('Crime')
        }
        else if (arr[i] === 99) {
            genre_name.value.push('Documentary')
        }
        else if (arr[i] === 18) {
            genre_name.value.push('Drama')
        }
        else if (arr[i] === 10751) {
            genre_name.value.push('Family')
        }
        else if (arr[i] === 14) {
            genre_name.value.push('Fantasy')
        }
        else if (arr[i] === 36) {
            genre_name.value.push('History')
        }
        else if (arr[i] === 27) {
            genre_name.value.push('Horror')
        }
        else if (arr[i] === 10402) {
            genre_name.value.push('Music')
        }
        else if (arr[i] === 9648) {
            genre_name.value.push('Mystery')
        }
        else if (arr[i] === 10749) {
            genre_name.value.push('Romance')
        }
        else if (arr[i] === 878) {
            genre_name.value.push('Science Fiction')
        }
        else if (arr[i] === 10770) {
            genre_name.value.push('TV Movie')
        }
        else if (arr[i] === 53) {
            genre_name.value.push('Thriller')
        }
        else if (arr[i] === 10752) {
            genre_name.value.push('War')
        }
        else if (arr[i] === 37) {
            genre_name.value.push('Western')
        }
        else {
            break;
        }
    }

}

convertToName(props.genre_id)
// const genreValueToName = computed(() => {
//     return null;
// })

</script>