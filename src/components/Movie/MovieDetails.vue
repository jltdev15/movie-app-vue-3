<template>
    <section class="hidden pb-12 mx-auto shadow md:block max-w-7xl ">
        <div class="relative">
            <div class="image-container parallelogram">
                <div class="image-overlay"></div>
                <img class=" cover-full" :src="backDropUrl" alt="">
            </div>
            <div class="absolute top-5 right-5">
                <BaseCircular :rating="+item.rating.toFixed(1)" />

            </div>

            <div class=" absolute left-[2rem] w-72 bottom-[-70%]">
                <img class="shadow-lg h-[28rem] w-full" :src="posterUrl" alt="">
                <div class="flex flex-wrap gap-3 p-3 my-6 text-xs font-semibold text-center text-gray-50">
                    <p class="px-3 py-2 bg-blue-600 " v-for="genre in item.genre_id" :key="genre.id">{{
                        genre.name }}</p>

                </div>
            </div>
            <div class="absolute w-5/12  text-gray-50  top-[55%] left-[50%] translate-x-[-50%]">
                <h1 class="pb-1 text-3xl font-bold">{{ item.title }}</h1>
                <p class="pb-1 text-lg">{{ item.tagline }}</p>
                <p class="flex items-center gap-2"><i class="text-red-600 fa-solid fa-heart"></i><span>
                        {{ item.vote_count }}</span> likes
                </p>
            </div>
        </div>
        <div class="flex justify-end pr-6">
            <button v-if="!item.isFavorite" @click="addToFavoritesHandler"
                class="flex items-center justify-between gap-3 p-3 font-bold transition-all duration-150 bg-blue-600 cursor-pointer text-gray-50 hover:text-gray-50 hover:bg-blue-700">
                <i v-if="!isLoading" class="font-bold fa-regular fa-star"></i>

                <button-spinner :show="isLoading" />


                Add to favorites
            </button>

            <button @click="removeToFavoritesHandler" v-show="item.isFavorite"
                class="flex items-center gap-3 p-3 font-bold text-gray-500 transition-all duration-150 cursor-pointer hover:text-gray-50 hover:bg-red-500">
                <i class="fa-regular fa-trash-can"></i>
                Remove favorites
            </button>

        </div>
        <div class="pl-[22rem] pr-6 py-12 pt-3 text-lg font-medium text-justify">
            <p class="text-gray-500 transition-all duration-150">
                {{ item.overview }}
            </p>
            <div class="flex flex-wrap py-6 gap-9">
                <div v-for="p in item.prod_comp" :key="p.id">
                    <div v-if="p.logo_path !== null">
                        <img class="h-16 p-1" :src="productionUrl + p.logo_path" alt="">
                    </div>
                </div>


            </div>
        </div>


    </section>
    <section class="p-3 md:hidden">
        <div class="relative">

            <div class="absolute top-5 right-5">
                <BaseCircular :rating="item.rating" />
            </div>

            <div class="">
                <img class="w-full rounded-lg shadow-lg" :src="posterUrl" alt="">
                <div class="flex flex-wrap gap-3 py-3 text-xs font-semibold text-center text-gray-50">
                    <p class="px-2 py-1 bg-blue-500 rounded" v-for="genre in item.genre_id" :key="genre.id">{{
                        genre.name }}</p>

                </div>
            </div>
            <div class="">
                <h1 class="text-xl font-extrabold">{{ item.title }}</h1>
                <p class="text-lg text-gray-500">{{ item.tagline }}</p>
                <p class="flex items-center gap-2"><i class="text-red-600 fa-solid fa-heart"></i><span>
                        {{ item.vote_count }}</span> likes
                </p>
            </div>
        </div>

        <div class="py-3 font-medium text-justify">
            <p class="text-gray-500 transition-all duration-150">
                {{ item.overview }}
            </p>

        </div>
        <div class="text-center">

            <p v-if="!item.isFavorite" @click="addToFavoritesHandler"
                class="p-2 transition-all duration-150 bg-blue-600 cursor-pointer text-gray-50 hover:text-gray-50 hover:bg-blue-700">

                <i class="p-1 fa-regular fa-star"></i>Add to
                favorites
            </p>

            <p @click="removeToFavoritesHandler" v-else
                class="p-2 text-gray-500 transition-all duration-150 cursor-pointer hover:text-gray-50 hover:bg-red-500">
                Remove from
                favorites
            </p>

        </div>
        <div class="flex flex-wrap gap-2 py-6">
            <div v-for="p in item.prod_comp" :key="p.id">
                <div v-if="p.logo_path !== null">
                    <img class="h-10 p-1" :src="productionUrl + p.logo_path" alt="">
                </div>
            </div>
        </div>


    </section>
</template>
<script setup>
import { computed, ref } from 'vue'
import BaseCircular from '../../UI/BaseCircular.vue'
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/AuthStore';

const authStore = useAuthStore()
const item = defineProps(['backdrop_path', 'rating', 'title', 'poster_path', 'tagline', 'genre_id', 'prod_comp', 'vote_count', 'overview', 'isFavorite'])

const route = useRoute();
const emit = defineEmits(['addToFavorites', 'removeToFavorites'])
const isLoading = ref(false)
const isRemoved = ref(false)

const setTextRemove = computed(() => {
    return isRemoved.value ? 'Removing from favorites' : ''
})

const backDropUrl = computed(() => {
    return 'https://image.tmdb.org/t/p/w1280' + item.backdrop_path
})
const posterUrl = computed(() => {
    return 'https://image.tmdb.org/t/p/w1280' + item.poster_path
})
const productionUrl = computed(() => {
    return 'https://image.tmdb.org/t/p/w1280'
})
const addToFavoritesHandler = async () => {
    isLoading.value = true
    setTimeout(() => {
        emit('addToFavorites', {
            userId: authStore.userId,
            token: authStore.isLoggedIn,
            movieId: route.params.id,
            title: item.title,
            poster: item.poster_path,
            tagline: item.tagline

        })
        isLoading.value = false
    }, 1000)


}
const removeToFavoritesHandler = () => {
    emit('removeToFavorites')

}
</script>

<style scoped>
.parallelogram {
    clip-path: polygon(0% 0%, 100% 0%, 100% 85%, 0% 100%);
}

.image-container {
    position: relative;
    height: 50dvh;
}

.image-container .image-overlay {

    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: linear-gradient(to bottom, #ffffff00 0%, #000000 100%);
    opacity: 0.9;
}
</style>