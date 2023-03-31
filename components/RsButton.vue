<script setup>
const props = defineProps({
  type: {
    type: String,
    default: "fill",
  },
  variant: {
    type: String,
    default: "primary",
  },
  size: {
    type: String,
    default: "md",
  },
});
</script>

<template>
  <button
    class="w-fit rounded-lg flex justify-center items-center h-fit"
    :class="{
      'text-xs px-4 py-1': size === 'sm',
      'text-sm px-8 py-2.5': size === 'md',
      'text-base px-10 py-4': size === 'lg',

      // Filled Button
      'text-white bg-primary-400 hover:bg-primary-500 disabled:bg-primary-50 disabled:text-primary-100 disabled:border-primary-50 disabled:cursor-default dark:disabled:bg-slate-700 dark:disabled:text-slate-800 dark:disabled:border-slate-700':
        variant === 'primary',
      'text-white bg-secondary hover:bg-gray-500 disabled:bg-gray-50 disabled:text-gray-100 disabled:border-gray-50 disabled:cursor-default dark:disabled:bg-slate-700 dark:disabled:text-slate-800 dark:disabled:border-slate-700':
        variant === 'secondary',
      'text-white bg-blue-500 hover:bg-blue-600 disabled:bg-blue-50 disabled:text-blue-100 disabled:border-blue-50 disabled:cursor-default dark:disabled:bg-slate-700 dark:disabled:text-slate-800 dark:disabled:border-slate-700':
        variant === 'info',
      'text-white bg-green-500 hover:bg-green-600 disabled:bg-green-50 disabled:text-green-100 disabled:border-green-50 disabled:cursor-default dark:disabled:bg-slate-700 dark:disabled:text-slate-800 dark:disabled:border-slate-700':
        variant === 'success',
      'text-white bg-warning hover:bg-orange-500 disabled:bg-orange-50 disabled:text-orange-100 disabled:border-orange-50 disabled:cursor-default dark:disabled:bg-slate-700 dark:disabled:text-slate-800 dark:disabled:border-slate-700':
        variant === 'warning',
      'text-white bg-red-500 hover:bg-red-600 disabled:bg-red-50 disabled:text-red-100 disabled:border-red-50 disabled:cursor-default dark:disabled:bg-slate-700 dark:disabled:text-slate-800 dark:disabled:border-slate-700':
        variant === 'danger',

      // Outline Button
      'text-primary-400 border border-primary-400 hover:bg-primary-50 dark:hover:bg-slate-700 disabled:bg-primary-50 disabled:text-primary-100 disabled:border-primary-50 disabled:cursor-default dark:disabled:bg-slate-700 dark:disabled:text-slate-800 dark:disabled:border-slate-700':
        variant === 'primary-outline',
      'text-secondary border border-secondary hover:bg-gray-50 disabled:bg-gray-50 disabled:text-gray-100 disabled:border-gray-50 disabled:cursor-default dark:disabled:bg-slate-700 dark:disabled:text-slate-800 dark:disabled:border-slate-700':
        variant === 'secondary-outline',
      'text-blue-500 border border-blue-500 hover:bg-blue-50 disabled:bg-blue-50 disabled:text-blue-100 disabled:border-blue-50 disabled:cursor-default dark:disabled:bg-slate-700 dark:disabled:text-slate-800 dark:disabled:border-slate-700':
        variant === 'info-outline',
      'text-green-500 border border-green-500 hover:bg-green-50 disabled:bg-green-50 disabled:text-green-100 disabled:border-green-50 disabled:cursor-default dark:disabled:bg-slate-700 dark:disabled:text-slate-800 dark:disabled:border-slate-700':
        variant === 'success-outline',
      'text-warning border border-warning hover:bg-orange-50 disabled:bg-orange-50 disabled:text-orange-100 disabled:border-orange-50 disabled:cursor-default dark:disabled:bg-slate-700 dark:disabled:text-slate-800 dark:disabled:border-slate-700':
        variant === 'warning-outline',
      'text-red-500 border border-red-500 hover:bg-red-50 disabled:bg-red-50 disabled:text-red-100 disabled:border-red-50 disabled:cursor-default dark:disabled:bg-slate-700 dark:disabled:text-slate-800 dark:disabled:border-slate-700':
        variant === 'danger-outline',

      //Text Button
      'text-primary-400 hover:bg-primary-50 disabled:bg-primary-50 disabled:text-primary-100 disabled:cursor-default dark:disabled:bg-slate-700 dark:disabled:text-slate-800':
        variant === 'primary-text',
      'text-secondary hover:bg-gray-50 disabled:bg-gray-50 disabled:text-gray-100 disabled:cursor-default dark:disabled:bg-slate-700 dark:disabled:text-slate-800':
        variant === 'secondary-text',
      'text-blue-500 hover:bg-blue-50 disabled:bg-blue-50 disabled:text-blue-100 disabled:cursor-default dark:disabled:bg-slate-700 dark:disabled:text-slate-800':
        variant === 'info-text',
      'text-green-500 hover:bg-green-50 disabled:bg-green-50 disabled:text-green-100 disabled:cursor-default dark:disabled:bg-slate-700 dark:disabled:text-slate-800':
        variant === 'success-text',
      'text-warning hover:bg-orange-50 disabled:bg-orange-50 disabled:text-orange-100 disabled:cursor-default dark:disabled:bg-slate-700 dark:disabled:text-slate-800':
        variant === 'warning-text',
      'text-red-500 hover:bg-red-50 disabled:bg-red-50 disabled:text-red-100 disabled:cursor-default dark:disabled:bg-slate-700 dark:disabled:text-slate-800':
        variant === 'danger-text',
    }"
  >
    <slot />
  </button>
</template>
