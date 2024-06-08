import { useEvent, useListen } from "~/composables/utils/useEventBus";

export function useSort() {
  const { t } = useI18n();

  const isSortOpened = ref(false);
  const sortOptions = ref<Client.CatalogSort[]>([
    {
      type: "default",
      title: t("client.catalog.default"),
    },
    {
      type: "price-down",
      title: t("client.catalog.priceDown"),
    },
    {
      type: "price-up",
      title: t("client.catalog.priceUp"),
    },
    {
      type: "rating",
      title: t("client.catalog.rating"),
    },
  ]);
  const selectedSort = ref<Client.CatalogSortType>("default");

  useListen("catalog:dropdown", (event) => {
    if (event === "filter") {
      isSortOpened.value = false;
      return;
    }
    if (event === "sort" && isSortOpened.value) {
      isSortOpened.value = false;
      return;
    }
    isSortOpened.value = true;
  });

  function toggleSort() {
    useEvent("catalog:dropdown", "sort");
  }

  function changeSort(type: Client.CatalogSortType) {
    selectedSort.value = type;
    useEvent("catalog:dropdown", "sort");
    useEvent("catalog:update", { sort: selectedSort.value });
  }

  return { isSortOpened, sortOptions, selectedSort, toggleSort, changeSort };
}
