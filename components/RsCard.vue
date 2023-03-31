<script setup></script>

<template>
  <div
    class="bg-white dark:bg-slate-800 rounded-lg mb-6 duration-300 shadow-md shadow-slate-200 dark:shadow-slate-900"
  >
    <header v-if="!!$slots.header" class="text-xl p-5 font-medium">
      <slot name="header" />
    </header>
    <main><slot></slot></main>
    <div v-if="!!$slots.body" class="px-5 pb-5">
      <slot name="body" />
    </div>
    <footer v-if="!!$slots.footer" class="px-5 pb-5">
      <slot name="footer" />
    </footer>
  </div>
</template>
