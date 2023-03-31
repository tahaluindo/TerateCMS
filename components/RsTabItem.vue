<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: false,
  },
});

const selectedTitle = inject("selectedTitle");
</script>

<template>
  <div
    class="tab-pane py-4 px-4"
    v-show="selectedTitle === title"
  >
    <slot></slot>
  </div>
</template>
