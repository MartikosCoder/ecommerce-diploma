<script setup lang="ts">
import { useOrders } from "~/store/client/orders";

const { t } = useI18n();

const ordersStore = useOrders();

const orderStatus = computed(
  () => (status: "new" | "in-work" | "success" | "canceled") => {
    const statuses = {
      new: t("client.profile.orders.new"),
      "in-work": t("client.profile.orders.inWork"),
      success: t("client.profile.orders.success"),
      canceled: t("client.profile.orders.canceled"),
    };

    return statuses[status];
  }
);

async function askCancel(id?: number) {
  if (!id) {
    return;
  }

  if (!confirm(t("areYouSure"))) {
    return;
  }

  if (!(await ordersStore.cancelOrder(id))) {
    return;
  }
  await ordersStore.getOrders();
}
</script>

<template>
  <article class="px-2 lg:px-10 w-full flex flex-col gap-5">
    <h1 class="text-2xl lg:text-3xl font-bold">
      {{ $t("client.profile.orders.list") }}
    </h1>
    <section class="flex flex-col gap-2 justify-center lg:gap-10">
      <div
        v-for="order in ordersStore.orders"
        :key="order.id"
        class="p-5 border-b border-blue-950 flex items-center justify-between"
      >
        <div class="flex gap-2 flex-col md:gap-4">
          <span class="text-lg md:text-xl font-bold">
            {{ $t("client.profile.orders.id") }}
            {{ order.id }}
          </span>
          <span class="text-sm md:text-lg">
            {{ $t("client.profile.orders.total") }}
            {{ order.total }} ₴
          </span>
          <span class="text-sm md:text-lg">
            {{ $t("client.profile.orders.date") }} {{ order.delivery_date }}
            {{ $t("client.profile.orders.from") }}
            {{ order.delivery_from_time }} {{ $t("client.profile.order.to") }}
            {{ order.delivery_to_time }}
          </span>
          <span class="text-lg md:text-xl font-bold">{{
            orderStatus(order.status)
          }}</span>
        </div>
        <div
          v-if="order.status === 'new'"
          class="w-1/4 flex gap-1 justify-center"
        >
          <ClientUiIconButton
            name="material-symbols:close-rounded"
            @click="askCancel(order.id)"
          />
        </div>
      </div>
    </section>
  </article>
</template>
