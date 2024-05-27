<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from './stores/AuthStore'
import { useFavoriteStore } from './stores/FavoriteStore'
import TheHeader from './components/Navigation/TheHeader.vue'
import Footer from './components/Footer.vue'
import { storeToRefs } from 'pinia'


const authStore = useAuthStore()
const { userId, isLoggedIn } = storeToRefs(authStore)
const favoriteStore = useFavoriteStore()



onMounted(async () => {
  await authStore.checkUser()

})


</script>

<template>
  <div class=" overflow-clip">
    <TheHeader />
    <router-view />
    <Footer />
  </div>
</template>
