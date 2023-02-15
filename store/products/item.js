export const state = () => ({
  // Информация о продукте
  info: null
})

export const getters = {
  // Информация о продукте
  getInfo: state => state.info || {},
}

export const mutations = {
  set(state, [namespace, value]) {
    state[namespace] = value;
  }
}

export const actions = {
  // Получить информацию о продукте
  async fetchProductInfo({ state, commit }, productId) {
    if (state.info?.id === productId) return;
    await this.$api.$get(`/api/stock/product/get/${productId}`)
      .then(({err, body}) => {
        if (!err) commit("set", ["info", body]);
      })
  },

  // Перенос информации о продукте
  bridgeInfo({ commit }, info) {
    commit("set", ["info", info]);
  },

  // Сохранить информацию о продукте
  async saveProductInfo({ state }, {info, productId}) {
    await this.$api.$put(`/api/stock/product/update/${productId}`, info)
      .then(({err}) => {
        if (!err) this.$toast.success("Продукт обновлен");
      })
  }
}
