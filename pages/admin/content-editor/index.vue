<script setup>
definePageMeta({
  title: "Content Editor",
});

const router = useRouter();
const getPages = router.getRoutes();

const pages = getPages.filter((page) => {
  // filter out the pages that are not in the admin folder
  return (
    page.path.includes("/admin") === false &&
    page.meta?.title &&
    page.meta?.title !== "Home" &&
    page.name
  );
});

const searchText = ref("");

const searchPages = () => {
  return pages.filter((page) => {
    return page.meta.title
      .toLowerCase()
      .includes(searchText.value.toLowerCase());
  });
};

const redirectCodeEditor = (pageName) => {
  // router.push({
  //   name: "admin-page-code-editor",
  //   query: {
  //     page: pageName,
  //   },
  // });
  // redirect to code editor page

  window.location.href = `/admin/content-editor/code?page=${pageName}`;
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
          This page is used to edit the content of a page. You can edit the
          content of the page by choosing the page to edit from the card list
          below.
        </p>
      </template>
    </rs-card>

    <rs-card>
      <div class="p-4">
        <!-- Search Button -->
        <FormKit
          v-model="searchText"
          placeholder="Search Title..."
          type="search"
        />

        <div
          class="page-wrapper grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          <!-- <div
            class="page border-2 border-gray-400 border-dashed rounded-lg"
            style="min-height: 250px"
          >
            Add New Page
          </div> -->
          <div
            v-for="page in searchPages()"
            :key="page.path"
            class="page shadow-lg rounded-lg hover:scale-105 transition-all duration-300"
            style="min-height: 250px"
          >
            <div class="thumbnail-wrapper relative">
              <div class="button-list absolute bottom-3 right-3 flex z-10">
                <rs-button class="!py-2 !px-3 rounded-r-none">
                  <Icon
                    name="material-symbols:format-paint-outline-rounded"
                  ></Icon>
                </rs-button>
                <rs-button
                  @click="redirectCodeEditor(page.name)"
                  class="!py-2 !px-3 rounded-l-none"
                >
                  <Icon
                    name="material-symbols:code-blocks-outline-rounded"
                  ></Icon>
                </rs-button>
                <!-- <rs-button variant="danger" class="!p-2 rounded-l-none">
                  <Icon name="material-symbols:delete-outline-rounded"></Icon>
                </rs-button> -->
              </div>

              <img
                class="thumbnail rounded-tl-lg rounded-tr-lg"
                style="height: 250px; width: 100%; object-fit: cover"
                src="@/assets/img/default-thumbnail-upres.jpg"
                alt=""
              />
              <div
                class="overlay-img opacity-30 bg-black text-black before:content-['Hello_World'] absolute top-0 left-0 w-full h-full rounded-tl-lg rounded-tr-lg"
              ></div>
            </div>
            <div class="py-2 px-4">
              <h4 class="font-semibold">{{ page.meta.title }}</h4>
              <span>{{ page.name }}</span>
              <div class="flex items -center">
                <Icon
                  class="mr-2"
                  name="ic:outline-link"
                  style="font-size: 1.2rem"
                ></Icon>
                <p class="text-sm">{{ page.path }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </rs-card>
  </div>
</template>

<style lang="scss">
.thumbnail::before {
  content: "";
  display: block;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.8);
}
</style>
