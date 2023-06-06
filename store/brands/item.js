export const state = () => ({
  // Информация о бренде
  info: null
})

export const getters = {
  // Информация о бренде
  getInfo: state => state.info || {},
}

export const mutations = {
  set(state, [namespace, value]) {
    state[namespace] = value;
  }
}

export const actions = {
  // Получить информацию о бренде
  async fetchBrandInfo({ state, commit }, {brandId, hard = false}) {
    if (!hard && state.info?.id === brandId) return;
    await this.$api.$get(`/adminpanel/admin-api/stock/brand/get/${brandId}`)
      .then(({err, body}) => {
        if (!err) commit("set", ["info", body]);
      })
  },

  // Перенос информации о бренде
  bridgeInfo({ commit }, info) {
    commit("set", ["info", info]);
  },

  // Залить фотку бренда (file -> {name, buffer<base64>}) -> возвращает успешно ли
  async uploadImage({}, {brandId, file}) {
    return new Promise(resolve => {
    this.$api.$put(`/adminpanel/admin-api/stock/brand/upload/${brandId}`, {image: file})
      .then(({err, body}) => {
        resolve(!err);
      })
    })
  },
}
