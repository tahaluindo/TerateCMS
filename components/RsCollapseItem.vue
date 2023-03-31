<script setup>
const props = defineProps({
  title: {
    type: String,
    required: false,
  },
});
const collapseGroup = ref(null);
const parentID = ref(null);

const instance = getCurrentInstance();

const isAccordion = instance.parent.props.accordion;
const type = ref(instance.parent.props.type);
const height = ref(0);
const maxHeight = ref(60);

//watch intance type
watch(
  () => instance.parent.props.type,
  (newValue) => {
    type.value = newValue;
  },
  { deep: true }
);

const onClick = () => {
  const parentElement = document.querySelector(`#${collapseGroup.value.id}`);
  parentID.value = parentElement.parentElement.id;

  const scrollHeight = parentElement.scrollHeight;
  const targetOpenCollapse = parentElement.classList.contains(
    "rs-collapse-group--open"
  );
  const openCollapse = document.querySelector(
    `#${parentID.value} .rs-collapse-group--open`
  );

  if (isAccordion) {
    if (openCollapse) {
      const openCollapseHeader = document.querySelector(
        `#${parentID.value} .rs-collapse-group--open .rs-collapse-header`
      );
      openCollapse.style.maxHeight = `${openCollapseHeader.scrollHeight}px`;
      openCollapse.classList.remove("rs-collapse-group--open");
    }
  }
  if (targetOpenCollapse) {
    parentElement.style.maxHeight = maxHeight.value + "px";
    parentElement.classList.remove("rs-collapse-group--open");
  } else {
    parentElement.style.maxHeight = scrollHeight + "px";
    parentElement.classList.add("rs-collapse-group--open");
  }
};

// On mounted get height collapse header
onMounted(() => {
  try {
    const parentElement = document.querySelector(
      `#${collapseGroup.value.id} .rs-collapse-header`
    );

    const scrollHeight = parentElement.scrollHeight;
    maxHeight.value = scrollHeight;
    height.value = scrollHeight;
  } catch (error) {
    // console.log(error);
    return;
  }
});
</script>

<template>
  <div
    v-uid
    ref="collapseGroup"
    class="rs-collapse-group"
    :class="{
      'border-b': type === 'default',
      'border-b last:rounded-b-lg': type === 'border',
      'shadow-md dark:shadow-slate-900 my-4': type === 'card',
    }"
    :style="`max-height: ${maxHeight}px; transition-property: max-height`"
    @click="onClick"
  >
    <div class="rs-collapse-header">
      <slot v-if="!!$slots.title" name="title"></slot>
      <span v-else> {{ title }}</span>
    </div>
    <div class="rs-collapse-body">
      <slot />
    </div>
  </div>
</template>
