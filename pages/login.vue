<script setup>
import { useUserStore } from "~/stores/user";

definePageMeta({
  title: "Login",
  layout: "empty",
  middleware: ["redirect-dashboard"],
});

const { $swal } = useNuxtApp();
const username = ref("admin");
const password = ref("R@iden28");
const userStore = useUserStore();

const login = async () => {
  try {
    // console.log("login");
    // console.log("username", username.value);
    // console.log("password", password.value);
    userStore.setUsername("admin");
    userStore.setRoles("Developer");
    userStore.setAccessToken("x123123123123");
    userStore.setRefreshToken("x123123123123");
    userStore.setIsAuthenticated(true);

    $swal.fire({
      position: "top-end",
      title: "Success",
      text: "Login Success",
      icon: "success",
      timer: 2000,
      showConfirmButton: false,
    });

    await navigateTo("/dashboard");
    return;
    
    const res = await useFetch("/api/auth/login", {
      method: "POST",
      initialCache: false,
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
    });

    const data = res.data.value;

    if (data.statusCode === 200) {
      // console.log(data.data.accessToken);
      // Save token to pinia store
      userStore.setUsername(data.data.username);
      userStore.setRoles(data.data.roles);
      userStore.setAccessToken(data.data.accessToken);
      userStore.setRefreshToken(data.data.refreshToken);
      userStore.setIsAuthenticated(true);

      $swal.fire({
        position: "top-end",
        title: "Success",
        text: "Login Success",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });

      // console.log(userStore.username);
      // console.log(userStore.accessToken);
      // console.log(userStore.refreshToken);
      // console.log(userStore.isAuth);

      await navigateTo("/dashboard");
    } else {
      $swal.fire({
        title: "Error!",
        text: data.message,
        icon: "error",
      });
    }
  } catch (e) {
    console.log(e);
  }
};
</script>

<template>
  <div
    class="flex-none md:flex justify-center text-center items-center h-screen"
  >
    <div class="w-full md:w-3/4 lg:w-1/2 xl:w-2/6">
      <rs-card class="h-screen md:h-auto px-10 md:px-16 py-12 md:py-20 mb-0">
        <h3 class="mb-4">Login</h3>
        <p class="text-slate-500 mb-6">
          Welcome to MawarCMS. Please login to continue.
        </p>
        <div class="grid grid-cols-2">
          <FormKit
            type="text"
            label="Username"
            v-model="username"
            validation="required"
            :classes="{
              outer: 'col-span-2',
              label: 'text-left',
              messages: 'text-left',
            }"
          />
          <FormKit
            type="password"
            label="Password"
            v-model="password"
            validation="required"
            :classes="{
              outer: 'col-span-2',
              label: 'text-left',
              messages: 'text-left',
            }"
          />
          <FormKit type="checkbox" label="Remember Me" />
          <NuxtLink
            class="flex items-center justify-end h-5 mt-1 text-primary-400 hover:underline"
            to="forgot-password"
            >Forgot Password?</NuxtLink
          >
          <!-- <NuxtLink to="/" class="col-span-2">
          </NuxtLink> -->
          <FormKit
            type="button"
            input-class="w-full"
            outer-class="col-span-2"
            @click="login"
          >
            Sign In
          </FormKit>
        </div>
        <p class="mt-3 text-center text-slate-500">
          Don't have an account?
          <NuxtLink to="/register" class="text-primary-400 hover:underline"
            >Sign Up</NuxtLink
          >
        </p>
      </rs-card>
    </div>
  </div>
</template>
