<template>
  <div>
    <notifications class="w-full p-5 text-md pointer-events-none" />
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import { notify } from "@kyvg/vue3-notification";

const globalApiErrors = useState<number[]>("api-errors", () => []);

const { t } = useI18n();
const errorsMap = computed(() => ({
  0: t("errors.title"),
  400: t("errors.noId"),
  403: t("errors.noAuth"),
  404: t("errors.notFound"),
  405: t("errors.noField"),
  406: t("errors.alreadyAuth"),
  407: t("errors.creationFailed"),
  408: t("errors.updateStatusFailed"),
}));

watch(
  globalApiErrors,
  async (errors) => {
    if (errors.length === 0) {
      return;
    }

    const statusCode = errors.shift()! as keyof typeof errorsMap.value;

    notify({
      type: "error",
      title: t("errors.title"),
      text: errorsMap.value[statusCode],
    });

    if (statusCode === 403) {
      await navigateTo("/");
    }
  },
  {
    immediate: true,
    deep: true,
  }
);
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  font-family: "Open Sans", sans-serif;
}

.vue-notification {
  font-size: unset !important;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  appearance: textfield;
}

:root {
  --vc-pgn-border-radius: 5rem;
}
</style>
