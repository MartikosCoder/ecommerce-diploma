<script setup lang="ts">
import { notify } from "@kyvg/vue3-notification";
import { useCoupons } from "~/store/client/coupons";

const { t } = useI18n();

const couponsStore = useCoupons();

onMounted(couponsStore.getCoupons);

async function copyCoupon(code: string) {
  await navigator.clipboard.writeText(code);

  notify({
    type: "success",
    title: t("client.profile.coupons.success"),
    text: t("client.profile.coupons.copySuccess"),
  });
}
</script>

<template>
  <article class="p-2 flex flex-col gap-1 lg:px-10">
    <h1 class="text-2xl lg:text-3xl font-bold">
      {{ $t("client.profile.coupons.title") }}
    </h1>
    <section class="flex flex-col gap-2 justify-center lg:gap-10">
      <div
        v-for="coupon in couponsStore.coupons"
        :key="coupon.id"
        class="p-5 border-b border-blue-950 flex items-center justify-between"
      >
        <div class="flex gap-2 flex-col md:gap-4">
          <span class="text-lg md:text-xl font-bold">{{ coupon.title }}</span>
          <span class="text-sm md:text-lg">
            {{ $t("client.profile.coupons.totalDiscount") }}
            <span class="font-bold">{{ coupon.total_discount }}%</span>
          </span>
          <section class="flex flex-col gap-2 text-sm md:text-lg">
            <span class="font-bold">
              {{ $t("client.profile.coupons.personalDiscounts") }}
            </span>
            <div class="flex flex-col gap-1">
              <span v-for="rule in coupon.rules" :key="rule.category">
                {{ rule.category }}:
                <span class="font-bold">{{ rule.discount }}%</span>
              </span>
            </div>
          </section>
        </div>
        <ClientUiIconButton
          name="material-symbols:content-copy-outline-rounded"
          @click="copyCoupon(coupon.code)"
        />
      </div>
    </section>
  </article>
</template>
