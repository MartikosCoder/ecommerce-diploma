<script setup lang="ts">
import { useUser } from "~/store/client/user";

const { t } = useI18n();

const userStore = useUser();

const menuItems = computed(() => [
  {
    id: 1,
    icon: "material-symbols:person-outline-rounded",
    title: t("client.profile.personal.menu"),
    link: "/profile",
  },
  {
    id: 2,
    icon: "material-symbols:inbox-customize-outline-rounded",
    title: t("client.profile.deliveries.menu"),
    link: "/profile/deliveries",
  },
  {
    id: 3,
    icon: "material-symbols:file-copy-outline-rounded",
    title: t("client.profile.orders.menu"),
    link: "/profile/orders",
  },
  {
    id: 4,
    icon: "mingcute:coupon-line",
    title: t("menu.specials"),
    link: "/profile/promotions",
  },
  {
    id: 5,
    icon: "material-symbols:help-center-outline-rounded",
    title: t("menu.techSupport"),
    link: "/profile/help",
  },
  {
    id: 6,
    icon: "material-symbols:logout-rounded",
    title: t("menu.exit"),
    link: "/",
  },
]);

async function checkForLogout(id: number, link: string) {
  if (id === 6) {
    await userStore.logoutUser();
    location.href = "/";
    return;
  }

  await navigateTo(link);
}
</script>

<template>
  <header
    class="py-2 flex flex-col items-center gap-2 md:flex-row md:px-2 md:gap-5"
  >
    <ClientUiLogo />
    <nav
      class="w-full flex flex-wrap gap-1 md:gap-3 lg:gap-5 justify-center items-center transition-all"
    >
      <ClientUiMenuItem
        v-for="item in menuItems"
        :key="item.id"
        :icon="item.icon"
        :title="item.title"
        :link="item.link"
        @click="checkForLogout(item.id, item.link)"
      />
    </nav>
  </header>
</template>
