<template>
    <div
        class="sticky z-10 hidden transition-all bg-gray-700 overflow-clip lg:top-0 h-dvh md:flex-col md:col-span-2 md:flex text-gray-50">
        <ul class="flex overflow-auto text-sm font-semibold lg:text-lg md:flex-col">
            <li>
                <router-link class="flex items-center gap-3 px-6 py-6 transition-all" to="/discover"> <i
                        class="fa-solid fa-house-signal"></i>Discover</router-link>
            </li>
            <li>
                <router-link class="flex items-center gap-3 px-6 py-6 transition-all" to="/trending"><i
                        class="fa-solid fa-book-open"></i>Trending</router-link>
            </li>
            <li><router-link class="flex items-center gap-3 px-6 py-6 transition-all ease-in" to="/top-rated"><i
                        class="fa-solid fa-fire"></i>Top
                    Rated</router-link></li>
            <li><router-link class="flex items-center gap-3 px-6 py-6" to="/now-playing"><i
                        class="fa-regular fa-circle-play"></i> Now Playing</router-link></li>

        </ul>
    </div>
</template>

<style scoped>
.router-link-active {
    background-color: gray;
    border-left: 6px solid #1e40af;
    color: #fff;

}
</style>