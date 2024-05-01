<script setup lang="ts">
const { locale: currentLocale, locales, setLocale } = useI18n();

const tempLocale = ref(currentLocale.value);

watch(tempLocale, (newLocale) => {
  setLocale(newLocale);
});
</script>

<template>
  <header
    class="w-full top-0 bg-white sticky z-10 pb-5 flex flex-col items-center gap-2 md:flex-row md:px-2 md:gap-5"
  >
    <ClientUiLogo />
    <select
      class="p-2 rounded-lg border border-blue-950 w-1/12"
      v-model="tempLocale"
    >
      <option v-for="locale in locales" :key="locale.code" :value="locale.code">
        {{ locale.code.toUpperCase() }}
      </option>
    </select>
    <section
      class="w-full flex gap-5 items-center justify-center md:justify-normal"
    >
      <ClientHeaderSearch />
      <NuxtLink
        to="/catalog"
        class="p-0.5 lg:p-1 rounded-full hover:bg-blue-100 active:bg-blue-200 transition-colors cursor-pointer"
      >
        <Icon
          name="material-symbols:grid-view-outline-rounded"
          size="1.5rem"
          class="text-blue-900 lg:w-7 lg:h-7"
        />
      </NuxtLink>
    </section>
  </header>
</template>
