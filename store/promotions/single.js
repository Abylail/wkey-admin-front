
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
    await this.$api.$get(`/adminpanel/admin-api/stock/promotion/get/${code}`)
      .then(({err, body}) => {
        if (!err) {
          commit("set", ["info", body]);
        }
      })
  },

  // Создать (возвращает код акции)
  createInfo({ }, info) {
    return new Promise(resolve => {
      this.$api.$post(`/adminpanel/admin-api/stock/promotion/create`, info)
        .then(({err, body}) => {
          if (!err) {
            this.$toast.success("Промоакция создана");
            return resolve(body);
          }
          resolve(null);
        })
      })
  },

  // Загрузить фото
  async upload({}, {code, lang = "ru", image = {}}) {
    await this.$api.$put(`/adminpanel/admin-api/stock/promotion/upload`, {code, lang, image})
  },

  // Обновить
  async updateInfo({ }, info) {
    await this.$api.$put(`/adminpanel/admin-api/stock/promotion/update`, info)
      .then(({err, body}) => {
        if (!err) {
          this.$toast.success("Промоакция обновленна")
        }
      })
  },

  // Удалить (возвращает успешно ли)
  delete({}, code) {
    return new Promise(resolve => {
      this.$api.$delete(`/adminpanel/admin-api/stock/promotion/delete/${code}`)
        .then(({err, body}) => {
          resolve(!err);
        })
    })
  },
}
