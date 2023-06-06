export const state = () => ({
  // Список проомакций
  list: [],
})

export const getters = {
  // Список проомакций
  getList: state => state.list,
}

export const mutations = {
  set(state, [namespace, value]) {
    state[namespace] = value;
  }
}

export const actions = {

  // Запросить промоакции
  async fetchList({ commit }) {
    await this.$api.$get("/adminpanel/admin-api/stock/promotion/get")
      .then(({err, body}) => {
        if (!err) {
          commit("set", ["list", body]);
        }
      })
  }
}
