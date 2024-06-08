<script setup lang="ts">
defineProps<{
  userDelivery: OrderUserDelivery;
}>();
</script>

<template>
  <table
    class="text-xl w-full max-h-96 overflow-auto border-collapse border border-slate-500"
  >
    <thead class="bg-slate-500 text-white text-left">
      <tr>
        <th class="p-2">
          {{ $t("admin.orders.userDeliveryCity") }}
        </th>
        <th class="p-2">
          {{ $t("admin.orders.userDeliveryStreet") }}
        </th>
        <th class="p-2">
          {{ $t("admin.orders.userDeliveryHouse") }}
        </th>
        <th class="p-2">
          {{ $t("admin.orders.userDeliveryEntrance") }}
        </th>
        <th class="p-2">
          {{ $t("admin.orders.userDeliveryFloor") }}
        </th>
        <th class="p-2">
          {{ $t("admin.orders.userDeliveryApartment") }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        class="border-b border-slate-500 hover:bg-slate-200 transition-colors select-none"
      >
        <td class="p-2">
          {{ userDelivery.city }}
        </td>
        <td class="p-2">
          {{ userDelivery.street }}
        </td>
        <td class="p-2">
          {{ userDelivery.house }}
        </td>
        <td class="p-2">
          {{ userDelivery.entrance }}
        </td>
        <td class="p-2">
          {{ userDelivery.floor }}
        </td>
        <td class="p-2">
          {{ userDelivery.apartment }}
        </td>
      </tr>
    </tbody>
  </table>
</template>
