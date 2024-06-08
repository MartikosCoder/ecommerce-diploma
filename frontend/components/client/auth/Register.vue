<script setup lang="ts">
import { useAuthModal } from "~/composables/client/useAuthModal";
import { useRegister } from "~/composables/client/useRegister";

const { closeModal, changeModalType } = useAuthModal();
const { data, cannotRegister, register } = useRegister();
</script>

<template>
  <section class="bg-white rounded-sm p-5 overflow-auto flex flex-col gap-5">
    <header class="flex justify-between items-center">
      <h2 class="text-3xl font-bold">{{ $t("client.auth.registration") }}</h2>
      <ClientUiIconButton
        name="material-symbols:close-rounded"
        @click="closeModal"
      />
    </header>
    <article class="flex flex-col gap-5">
      <ClientUiInput
        v-model:value="data.name"
        class="lg:w-full"
        :label="$t('inputs.userName')"
        :placeholder="$t('inputs.placeholderName')"
        type="text"
      />
      <ClientUiInput
        v-model:value="data.email"
        class="lg:w-full"
        label="Email"
        placeholder="test@email.com"
        type="email"
      />
      <ClientUiInput
        v-model:value="data.phone"
        class="lg:w-full"
        :label="$t('inputs.userPhone')"
        placeholder="380xxxxxxxxx"
        type="tel"
      />
      <ClientUiInput
        v-model:value="data.password"
        class="lg:w-full"
        :label="$t('inputs.password')"
        placeholder="**********"
        type="password"
      />
    </article>
    <footer class="mt-auto flex flex-col md:flex-row w-full justify-end gap-5">
      <button
        :disabled="cannotRegister"
        class="bg-blue-700 text-white px-5 py-3 rounded-md transition-colors disabled:bg-blue-400 hover:bg-blue-800 active:bg-blue-900"
        @click="register"
      >
        {{ $t("client.auth.register") }}
      </button>
      <button
        class="bg-slate-500 text-white px-5 py-3 rounded-md transition-colors disabled:bg-slate-400 hover:bg-slate-600 active:bg-slate-700"
        @click="changeModalType('login')"
      >
        {{ $t("client.auth.authorize") }}
      </button>
    </footer>
  </section>
</template>
