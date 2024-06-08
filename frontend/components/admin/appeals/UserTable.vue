<script setup lang="ts">
defineProps<{
  user: OrderUser;
}>();
</script>

<template>
  <table
    class="text-xl w-full max-h-96 overflow-auto border-collapse border border-slate-500"
  >
    <thead class="bg-slate-500 text-white text-left">
      <tr>
        <th class="p-2">
          {{ $t("inputs.userName") }}
        </th>
        <th class="p-2">{{ $t("inputs.userPhone") }}</th>
        <th class="p-2">{{ $t("inputs.userEmail") }}</th>
      </tr>
    </thead>
    <tbody>
      <tr
        class="border-b border-slate-500 hover:bg-slate-200 transition-colors select-none"
      >
        <td class="p-2">
          {{ user.name }}
        </td>
        <td class="p-2">
          {{ user.phone }}
        </td>
        <td class="p-2">
          {{ user.email }}
        </td>
      </tr>
    </tbody>
  </table>
</template>
