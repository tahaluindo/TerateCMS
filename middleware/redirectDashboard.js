import { useUserStore } from "~/stores/user";

export default defineNuxtRouteMiddleware((to, from) => {
  const user = useUserStore();
  if (user.isAuth) return navigateTo("/dashboard");
});
