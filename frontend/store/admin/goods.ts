import { defineStore } from 'pinia'

import { useApi } from '~/composables/utils/useApi'

export const useGoods = defineStore('goodsStore', () => {
  const goods = ref<GoodPreview[]>([])

  async function getGoods () {
    const result = await useApi('/api/admin/goods/list').get()

    if (result === false) { return false }

    goods.value = result as GoodPreview[]
    return true
  }

  return { goods, getGoods }
})
