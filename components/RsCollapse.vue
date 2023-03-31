<script setup>
const props = defineProps({
  accordion: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: "default",
  },
});
</script>

<template>
  <div
    class="rs-collapse w-full mb-4"
    :class="{
      'border-t border-x rounded-lg': type === 'border',
    }"
    v-uid
  >
    <slot />
  </div>
</template>
