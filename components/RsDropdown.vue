<script setup>
import { directive as vClickAway } from 'vue3-click-away'

const props = defineProps({
  title: {
    type: String,
    default: "Default",
  },
  variant: {
    type: String,
    default: "primary",
  },
  position: {
    type: String,
    default: "bottom",
  },
  textAlign: {
    type: String,
    default: "left",
  },
  size: {
    type: String,
    default: "md",
  },
  itemSize: {
    type: String,
    default: "10rem",
  },
});

const isOpen = ref(false);

const toggle = (event) => {
  isOpen.value = !isOpen.value;
};

const closeMenu = (event) => {
  isOpen.value = false;
};

</script>

<template>
  <div class="relative inline-flex" v-click-away="closeMenu">
    <button
      @click="toggle"
      class="flex items-center gap-x-2 rounded-lg focus:outline-none focus:ring-0 whitespace-nowrap"
      :class="{
        'text-sm px-3 py-1.5': size === 'sm',
        'text-sm px-6 py-2.5': size === 'md',
        'text-base px-8 py-4': size === 'lg',

        // Filled Button
        'text-white focus:text-white bg-primary-400 hover:bg-primary-500 focus:bg-primary-500':
          variant === 'primary',
        'text-white focus:text-white bg-blue-500 hover:bg-blue-600 focus:bg-blue-600':
          variant === 'info',
        'text-white focus:text-white bg-green-500 hover:bg-green-600 focus:bg-green-600':
          variant === 'success',
        'text-white focus:text-white bg-warning hover:bg-orange-500 focus:bg-orange-500':
          variant === 'warning',
        'text-white focus:text-white bg-red-500 hover:bg-red-600 focus:bg-red-600':
          variant === 'danger',

        // Outline Button
        'text-primary-400 border border-primary-400 hover:bg-primary-50 focus:bg-primary-50':
          variant === 'primary-outline',
        'text-blue-500 border border-blue-500 hover:bg-blue-50 focus:bg-blue-50':
          variant === 'info-outline',
        'text-green-500 border border-green-500 hover:bg-green-50 focus:bg-green-50':
          variant === 'success-outline',
        'text-warning border border-warning hover:bg-orange-50 focus:bg-orange-50':
          variant === 'warning-outline',
        'text-red-500 border border-red-500 hover:bg-red-50 focus:bg-red-50':
          variant === 'danger-outline',

        // Text Button
        'text-primary-400 hover:bg-primary-50 focus:bg-primary-50 ':
          variant === 'primary-text',
        'text-blue-500 hover:bg-blue-50 focus:bg-blue-50':
          variant === 'info-text',
        'text-green-500 hover:bg-green-50 focus:bg-green-50':
          variant === 'success-text',
        'text-warning hover:bg-orange-50 focus:bg-orange-50':
          variant === 'warning-text',
        'text-red-500 hover:bg-red-50 focus:bg-red-50':
          variant === 'danger-text',
      }"
      type="button"
    >
      <slot v-if="$slots.title" name="title"></slot>
      <span v-else>{{ props.title }}</span>
      <Icon
        v-if="position === 'bottom'"
        name="ic:outline-keyboard-arrow-down"
      />
      <Icon
        v-else-if="position === 'top'"
        name="ic:outline-keyboard-arrow-up"
      />
      <Icon v-else-if="position === 'left'" name="ic:outline-chevron-left" />
      <Icon v-else-if="position === 'right'" name="ic:outline-chevron-right" />
    </button>
    <section
      class="absolute z-10 bg-white dark:bg-slate-800 border dark:border-slate-700 shadow-md rounded-lg py-1 whitespace-nowrap"
      :class="{
        'top-10': position == 'bottom' && size == 'sm',
        'top-12': position == 'bottom' && size == 'md',
        'top-16': position == 'bottom' && size == 'lg',
        'bottom-10': position == 'top' && size == 'sm',
        'bottom-12': position == 'top' && size == 'md',
        'bottom-16': position == 'top' && size == 'lg',
        'top-0 -left-42': position == 'left',
        'top-0 -right-42': position == 'right',
        'right-0':
          (position == 'bottom' || position == 'top') && textAlign == 'right',
      }"
      :style="`min-width: ${itemSize}`"
      v-show="isOpen"
    >
      <slot></slot>
    </section>
  </div>
</template>
