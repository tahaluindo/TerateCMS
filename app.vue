<script setup>
useHead({
  title: "MawarCMS",
  description: "Home page",
  bodyAttrs: {
    class: "bg-gray-100 dark:bg-slate-900 text-gray-600 dark:text-gray-300",
  },
});
</script>

<template>
  <NuxtLayout>
    <NuxtLoadingIndicator />
    <NuxtPage />
  </NuxtLayout>
</template>
