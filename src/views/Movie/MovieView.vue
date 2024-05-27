<template>
    <div class="xl:px-32">
        <MovieDetails @addToFavorites="addMovieToFavorites" @removeToFavorites="removeMovieToFavorites"
            :backdrop_path="details.backdrop" :rating="+details.rating" :title="details.title"
            :poster_path="details.poster" :tagline="details.tagline" :genre_id="details.genre"
            :prod_comp="prod_companies" :vote_count="details.vote_count" :overview="details.overview"
            :isFavorite="checkFavorite" />
    </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { onMounted, ref, computed, reactive, onBeforeMount, onBeforeUnmount, watch } from 'vue'
import { useFavoriteStore } from '@/stores/FavoriteStore';
import { useAuthStore } from '@/stores/AuthStore';
import MovieDetails from '@/components/Movie/MovieDetails.vue';
import { storeToRefs } from 'pinia';

const details = reactive({
    backdrop: '',
    rating: '',
    title: '',
    poster: '',
    tagline: '',
    genre: '',
    prod_comp: [],
    vote_count: '',
    overview: '',
})
const authStore = useAuthStore()
const favoriteStore = useFavoriteStore()
const { listFavorites } = storeToRefs(favoriteStore)
const prod_companies = ref([])
const route = useRoute();
const router = useRouter()
let listOfFavorites = ref([])

const addMovieToFavorites = async (payload) => {
    await favoriteStore.saveFavorites(payload)
    await fetchFavorites()
}
const removeMovieToFavorites = async () => {
    await favoriteStore.removeFavorites(route.params.id)
    await fetchFavorites()
}
const getMovieInfo = async () => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${route.params.id}?api_key=${import.meta.env.VITE_API}&language=en-US`
        );
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const actualData = await response.json();
        details.backdrop = actualData.backdrop_path;
        details.rating = +actualData.vote_average
        details.title = actualData.title
        details.poster = actualData.poster_path;
        details.tagline = actualData.tagline;
        details.genre = actualData.genres;
        prod_companies.value = actualData.production_companies;
        details.vote_count = actualData.vote_count;
        details.overview = actualData.overview;

    } catch (err) {
        console.log(err);
    }
};
const fetchFavorites = async () => {
    await favoriteStore.fetchFavorites();
    listOfFavorites.value = listFavorites.value
}
const checkFavorite = computed(() => {
    return listOfFavorites.value.some((item) => item.movieId === route.params.id)
})

onMounted(async () => {
    await fetchFavorites()
    await getMovieInfo()

})













</script>