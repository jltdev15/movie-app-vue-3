import { defineStore } from "pinia";
import { ref, computed } from "vue";
export const useAuthStore = defineStore("auth", () => {
  // state
  let timer;
  const userId = ref(null);
  const isLoggedIn = ref(null);
  const isLoading = ref(false);
  const isError = ref(null);
  const errorMessage = ref("");
  // Getters or Computed Properties

  const isAuthenticated = computed(() => {
    return !!isLoggedIn.value;
  });
  const currentUserId = computed(() => {
    return userId.value;
  });

  // ACtions or Method

  const register = async (payload) => {
    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${
          import.meta.env.VITE_FIREBASE_KEY
        }`,
        {
          method: "POST",
          body: JSON.stringify({
            email: payload.email,
            password: payload.password,
            returnSecureToken: true,
          }),
        }
      );
      const responseData = await response.json();
      console.log(responseData);
      if (!response.ok) {
        isError.value = true;
        errorMessage.value = responseData.error.message;
      }
    } catch (err) {
      console.log(err);
    }
  };
  const login = async (payload) => {
    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${
          import.meta.env.VITE_FIREBASE_KEY
        }`,
        {
          method: "POST",
          body: JSON.stringify({
            email: payload.email,
            password: payload.password,
            returnSecureToken: true,
          }),
        }
      );
      const responseData = await response.json();

      if (!response.ok) {
        isError.value = true;
        return (errorMessage.value = responseData.error.message);
      }
      const expiresIn = +responseData.expiresIn * 1000;
      // const expiresIn = 5000;
      const expirationDate = new Date().getTime() + expiresIn;
      localStorage.setItem("token", responseData.idToken);
      localStorage.setItem("userId", responseData.localId);
      localStorage.setItem("tokenExpiration", expirationDate);
      isLoggedIn.value = responseData.idToken;
      userId.value = responseData.localId;
    } catch (err) {
      console.log(err);
    }
  };
  const checkUser = async () => {
    const token = localStorage.getItem("token");
    const usersId = localStorage.getItem("userId");
    const tokenExpiration = localStorage.getItem("tokenExpiration");
    const expiresIn = +tokenExpiration - new Date().getTime();

    if (expiresIn < 0) {
      return;
    }
    timer = setTimeout(() => {
      logout();
    }, expiresIn);

    if (token && usersId) {
      isLoggedIn.value = token;
      userId.value = usersId;
    }
  };

  const logout = async () => {
    clearTimeout(timer);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("tokenExpiration");
    isLoggedIn.value = null;
    userId.value = null;
  };

  return {
    userId,
    register,
    login,
    isLoading,
    isLoggedIn,
    isError,
    errorMessage,
    isAuthenticated,
    checkUser,
    logout,
    currentUserId,
  };
});
