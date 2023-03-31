<script setup>
definePageMeta({
  title: "API Editor",
});

const nuxtApp = useNuxtApp();

const searchText = ref("");

const showModalAdd = ref(false);
const showModalAddForm = ref({
  apiURL: "",
});

const showModalEdit = ref(false);
const showModalEditForm = ref({
  apiURL: "",
  oldApiURL: "",
});

const openModalAdd = () => {
  showModalAddForm.value = {
    apiURL: "",
  };

  showModalAdd.value = true;
};

const openModalEdit = (url) => {
  const apiURL = url.replace("/api/", "");

  showModalEditForm.value = {
    apiURL: apiURL,
    oldApiURL: apiURL,
  };

  showModalEdit.value = true;
};

// Get api list from api folder
const getApiList = async () => {
  const { data } = await useFetch("/api/admin/api/list", {
    initialCache: false,
  });
  return data;
};

const apiList = await getApiList();

const searchApi = () => {
  return apiList.value.data.filter((api) => {
    return api.name.toLowerCase().includes(searchText.value.toLowerCase());
  });
};

const kebabCasetoTitleCase = (str) => {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const redirectToApiCode = (api) => {
  window.location.href = `/admin/api-editor/code?path=${api}`;
};

const saveAddAPI = async () => {
  const { data } = await useFetch("/api/admin/api/save", {
    initialCache: false,
    method: "POST",
    body: {
      path: "/api/" + showModalAddForm.value.apiURL,
      type: "add",
    },
  });

  if (data.value.statusCode === 200) {
    nuxtApp.$swal.fire({
      title: "Success",
      text: "The code has been saved successfully.",
      icon: "success",
      confirmButtonText: "Ok",
      timer: 1000,
    });
    setTimeout(() => {
      nuxtApp.$router.go(
        `/admin/api-editor/code?path=/api${data.value.data.path}`
      );
    }, 1000);
  }
};

const saveEditAPI = async () => {
  const { data } = await useFetch("/api/admin/api/save", {
    initialCache: false,
    method: "POST",
    body: {
      path: "/api/" + showModalEditForm.value.apiURL,
      oldPath: "/api/" + showModalEditForm.value.oldApiURL,
      type: "edit",
    },
  });

  if (data.value.statusCode === 200) {
    nuxtApp.$swal.fire({
      title: "Success",
      text: "The code has been saved successfully.",
      icon: "success",
      confirmButtonText: "Ok",
      timer: 1000,
    });
    setTimeout(() => {
      nuxtApp.$router.go(
        `/admin/api-editor/code?path=/api/${showModalEditForm.value.apiURL}`
      );
    }, 1000);
  }
};

const deleteAPI = async (apiURL) => {
  nuxtApp.$swal
    .fire({
      title: "Are you sure to delete this API?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    })
    .then(async (result) => {
      if (result.isConfirmed) {
        const { data } = await useFetch("/api/admin/api/save", {
          initialCache: false,
          method: "POST",
          body: {
            path: apiURL,
            type: "delete",
          },
        });

        if (data.value.statusCode === 200) {
          nuxtApp.$swal.fire({
            title: "Success",
            text: "The code has been saved successfully.",
            icon: "success",
            confirmButtonText: "Ok",
            timer: 1000,
          });
          setTimeout(() => {
            nuxtApp.$router.go();
          }, 1000);
        }
      }
    });
};
</script>
<template>
  <div>
    <LayoutsBreadcrumb />
    <rs-card>
      <template #header>
        <div class="flex">
          <Icon class="mr-2 flex justify-center" name="ic:outline-info"></Icon
          >Info
        </div>
      </template>
      <template #body>
        <p class="mb-4">
          This page is used to edit the api for the server side. You can edit
          the api by choosing the api to edit from the card list below.
        </p>
      </template>
    </rs-card>

    <rs-card>
      <div class="p-4">
        <div class="flex justify-end items-center mb-4">
          <rs-button @click="openModalAdd">
            <Icon name="material-symbols:add" class="mr-1"></Icon>
            Add API
          </rs-button>
        </div>

        <!-- Search Button -->
        <FormKit
          v-model="searchText"
          placeholder="Search Title..."
          type="search"
          class="mb-4"
        />

        <rs-card v-for="api in searchApi()">
          <div class="relative p-4 border-l-8 border-primary-400 rounded">
            <div class="flex justify-between items-center">
              <div class="block">
                <span class="font-semibold text-lg">{{
                  kebabCasetoTitleCase(api.name)
                }}</span>
                <br />
                <span class="text-gray-400"> {{ api.url }}</span>
              </div>
              <div class="flex gap-4">
                <rs-button
                  variant="primary-outline"
                  @click="redirectToApiCode(api.url)"
                >
                  <Icon
                    name="material-symbols:code-blocks-outline-rounded"
                    class="mr-2"
                  />
                  Code Editor
                </rs-button>
                <div class="flex gap-2">
                  <rs-button @click="openModalEdit(api.url)">
                    <Icon name="material-symbols:edit-outline-rounded" />
                  </rs-button>
                  <rs-button @click="deleteAPI(api.url)">
                    <Icon name="carbon:trash-can" />
                  </rs-button>
                </div>
              </div>
            </div>
          </div>
        </rs-card>
      </div>
    </rs-card>

    <rs-modal
      title="Add API"
      v-model="showModalAdd"
      ok-title="Save"
      :ok-callback="saveAddAPI"
    >
      <FormKit type="text" label="Url" v-model="showModalAddForm.apiURL">
        <template #prefix>
          <div class="bg-slate-100 dark:bg-slate-700 h-full rounded-l-md p-3">
            /api/
          </div>
        </template>
      </FormKit>
    </rs-modal>

    <rs-modal
      title="Add API"
      v-model="showModalEdit"
      ok-title="Save"
      :ok-callback="saveEditAPI"
    >
      <FormKit type="text" label="Url" v-model="showModalEditForm.apiURL">
        <template #prefix>
          <div class="bg-slate-100 dark:bg-slate-700 h-full rounded-l-md p-3">
            /api/
          </div>
        </template>
      </FormKit>
    </rs-modal>
  </div>
</template>
