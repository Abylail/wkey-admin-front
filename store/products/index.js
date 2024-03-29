export const state = () => ({
  // Список продуктов
  list: [],

  // Колличество
  pageCount: 0,
})

export const getters = {
  // Список продуктов
  getList: state => state.list,

  // Колличество
  getPageCount: state => state.pageCount,
}

export const mutations = {
  set(state, [namespace, value]) {
    state[namespace] = value;
  }
}

export const actions = {

  // Поиск по продуктам
  async searchProducts({ commit }, {page, query}) {
    await this.$api.$get("/adminpanel/admin-api/stock/product/get", {params: {page, query}})
      .then(({err, body}) => {
        if (!err) {
          commit("set", ["list", body.list]);
          commit("set", ["pageCount", body.page_count]);
        }
      })
  }
}
