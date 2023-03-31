<script setup>
definePageMeta({
  title: "Register",
  layout: "empty",
  middleware: ["redirect-dashboard"],
});
</script>

<template>
  <div
    class="flex-none md:flex justify-center text-center items-center h-screen"
  >
    <div class="w-full md:w-3/4 lg:w-1/2 xl:w-2/6">
      <rs-card class="h-screen md:h-auto px-10 md:px-16 py-12 md:py-20 mb-0">
        <h3 class="mb-4">Sign Up</h3>
        <p class="text-slate-500 mb-6 col-sp">
          Please fill in the form to create an account.
        </p>
        <FormKit label="Username" type="text" label-class="text-left" />
        <FormKit label="Email" type="email" label-class="text-left" />
        <FormKit label="Password" type="password" label-class="text-left" />
        <FormKit
          label="Re-enter Password"
          type="password"
          label-class="text-left"
        />
        <FormKit
          type="checkbox"
          label="agreement"
          outer-class="col-span-1 md:col-span-2"
        >
          <template #label
            >I agree to the
            <a class="text-primary-400 hover:underline ml-1"
              >Term and Services</a
            >
          </template>
        </FormKit>

        <NuxtLink to="/" class="col-span-1 md:col-span-2">
          <FormKit type="button" input-class="w-full">Sign up</FormKit>
        </NuxtLink>

        <p class="mt-3 text-center text-slate-500">
          Already have an account?
          <NuxtLink to="/login" class="text-primary-400 hover:underline"
            >Login</NuxtLink
          >
        </p>
      </rs-card>
    </div>
  </div>
</template>
