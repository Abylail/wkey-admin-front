export const state = () => ({
  // Промоакция
  info: null,
})

export const getters = {
  // Промоакция
  getInfo: state => state.info,
}

export const mutations = {
  set(state, [namespace, value]) {
    state[namespace] = value;
  }
}

export const actions = {
  // Запросить информацию
  async fetchInfo({ commit }, code) {
    await this.$api.$get(`/admin-api/stock/promotion/get/${code}`)
      .then(({err, body}) => {
        if (!err) {
          commit("set", ["info", body]);
        }
      })
  },

  // Создать
  async createInfo({ }, info) {
    await this.$api.$post(`/admin-api/stock/promotion/create`, info)
      .then(({err, body}) => {
        if (!err) {
          this.$toast.success("Промоакция создана")
        }
      })
  },

  // Обновить
  async updateInfo({ }, info) {
    await this.$api.$put(`/admin-api/stock/promotion/update`, info)
      .then(({err, body}) => {
        if (!err) {
          this.$toast.success("Промоакция обновленна")
        }
      })
  },
}
