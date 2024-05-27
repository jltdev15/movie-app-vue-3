<template>
    <div class="p-3 bg-gray-800 h-dvh">
        <div class="max-w-5xl mx-auto md:py-6">
            <h1 class="py-2 text-lg font-semibold text-center rounded md:text-left md:text-3xl text-gray-50">Your
                Favorites</h1>
            <button-spinner />
            <div v-if="showLoading && !checkListFavorites"
                class="flex flex-col items-center justify-center h-[50dvh] gap-y-3">
                <p class="text-3xl text-gray-50">Loading</p>
                <base-spinner />
            </div>
            <div v-else-if="!showLoading && checkListFavorites" class="grid grid-cols-2 gap-3 py-6 md:grid-cols-4">
                <FavoriteItem v-for="item in favoriteStore.listFavorites" :key="item.id" :title="item.title"
                    :poster_path="item.poster" :movie_id="item.movieId" :tagline="item.tagline" />
            </div>
            <h3 v-else class="text-center text-gray-50 md:text-left">You haven't added any favorites yet.</h3>

        </div>

    </div>
</template>

<script setup>
import FavoriteItem from '@/components/Favorite/FavoriteItem.vue';
import { ref, computed, onUpdated } from 'vue'
import { useAuthStore } from '@/stores/AuthStore';
import { useFavoriteStore } from '@/stores/FavoriteStore';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
const favoriteStore = useFavoriteStore();
const authStore = useAuthStore();

const { checkListFavorites, showLoading } = storeToRefs(favoriteStore)

const fetchFavorites = async () => {
    await favoriteStore.fetchFavorites()
}

onMounted(async () => {
    await fetchFavorites()
})




</script>