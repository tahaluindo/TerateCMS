<script setup>
const isVertical = ref(true);
const isDesktop = ref(true);

const emit = defineEmits(["toggleMenu"]);

const colorMode = useColorMode();

// Change color mode
function setColorMode() {
  if (colorMode.preference === "dark") {
    colorMode.preference = "light";
  } else {
    colorMode.preference = "dark";
  }
}

// Toggle Open/Close menu
const toggleMenu = (event) => emit("toggleMenu", event);

// Focus on search input
function toggleSearch() {
  document.getElementById("header-search").value = "";
  document.getElementById("header-search").focus();
}
</script>

<template>
  <div
    class="w-header z-20 bg-white dark:bg-slate-800 fixed top-0 right-0 px-5 py-3 duration-300 shadow-md shadow-slate-200 dark:shadow-slate-900"
  >
    <div class="flex items-stretch justify-between">
      <div v-if="isVertical" class="flex">
        <span class="flex items-center justify-center">
          <button class="icon-btn h-10 w-10 rounded-full" @click="toggleMenu">
            <Icon name="ic:round-menu" class="" /></button
        ></span>
      </div>
      <div class="flex" v-else>
        <div class="flex flex-auto gap-3 justify-center items-center">
          <img
            class="h-10 w-10 block dark:hidden"
            src="@/assets/img/logo/logo.png"
            alt=""
          />
          <img
            class="h-10 w-10 hidden dark:block"
            src="@/assets/img/logo/logo-white.png"
            alt=""
          />
          <span
            v-if="isDesktop"
            class="text-xl font-semibold text-primary-500 dark:text-white"
            >MawarCMS</span
          >
        </div>
      </div>

      <div class="flex gap-2 item-center justify-items-end">
        <VDropdown placement="bottom-end" distance="13" name="language">
          <button class="icon-btn h-10 w-10 rounded-full">
            <country-flag iso="GB" />
          </button>
          <template #popper>
            <ul class="header-dropdown w-full md:w-32">
              <li
                class="flex items-center justify-center hover:bg-slate-200 hover:dark:bg-slate-700"
              >
                <button class="py-2 px-4">
                  <country-flag iso="GB" />
                  <span class="ml-2">English</span>
                </button>
              </li>
              <li
                class="flex items-center justify-center hover:bg-slate-200 hover:dark:bg-slate-700"
              >
                <button class="py-2 px-4">
                  <country-flag iso="MY" />
                  <span class="ml-2">Melayu</span>
                </button>
              </li>
              <li
                class="flex items-center justify-center hover:bg-slate-200 hover:dark:bg-slate-700"
              >
                <button class="py-2 px-4">
                  <country-flag iso="EG" />
                  <span class="ml-2">Arabic</span>
                </button>
              </li>
            </ul>
          </template>
        </VDropdown>
        <button class="icon-btn h-10 w-10 rounded-full" @click="setColorMode">
          <Icon
            v-if="colorMode.preference === 'light'"
            name="ic:outline-dark-mode"
          />
          <Icon
            v-else-if="colorMode.preference === 'dark'"
            name="ic:outline-wb-sunny"
          />
        </button>
        <button class="icon-btn h-10 w-10 rounded-full">
          <Icon @click="toggleSearch" name="ic:round-search" class="" />
        </button>
        <VTooltip>
          <template #popper> 10 unread notification </template>
          <VDropdown placement="bottom-end" distance="13" name="notification">
            <button class="relative icon-btn h-10 w-10 rounded-full">
              <span
                class="w-3 h-3 absolute top-1 right-2 rounded-full bg-primary-400"
              ></span>
              <Icon name="ic:round-notifications-none" class="" />
            </button>
            <template #popper>
              <ul class="header-dropdown w-full md:w-80">
                <li class="d-head flex items-center justify-between py-2 px-4">
                  <span class="font-semibold">Notification</span>
                  <div
                    class="flex items-center text-primary-400 cursor-pointer hover:underline"
                  >
                    <a class="ml-2">View All</a>
                  </div>
                </li>
                <SimpleBar>
                  <li>
                    <div class="bg-slate-100 dark:bg-slate-700 py-2 px-4">
                      Today
                    </div>
                    <a class="py-2 px-4 block">
                      <div class="flex items-center">
                        <Icon
                          name="ic:outline-circle"
                          class="text-primary-400 flex-none"
                        />
                        <span class="mx-2"
                          >Terdapat Satu Pembayaran yang berlaku menggunakan bil
                          Kuih Raya Cik Kiah</span
                        >
                        <div class="w-12 h-12 rounded-full ml-auto flex-none">
                          <img
                            class="rounded-full"
                            src="https://ui-avatars.com/api/?name=Raziq Danish"
                            alt=""
                          />
                        </div>
                      </div>
                    </a>
                    <a class="py-2 px-4 block">
                      <div class="flex items-center">
                        <Icon
                          name="ic:outline-circle"
                          class="text-primary-400 flex-none"
                        />
                        <span class="mx-2"
                          >Terdapat Satu Pembayaran yang berlaku menggunakan bil
                          Mercun</span
                        >
                        <div class="w-12 h-12 rounded-full ml-auto flex-none">
                          <img
                            class="rounded-full"
                            src="https://ui-avatars.com/api/?name=Iqmal Rizal"
                            alt=""
                          />
                        </div>
                      </div>
                    </a>
                  </li>
                </SimpleBar>
              </ul>
            </template>
          </VDropdown>
        </VTooltip>

        <VDropdown placement="bottom-end" distance="13" name="profile">
          <button
            class="icon-btn px-2 rounded-lg border border-white md:border-gray-200 dark:border-gray-700"
          >
            <img
              class="w-8 h-8 object-cover rounded-full"
              src="https://ui-avatars.com/api/?name=John Doe"
            />
            <div
              v-if="isDesktop"
              class="grid grid-cols-1 text-left ml-3 flex-none"
            >
              <p class="font-semibold text-sm truncate w-24 mb-0">John Doe</p>
              <span class="font-medium text-xs truncate w-24"
                >RM 10,000.00</span
              >
            </div>
            <Icon name="ic:outline-keyboard-arrow-down" class="ml-3" />
          </button>
          <template #popper>
            <ul class="header-dropdown w-full md:w-52">
              <!-- <li>
                <a
                  class="flex items-center cursor-pointer py-2 px-4 hover:bg-slate-200 hover:dark:bg-slate-700"
                >
                  <Icon name="ic:outline-view-sidebar" class="mr-2" />
                  {{ isVertical ? "Horizontal Layout" : "Vertical Layout" }}
                </a>
              </li> -->
              <li>
                <a
                  class="flex items-center cursor-pointer py-2 px-4 hover:bg-slate-200 hover:dark:bg-slate-700"
                >
                  <Icon name="ic:outline-account-circle" class="mr-2" />
                  Account
                </a>
              </li>
              <li>
                <a
                  class="flex items-center cursor-pointer py-2 px-4 hover:bg-slate-200 hover:dark:bg-slate-700"
                >
                  <Icon name="ic:outline-settings" class="mr-2" />
                  Setting
                </a>
              </li>
              <li>
                <NuxtLink
                  to="/logout"
                  class="flex items-center cursor-pointer py-2 px-4 hover:bg-slate-200 hover:dark:bg-slate-700"
                >
                  <Icon name="ic:outline-logout" class="mr-2" />
                  Logout
                </NuxtLink>
                <!-- <a
                  class="flex items-center cursor-pointer py-2 px-4 hover:bg-slate-200 hover:dark:bg-slate-700"
                >
                 
                </a> -->
              </li>
            </ul>
          </template>
        </VDropdown>
      </div>
    </div>
  </div>

  <!-- Search Nav for Layout Vertical -->
  <div
    tabindex="0"
    class="w-header-search bg-white dark:bg-slate-800 px-4 z-40 duration-300 shadow-md shadow-slate-200 dark:shadow-slate-900 -top-20 focus-within:top-0 right-0"
  >
    <Icon name="ic:outline-search" class="" />
    <input
      id="header-search"
      type="text"
      class="w-full ml-2 px-2 py-3 appearance-none text-md rounded-lg focus:outline-none dark:bg-slate-800"
      name="Search"
      placeholder="Search..."
    />
  </div>
</template>
