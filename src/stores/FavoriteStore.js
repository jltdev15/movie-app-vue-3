import { defineStore } from "pinia";
import { ref, computed, watch, watchEffect } from "vue";
export const useFavoriteStore = defineStore("favorite", () => {
  // state
  const listFavorites = ref([]);
  const movieId = ref("");
  const isLoading = ref(false);
  // Getters or Computed Properties
  // watch(listFavorites, (newValue) => {
  //   listFavorites.value = newValue;
  //   console.log(newValue);
  // });
  const checkListFavorites = computed(() => {
    return listFavorites.value.length > 0;
  });
  const showLoading = computed(() => {
    return isLoading.value;
  });
  // Actions or Method
  const saveFavorites = async (payload) => {
    const newFavorite = {
      movieId: payload.movieId,
      title: payload.title,
      poster: payload.poster,
      tagline: payload.tagline,
    };
    const response = await fetch(
      `https://vue-movie-f8784-default-rtdb.asia-southeast1.firebasedatabase.app/favorites/${payload.userId}.json?auth=` +
        payload.token,
      {
        method: "POST",
        body: JSON.stringify(newFavorite),
      }
    );
    const responseData = await response.json();
    console.log(responseData);
  };
  const removeFavorites = async (payload) => {
    const token = localStorage.getItem("token");
    const usersId = localStorage.getItem("userId");
    console.log(payload);
    const id = listFavorites.value.filter((item) => item.movieId === payload);
    const keyId = id[0].key;
    console.log(keyId);

    const response = await fetch(
      `https://vue-movie-f8784-default-rtdb.asia-southeast1.firebasedatabase.app/favorites/${usersId}/${keyId}.json?auth=` +
        token,
      {
        method: "DELETE",
      }
    );
    const responseData = await response.json();
    console.log(responseData);
    const favor = [];
    // Extract the object from the response data using For in Loop and add to a new object
    for (const key in responseData) {
      const favorite = {
        key: key,
        movieId: responseData[key].movieId,
        poster: responseData[key].poster,
        tagline: responseData[key].tagline,
        title: responseData[key].title,
      };
      // Push the new created object to favor array
      favor.push(favorite);
    }
    // Disabling the loading state by setting it to true
    isLoading.value = false;

    // Assigning the value of favor array to reactive ref List Favorites
    listFavorites.value = favor;
  };
  const fetchFavorites = async () => {
    isLoading.value = true;
    const token = localStorage.getItem("token");
    const usersId = localStorage.getItem("userId");
    const response = await fetch(
      `https://vue-movie-f8784-default-rtdb.asia-southeast1.firebasedatabase.app/favorites/${usersId}.json?auth=` +
        token
    );
    const responseData = await response.json();
    if (responseData === null) {
      return (isLoading.value = false);
    }
    if (!response.ok) {
      const error = new Error(
        responseData.message || "Failed to fetch favorites"
      );
      throw error;
    }

    const favor = [];
    // Extract the object from the response data using For in Loop and add to a new object
    for (const key in responseData) {
      const favorite = {
        key: key,
        movieId: responseData[key].movieId,
        poster: responseData[key].poster,
        tagline: responseData[key].tagline,
        title: responseData[key].title,
      };
      // Push the new created object to favor array
      favor.push(favorite);
    }
    // Disabling the loading state by setting it to true
    isLoading.value = false;

    // Assigning the value of favor array to reactive ref List Favorites
    listFavorites.value = favor;
  };
  const getMovieId = async (payload) => {
    movieId.value = payload;
    return listFavorites.value.some((item) => item.movieId === movieId.value);
  };

  return {
    saveFavorites,
    fetchFavorites,
    listFavorites,
    checkListFavorites,
    showLoading,
    getMovieId,
    removeFavorites,
  };
});
