<script setup>
import { onMounted, ref } from 'vue'
// import MovieItem from './../components/MovieItem.vue'
import MovieItem from '@/components/Movie/MovieItem.vue';
import { useMovieStore } from '@/stores/movieStore';
import { storeToRefs } from 'pinia';
import BaseSpinner from '@/UI/BaseSpinner.vue';
const movieStore = useMovieStore();
const { data, isLoading } = storeToRefs(movieStore)



onMounted(async () => {
    await movieStore.getTrending();

})

</script>

<template>
    <main class="col-span-8 bg-gray-900 ">
        <div v-if="isLoading" class="flex flex-col items-center justify-center h-screen gap-y-6">
            <p class="text-3xl text-gray-50">Loading</p>
            <BaseSpinner />
        </div>
        <base-grid>
            <template #title>
                <h1 class="px-3 text-4xl font-bold text-gray-50">Trending Movies</h1>
            </template>
            <template #default>
                <MovieItem v-for="movie in data " :key="movie.id" :title="movie.title" :src="movie.poster_path"
                    :rating="movie.vote_average" :date="movie.release_date" :genre_id="movie.genre_ids"
                    :movie_id="movie.id" />


            </template>
        </base-grid>

    </main>
</template>
