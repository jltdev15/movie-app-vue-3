<template>
    <div class="sticky top-0 z-50 bg-blue-900 text-gray-50">

        <!-- <nav class="flex lg:grid lg:grid-cols-10"> -->
        <nav class="flex items-center justify-center px-3 py-6"
            :class="{ 'justify-center': !isAuthenticated, 'justify-between': isAuthenticated }">
            <div class="md:px-12 md:w-1/10" :class="{ 'text-center': !isAuthenticated }">
                <RouterLink to="/" class="">
                    <h1 class="text-2xl font-bold ">The Movie Hub</h1>
                </RouterLink>
            </div>
            <SearchForm :isAuth="isAuthenticated" @find_movie="submitSearch" />
            <div v-if="isAuthenticated" class="hidden md:block md:w-2/10">
                <ul class="flex items-center gap-3">
                    <li>
                        <router-link class="inline-block px-3 py-3 font-semibold"
                            to="/favorites">Favorites</router-link>
                    </li>
                    <li>
                        <a href="/" @click="authStore.logout"
                            class="inline-block w-full px-3 py-3 font-semibold bg-red-600 rounded text-gray-50">Sign
                            out</a>
                    </li>
                </ul>
            </div>
            <div v-if="isAuthenticated" class=" md:hidden">
                <NavButton :isActive="isShow" @toggleNavbar="toggleHandler" />
                <MobileNavBar :show="isShow" @toggleLinked="linkToggle" />
            </div>

        </nav>


    </div>
</template>

<script setup>
import { ref, watchEffect, watch } from 'vue'
import { useAuthStore } from '@/stores/AuthStore'
import { useMovieStore } from '@/stores/movieStore';
import { storeToRefs } from 'pinia';
import SearchForm from './SearchForm.vue';
import SearchFormMobile from './SearchFormMobile.vue'
import MobileNavBar from './MobileNavBar.vue'
import NavButton from './NavButton.vue'

const authStore = useAuthStore()
const movieStore = useMovieStore();
const { isAuthenticated } = storeToRefs(authStore)
const isShow = ref(false)


const toggleHandler = (payload) => {
    isShow.value = !payload
    console.log(isShow.value);
}
const linkToggle = async () => {
    isShow.value = !isShow.value;

}
const submitSearch = async (payload) => {
    if (payload.value === '') {
        return
    }
    await movieStore.findMovie(payload)
}





</script>

<style scoped>
.router-link-active {
    background-color: rgba(128, 128, 128, 0.324);
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
    color: #fff;
    border-radius: 6px;

}
</style>