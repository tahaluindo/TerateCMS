<script setup>
import { useUserStore } from "~/stores/user";

definePageMeta({
  title: "Logout",
  layout: "empty",
});

const { $swal } = useNuxtApp();

const userStore = useUserStore();

// remove token from pinia store
userStore.setUsername("");
userStore.setAccessToken("");
userStore.setRefreshToken("");
userStore.setIsAuthenticated(false);

$swal.fire({
  position: "top-end",
  title: "Success",
  text: "Logout Success",
  icon: "success",
  timer: 2000,
  showConfirmButton: false,
});

await navigateTo("/login");
</script>

<template>
  <div>
    <h1>Logout</h1>
  </div>
</template>
