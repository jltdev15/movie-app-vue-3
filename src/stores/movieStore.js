import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useMovieStore = defineStore("movie", () => {
  // State

  const baseUrl = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${
    import.meta.env.VITE_API
  }`;
  const trendingUrl = `https://api.themoviedb.org/3/trending/movie/day?api_key=${
    import.meta.env.VITE_API
  }`;
  const nowPlayingUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${
    import.meta.env.VITE_API
  }`;
  const data = ref(null);
  const genre_data = ref(null);
  const isLoading = ref(Boolean);
  // Getters or Computed

  // Actions or method
  const findMovie = async (payload) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${
          import.meta.env.VITE_API
        }&query=${payload}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const actualData = await response.json();
      if (actualData.results.length === 0) {
        return getDiscover();
      }
      console.log(actualData.results);
      data.value = actualData.results;
    } catch (err) {
      console.log("Error fetching data:", err);
    }
  };
  const getDiscover = async () => {
    isLoading.value = true;
    try {
      const response = await fetch(baseUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const actualData = await response.json();
      setTimeout(() => {
        data.value = actualData.results;
        console.log(data.value);
        isLoading.value = false;
      }, 0);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };
  const getTopRated = async () => {
    isLoading.value = true;
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${
          import.meta.env.VITE_API
        }`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const actualData = await response.json();
      setTimeout(() => {
        data.value = actualData.results;
        console.log(data.value);
        isLoading.value = false;
      }, 0);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };
  const getTrending = async () => {
    isLoading.value = true;
    try {
      const response = await fetch(trendingUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const actualData = await response.json();
      setTimeout(() => {
        data.value = actualData.results;
        console.log(data.value);
        isLoading.value = false;
      }, 0);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };
  const getNowPlaying = async () => {
    isLoading.value = true;
    try {
      const response = await fetch(nowPlayingUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const actualData = await response.json();
      setTimeout(() => {
        data.value = actualData.results;
        console.log(data.value);
        isLoading.value = false;
      }, 0);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  return {
    getDiscover,
    baseUrl,
    data,
    findMovie,
    genre_data,
    getTrending,
    getTopRated,
    getNowPlaying,
    nowPlayingUrl,
    isLoading,
  };
});
