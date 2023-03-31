<script setup>
const emits = defineEmits(["click"]);

const props = defineProps({
  divider: {
    type: Boolean,
    default: false,
  },
});

const clickEvent = () => {
  emits("click");
};
</script>

<template>
  <hr v-if="divider" />
  <div
    @click="clickEvent"
    class="flex items-center hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer px-4 py-2"
  >
    <slot></slot>
  </div>
</template>
