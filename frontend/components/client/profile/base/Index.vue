<script setup lang="ts">
import { useProfile } from "~/composables/client/useProfile";

const { data } = useProfile();
</script>

<template>
  <article class="px-2 lg:px-10 w-full flex flex-col gap-5">
    <h1 class="text-2xl lg:text-3xl font-bold">
      {{ $t("client.profile.base.menu") }}
    </h1>
    <section
      class="flex flex-col gap-6 lg:flex-row lg:flex-wrap lg:justify-center"
    >
      <ClientProfileBaseField
        v-model:value="data.name"
        :label="$t('inputs.userName')"
        :placeholder="$t('inputs.placeholderName')"
        type="text"
      />
      <ClientProfileBaseField
        v-model:value="data.email"
        label="Email"
        placeholder="test@email.com"
        type="email"
      />
      <ClientProfileBaseField
        v-model:value="data.phone"
        :label="$t('inputs.userPhone')"
        placeholder="380xxxxxxxxx"
        type="tel"
      />
      <ClientProfileBaseField
        v-model:value="data.password"
        :label="$t('inputs.password')"
        placeholder="**********"
        type="password"
      />
    </section>
  </article>
</template>
