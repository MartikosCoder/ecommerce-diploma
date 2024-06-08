<script setup lang="ts">
import { useEvent } from "~/composables/utils/useEventBus";

const dateRef = ref<HTMLInputElement | null>();
const deliveryDate = ref<string | null>(null);
function updateDate() {
  deliveryDate.value = dateRef.value!.value;

  useEvent("cart:update", {
    deliveryDate: deliveryDate.value,
  });
}
const dateMinMax = computed(() => {
  const min = new Date();
  const max = new Date();
  max.setDate(max.getDate() + 7);

  return {
    min: min.toISOString().split("T")[0],
    max: max.toISOString().split("T")[0],
  };
});

const fromTimeRef = ref<HTMLInputElement | null>();
const toTimeRef = ref<HTMLInputElement | null>();
const deliveryTime = ref<{ from: string | null; to: string | null }>({
  from: null,
  to: null,
});
function updateFromTime() {
  deliveryTime.value.from = fromTimeRef.value!.value;
  useEvent("cart:update", {
    deliveryTimeFrom: deliveryTime.value.from,
  });
}
function updateToTime() {
  deliveryTime.value.to = toTimeRef.value!.value;

  useEvent("cart:update", {
    deliveryTimeTo: deliveryTime.value.to,
  });
}
</script>

<template>
  <section class="flex flex-col gap-2">
    <h3 class="text-xl lg:text-2xl font-bold">
      {{ $t("client.cart.datesTitle") }}
    </h3>
    <section class="flex flex-col gap-3">
      <label class="flex flex-col gap-1">
        {{ $t("client.cart.dateDelivery") }}
        <input
          ref="dateRef"
          :value="deliveryDate"
          class="rounded-md outline-none border border-blue-950 p-2"
          :placeholder="$t('client.cart.dateDelivery')"
          type="date"
          :min="dateMinMax.min"
          :max="dateMinMax.max"
          @blur="updateDate"
        />
      </label>
      <section class="flex flex-col gap-2">
        <h4>
          {{ $t("client.cart.timeDelivery") }}
        </h4>
        <div class="flex gap-2">
          <input
            ref="fromTimeRef"
            :value="deliveryTime.from"
            class="w-1/2 rounded-md outline-none border border-blue-950 p-2"
            type="time"
            min="08:00"
            max="20:00"
            @blur="updateFromTime"
          />
          <input
            ref="toTimeRef"
            :value="deliveryTime.to"
            class="w-1/2 rounded-md outline-none border border-blue-950 p-2"
            type="time"
            min="08:00"
            max="20:00"
            @blur="updateToTime"
          />
        </div>
      </section>
    </section>
  </section>
</template>
