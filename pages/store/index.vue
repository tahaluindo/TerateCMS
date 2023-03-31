<script setup>
import { useUserStore } from "~/stores/user";

definePageMeta({
  title: "Store Detail",
});

const { $swal } = useNuxtApp();

const storeID = ref("");
const storeName = ref("");
const storeDesc = ref("");
const storeCreatedDate = ref("");
const userStore = useUserStore();
const mode = ref("create");

const username = userStore.username;

const { data, refresh } = await useFetch("/api/customer/get-store", {
  initialCache: false,
  method: "GET",
  query: {
    username: username,
  },
});

if (data.value.statusCode === 200) {
  if (data.value.data) {
    storeID.value = data.value.data.storeID;
    storeName.value = data.value.data.storeName;
    storeDesc.value = data.value.data.storeDescription;
    storeCreatedDate.value = data.value.data.storeCreatedDate;
    mode.value = "update";
  }
} else {
  mode.value = "create";
}

const saveStore = async () => {
  const { data } = await useFetch("/api/customer/save-store", {
    initialCache: false,
    method: "POST",
    body: {
      storeID: storeID.value || null,
      storeName: storeName.value,
      storeDescription: storeDesc.value,
      storeUsername: username,
      mode: mode.value,
    },
  });

  if (data.value.statusCode === 200) {
    $swal.fire({
      title: "Success",
      text: "Store information has been saved.",
      icon: "success",
      confirmButtonText: "Ok",
    });

    refresh();
  } else {
    $swal.fire({
      title: "Error",
      text: "Store information could not be saved.",
      icon: "error",
      confirmButtonText: "Ok",
    });
  }
};
</script>
<template>
  <div>
    <LayoutsBreadcrumb />
    <rs-card>
      <template #header> Store Information </template>
      <template #body>
        <FormKit label="Name" type="text" v-model="storeName" />
        <FormKit
          label="Description"
          type="textarea"
          rows="10"
          v-model="storeDesc"
        />
        <FormKit
          v-if="data"
          label="Created Date"
          type="text"
          v-model="storeCreatedDate"
          readonly
        />
        <rs-button class="mt-4" variant="primary" @click="saveStore"
          >Save</rs-button
        >
      </template>
    </rs-card>
  </div>
</template>
