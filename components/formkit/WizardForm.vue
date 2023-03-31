<script setup>
/* eslint-disable */
import { ref } from "vue";

const props = defineProps({
  context: Object,
});

const steps = props.context.steps;
const currentStep = props.context.currentStep;

// console.log(props.context);
// console.log(steps);
// console.log(currentStep);

// lowercase and remove spaces
if (steps) {
  const stepsLower = steps.map((step) => step.toLowerCase().replace(/\s/g, ""));
  // console.log(stepsLower);
}
</script>

<template>
  <ul v-show="steps">
    <li v-for="(val, index) in steps" :key="index">{{ val }}</li>
  </ul>

  <slot></slot>
</template>
