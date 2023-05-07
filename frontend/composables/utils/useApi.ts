import { notify } from '@kyvg/vue3-notification'

export function useApi (url: string, props?: object) {
  const apiError = ref(undefined as any | undefined)

  watch(apiError, async () => {
    if (apiError.value === undefined) { return }

    notify({
      type: 'error',
      title: 'Ошибка',
      text: `${apiError.value?.data.message as string}`
    })

    if (apiError.value?.statusCode === 403) {
      await navigateTo('/admin/login')
    }
  })

  async function post (): Promise<false | object> {
    const { data, error } = await useFetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: props,
      credentials: 'include'
    })

    apiError.value = error.value
    return data.value as object | null ?? false
  }

  async function get (): Promise<false | object> {
    const { data, error } = await useFetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      query: props,
      credentials: 'include'
    })

    apiError.value = error.value
    return data.value as object | null ?? false
  }

  return { get, post }
}
