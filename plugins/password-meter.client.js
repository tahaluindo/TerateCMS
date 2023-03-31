import PasswordMeter from "vue-simple-password-meter";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("PasswordMeter", PasswordMeter);
});
