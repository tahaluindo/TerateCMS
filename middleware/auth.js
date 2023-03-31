import { useUserStore } from "~/stores/user";

export default defineNuxtRouteMiddleware((to, from) => {
  const user = useUserStore();
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!user.isAuth) {
      return navigateTo("/login");
    } else {
      return true;
    }
  }
});
