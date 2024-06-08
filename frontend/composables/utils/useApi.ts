import { notify } from "@kyvg/vue3-notification";

export function useApi(url: string, props?: object) {
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

  const apiError = ref(undefined as any | undefined);

  watch(apiError, async () => {
    if (apiError.value === undefined || apiError.value === null) {
      return;
    }

    const statusCode = (apiError.value.statusCode ||
      0) as keyof typeof errorsMap.value;

    notify({
      type: "error",
      title: t("errors.title"),
      text: errorsMap.value[statusCode],
    });

    if (apiError.value?.statusCode === 403) {
      await navigateTo("/");
    }
  });

  async function post(): Promise<false | object> {
    const { data, error } = await useFetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: props,
      credentials: "include",
    });

    apiError.value = error.value;
    return (data.value as object | null) ?? false;
  }

  async function get(): Promise<false | object> {
    const { data, error } = await useFetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      query: props,
      credentials: "include",
    });

    apiError.value = error.value;
    return (data.value as object | null) ?? false;
  }

  async function put(): Promise<false | object> {
    const { data, error } = await useFetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: props,
      credentials: "include",
    });

    apiError.value = error.value;
    return (data.value as object | null) ?? false;
  }

  async function remove(): Promise<false | object> {
    const { data, error } = await useFetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: props,
      credentials: "include",
    });

    apiError.value = error.value;
    return (data.value as object | null) ?? false;
  }

  return { get, post, put, remove };
}
