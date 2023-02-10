export const state = () => ({
  // Список категорий
  list: [],
})

export const getters = {
  // Список категорий
  getList: state => state.list,
}

export const mutations = {
  set(state,[namespace, value]) {
    state[namespace] = value;
  }
}

export const actions = {
  // Получить список категорий
  async fetchCategories({ commit, state }) {
    if (state.list.length) return;
    await this.$api.$get("/api/stock/category/get")
      .then(({err, body}) => {
        if (!err) commit("set", ["list", body]);
      })
  }
}
