<script setup>
import Menu from "~/navigation/index.js";
import RSItem from "~/components/layouts/sidemenu/Item.vue";

// const menuItem = Menu;

const props = defineProps({
  menuItem: {
    type: Array,
    default: () => Menu,
    required: false,
  },
});

onMounted(() => {
  try {
    const el = document.querySelector(".active-menu").closest(".menu-content");
    const elParent = el.parentElement.parentElement;

    if (elParent) {
      elParent.classList.remove("hide");
      elParent.querySelector("a").classList.add("nav-open");
    }
    if (el) el.classList.remove("hide");
  } catch (e) {
    // console.log(e);
    return;
  }
});
</script>

<template>
  <div
    class="vertical-menu bg-white dark:bg-slate-800 text-base h-screen fixed w-64 top-0 z-50 duration-300 border-l-0 shadow-md shadow-slate-200 dark:shadow-slate-900"
  >
    <div class="py-2 px-4">
      <div class="flex flex-auto gap-3 justify-center items-center">
        <img
          class="h-10 w-10 block dark:hidden"
          src="@/assets/img/logo/logo.png"
          alt=""
        />
        <img
          class="h-10 w-10 hidden dark:block"
          src="@/assets/img/logo/logo-white.png"
          alt=""
        />
        <span class="text-xl font-semibold text-primary-500 dark:text-white"
          >MawarCMS</span
        >
      </div>
    </div>
    <div class="flex flex-col justify-between my-6">
      <SimpleBar style="max-height: 87vh">
        <RSItem :items="menuItem"></RSItem>
      </SimpleBar>
    </div>
  </div>
</template>
