import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/Home/HomeView.vue";
import MovieView from "@/views/Movie/MovieView.vue";
import { useAuthStore } from "@/stores/AuthStore";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/discover",
      name: "home",
      component: HomeView,
      meta: { requiresAuth: true },
      children: [
        {
          path: "/discover",
          name: "discover",
          component: () => import("../views/Home/DiscoverView.vue"),
        },
        {
          path: "/trending",
          name: "trending",
          component: () => import("../views/Home/TrendingView.vue"),
        },
        {
          path: "/top-rated",
          name: "top-rated",
          component: () => import("../views/Home/TopRatedView.vue"),
        },
        {
          path: "/now-playing",
          name: "now-playing",
          component: () => import("../views/Home/NowPlayingView.vue"),
        },
      ],
    },
    {
      path: "/movie/:id",
      name: "movie-details",
      meta: { requiresAuth: true },
      component: async () => import("../views/Movie/MovieView.vue"),
    },
    {
      path: "/favorites",
      name: "favorite",
      meta: { requiresAuth: true },
      component: () => import("../views/Profile/Favorites.vue"),
    },
    {
      path: "/auth/login",
      name: "login",
      meta: { requiresAuth: false },
      component: () => import("../views/Auth/Login.vue"),
    },
    {
      path: "/auth/register",
      name: "register",
      meta: { requiresAuth: false },
      component: () => import("../views/Auth/Register.vue"),
    },
  ],
});
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next("/auth/login"); // Redirect to login if not authenticated
  } else if (!to.meta.requiresAuth && authStore.isAuthenticated) {
    next("/"); // Proceed to the route
  } else {
    next();
  }
});

export default router;
