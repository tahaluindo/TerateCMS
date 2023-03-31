<script setup>
// import pinia store
import { useThemeStore } from "~/stores/theme";

definePageMeta({
  title: "API Code Editor",
});

const { $swal, $router } = useNuxtApp();
const route = useRoute();
const router = useRouter();

const fileCode = ref("");
const fileCodeConstant = ref("");
const componentKey = ref(0);

const hasError = ref(false);
const error = ref("");

const themeStore = useThemeStore();
const editorTheme = ref({
  label: themeStore.codeTheme,
  value: themeStore.codeTheme,
});
const dropdownThemes = ref([]);

const linterError = ref(false);
const linterErrorText = ref("");
const linterErrorColumn = ref(0);
const linterErrorLine = ref(0);

// Get all themes
const themes = codemirrorThemes();

// map the themes to the dropdown
dropdownThemes.value = themes.map((theme) => {
  return {
    label: theme.name,
    value: theme.name,
  };
});

// watch for changes in the theme
watch(editorTheme, (theme) => {
  themeStore.setCodeTheme(theme.value);
  forceRerender();
});

// Call API to get the code
const { data } = await useFetch("/api/admin/api/file-code", {
  initialCache: false,
  method: "GET",
  query: {
    path: route.query?.path,
  },
});

if (data.value.statusCode === 200) {
  fileCode.value = data.value.data;
  fileCodeConstant.value = data.value.data;
} else {
  $swal
    .fire({
      title: "Error",
      text: "The API you are trying to edit is not found. Please choose a API to edit.",
      icon: "error",
      confirmButtonText: "Ok",
    })
    .then(async (result) => {
      if (result.isConfirmed) {
        await $router.push("/admin/api-editor");
      }
    });
}

async function formatCode() {
  // Call API to get the code
  const { data } = await useFetch("/api/admin/api/prettier-format", {
    initialCache: false,
    method: "POST",
    body: JSON.stringify({
      code: fileCode.value,
    }),
  });
  forceRerender();

  if (data.value.statusCode === 200) {
    fileCode.value = data.value.data;
  }
}

async function checkLinterVue() {
  // Call API to get the code
  const { data } = await useFetch("/api/admin/api/linter", {
    initialCache: false,
    method: "POST",
    body: JSON.stringify({
      code: fileCode.value,
    }),
  });

  if (data.value.statusCode === 200) {
    linterError.value = false;
    linterErrorText.value = "";
    linterErrorColumn.value = 0;
    linterErrorLine.value = 0;
  } else if (data.value.statusCode === 400) {
    linterError.value = true;
    linterErrorText.value = data.value.data.message;
    linterErrorColumn.value = data.value.data.column;
    linterErrorLine.value = data.value.data.line;
  }
}

const forceRerender = () => {
  componentKey.value += 1;
};

const keyPress = (key) => {
  console.log(key);
  const event = new KeyboardEvent("keydown", {
    key: key,
    ctrlKey: true,
  });
  console.log(event);
  document.dispatchEvent(event);
};

const saveCode = async () => {
  // Check Linter Vue
  await checkLinterVue();

  if (linterError.value) {
    $swal.fire({
      title: "Error",
      text: "There is an error in your code. Please fix it before saving.",
      icon: "error",
      confirmButtonText: "Ok",
    });
    return;
  }

  const { data } = await useFetch("/api/admin/api/save", {
    initialCache: false,
    method: "POST",
    body: {
      path: route.query?.path,
      code: fileCode.value,
      type: "update",
    },
  });
  if (data.value.statusCode === 200) {
    $swal.fire({
      title: "Success",
      text: "The code has been saved successfully.",
      icon: "success",
      confirmButtonText: "Ok",
      timer: 1000,
    });
    setTimeout(() => {
      $router.go();
    }, 1000);
  }
};
</script>

<template>
  <div>
    <LayoutsBreadcrumb />

    <rs-alert v-if="hasError" class="mb-4" variant="primary">{{
      error
    }}</rs-alert>
    <rs-card>
      <rs-tab fill>
        <rs-tab-item title="Editor">
          <div class="flex justify-between gap-2 mb-4">
            <div>
              <!-- <FormKit
              type="select"
              label="Which country is the smallest?"
              name="small_country"
              :options="['Monaco', 'Vatican City', 'Maldives', 'Tuvalu']"
            /> -->

              <v-select
                v-model="editorTheme"
                name="themes"
                style="width: 200px"
                placeholder="Select Themes"
                :options="dropdownThemes"
              ></v-select>
            </div>
            <div class="flex gap-2">
              <rs-button class="!p-2" @click.prevent="keyPress('F11')">
                <Icon
                  name="material-symbols:fullscreen-rounded"
                  size="20px"
                  class="mr-1"
                />
                Fullscreen</rs-button
              >
              <rs-button class="!p-2" @click="formatCode">
                <Icon name="simple-icons:prettier" size="20px" class="mr-1" />
                Format Code</rs-button
              >
              <rs-button class="!p-2" @click="saveCode">
                <Icon
                  name="material-symbols:save-outline-rounded"
                  size="20px"
                  class="mr-1"
                />
                Save
              </rs-button>
            </div>
          </div>
          <Transition>
            <rs-alert class="mb-4" v-if="linterError">
              <div class="flex gap-2">
                <Icon
                  name="material-symbols:error-outline-rounded"
                  size="20px"
                />
                <div>
                  <div class="font-bold">ESLint Error</div>
                  <div class="text-sm">
                    {{ linterErrorText }}
                  </div>
                  <div class="text-xs mt-2">
                    Line: {{ linterErrorLine }} Column: {{ linterErrorColumn }}
                  </div>
                </div>
              </div>
            </rs-alert>
          </Transition>

          <ClientOnly>
            <rs-code-mirror
              :key="componentKey"
              v-model="fileCode"
              mode="text/javascript"
              :theme="editorTheme.value"
            >
            </rs-code-mirror>
          </ClientOnly>
        </rs-tab-item>
        <rs-tab-item title="API Tester">
          <rs-api-tester :url="route.query?.path" />
        </rs-tab-item>
      </rs-tab>
    </rs-card>
  </div>
</template>

<style lang="scss" scoped></style>
