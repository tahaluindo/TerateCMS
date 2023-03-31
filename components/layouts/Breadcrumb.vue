<script setup>
const route = useRoute();

const breadcrumb = computed(() => {
  const matched = route.matched;
  const breadcrumb = matched.map((item) => {
    return {
      name: item.meta.title,
      path: item.path,
    };
  });

  return breadcrumb;
});

const title = computed(() => {
  const matched = route.matched;
  const title = matched[matched.length - 1].meta.title;
  return title;
});

async function navigateMenu(path) {
  try {
    await navigateTo(path);
  } catch (e) {
    return;
  }
}
</script>

<template>
  <div
    v-if="breadcrumb && title"
    class="flex flex-col md:flex-row items-stretch justify-between pb-5"
  >
    <span class="text-xl font-semibold">{{ title }}</span>
    <div
      class="flex items-center text-sm"
      v-if="breadcrumb && breadcrumb.length != 0"
    >
      <span
        v-for="(item, index) in breadcrumb"
        :key="index"
        class="flex items-center text-primary-400"
      >
        <Icon
          v-if="index != 0"
          name="ic:round-chevron-right"
          size="14"
          class="pr-1"
        ></Icon>
        <a
          @click="navigateMenu(item.path)"
          class="underline cursor-pointer hover:text-primary-300 pr-1"
          >{{ item.name }}</a
        >
      </span>
    </div>
  </div>
</template>
