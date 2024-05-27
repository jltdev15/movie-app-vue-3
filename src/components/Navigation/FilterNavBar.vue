<script setup>
import { useMovieStore } from '@/stores/movieStore';
import SearchFormMobile from './SearchFormMobile.vue';
const movieStore = useMovieStore()
const submitSearch = async (payload) => {
    if (payload.value === '') {
        return
    }
    await movieStore.findMovie(payload)
}
</script>

<template>
    <!-- <div class="col-span-2 pt-16 transition-all bg-gray-700 text-gray-50"> -->
    <div class="sticky z-40 md:hidden transition-all bg-blue-900 top-[5rem] lg:col-span-2 text-gray-50 py-3">
        <ul class="flex items-center w-screen gap-3 p-2 overflow-auto text-base font-normal no-scrollbar">
            <li class="">
                <router-link class="flex items-center gap-3 p-2 transition-all rounded" to="/discover"> <i
                        class="hidden fa-solid fa-house-signal"></i>Discover</router-link>
            </li>
            <li class="">
                <router-link class="flex items-center gap-3 p-2 transition-all rounded" to="/trending"> <i
                        class="hidden fa-solid fa-house-signal"></i>Trending</router-link>
            </li>
            <li class="">
                <router-link class="flex p-2 transition-all rounded" to="/top-rated"> <i
                        class="hidden fa-solid fa-house-signal"></i>Top <span class="px-1">Rated</span></router-link>
            </li>
            <li class="">
                <router-link class="flex p-2 text-left transition-all rounded " to="/now-playing"> <i
                        class="hidden fa-solid fa-house-signal"></i>Now <span class="px-1"> Playing</span></router-link>
            </li>


        </ul>
        <SearchFormMobile @find_movie="submitSearch" />
    </div>
</template>

<style scoped>
.router-link-active {
    background-color: rgb(255, 255, 255);
    /*border-bottom: 6px solid #1e40af;*/
    color: #000000;
    font-weight: 600;
    box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.2);

}
</style>