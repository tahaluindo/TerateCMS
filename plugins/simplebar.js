import { SimpleBar } from "simplebar-vue3";
import "simplebar/dist/simplebar.min.css";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("SimpleBar", SimpleBar);
});
