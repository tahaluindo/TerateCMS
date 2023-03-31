<script setup>
const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  value: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 100,
  },
  variant: {
    type: String,
    default: "primary",
  },
  size: {
    type: String,
    default: "md",
  },
  showValue: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div class="progress-wrapper w-full mb-4">
    <div class="progress-label text-sm mb-1">{{ label }}</div>
    <div
      class="progress flex rounded-full"
      :class="{
        'h-3': size === 'sm',
        'h-4': size === 'md',
        'h-5': size === 'lg',
        'bg-primary-200': variant == 'primary',
        'bg-secondary-200': variant == 'secondary',
        'bg-green-200': variant == 'success',
        'bg-red-200': variant == 'danger',
        'bg-orange-200': variant == 'warning',
        'bg-blue-200': variant == 'info',
      }"
    >
      <div
        class="progressbar flex items-center justify-center rounded-full text-white"
        :class="{
          'bg-primary-400': variant == 'primary',
          'bg-secondary-400': variant == 'secondary',
          'bg-green-400': variant == 'success',
          'bg-red-400': variant == 'danger',
          'bg-orange-400': variant == 'warning',
          'bg-blue-400': variant == 'info',
        }"
        :style="{ width: (value / max) * 100 + '%' }"
      >
        <span class="text-xs" v-if="showValue">{{ value }}</span>
      </div>
    </div>
  </div>
</template>
