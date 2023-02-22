export const state = () => ({
  // Список брендах
  list: []
})

export const getters = {
  // Список брендах
  getList: state => state.list,
}

export const mutations = {
  set(state, [namespace, value]) {
    state[namespace] = value;
  }
}

export const actions = {
  // Запросить список брендов
  async fetchList({ commit }) {
    await this.$api.$get("/admin-api/stock/brand/get")
      .then(({err, body}) => {
        if (!err) commit("set", ["list", body]);
      })
  }
}
