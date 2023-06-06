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
    await this.$api.$get(`/adminpanel/admin-api/stock/product/get/${productId}`)
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
    await this.$api.$put(`/adminpanel/admin-api/stock/product/update/${productId}`, info)
      .then(({err}) => {
        if (!err) this.$toast.success("Продукт обновлен");
      })
  },

  // Загрузить фото
  async imageUpload({ }, {productId, name, buffer, position}) {
    await this.$api.$put(`/adminpanel/admin-api/stock/product/upload/${productId}`, {images: [{position, image: {name, buffer}}]})
      .then(({err}) => {
        if (err) this.$toast.error("Ошибка загрузки фото");
      })
  },
}
