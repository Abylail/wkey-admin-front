export const state = () => ({
  // Информация о категории
  info: null,
})

export const getters = {
  // Инормация о категории
  getInfo: state => state.info || {},
}

export const mutations = {
  set(state, [namespace, value]) {
    state[namespace] = value;
  }
}

export const actions = {

  // Запросить данные по 1 категории
  async fetchCategory({ commit }, categoryCode) {
    await this.$api.$get(`/api/stock/category/get/${categoryCode}`)
      .then(({err, body}) => {
        if (!err) commit("set", ["info", body]);
      })
  },

  // Сохранить информацию по категории -> возвращает код категории
  addCategoryInfo({ commit }, info) {
    return new Promise(resolve => {
      this.$api.$post("/api/stock/category/add", info)
        .then(({err, body}) => {
          if (!err) resolve(body);
          else resolve(null);
        })
    })
  },

  // Сохранить информацию по категории -> возвращает успешно ли
  updateCategoryInfo({ commit }, info) {
    return new Promise(resolve => {
      this.$api.$put(`/api/stock/category/update/${info.code}`, info)
        .then(({err}) => {
          resolve(!err);
        })
    })
  },

  // Загрузить файл -> возвращает путь к файлу
  imageUpload({ commit }, {code, image}) {
    return new Promise(resolve => {
      this.$api.$put(`/api/stock/category/upload/${code}`, {image})
        .then(({err, body}) => {
          if (!err) resolve(body);
          else resolve(null);
        })
    })
  },

  // Удалить категорию -> возвращает успешно ли
  deleteCategory({}, categoryCode) {
    return new Promise(resolve => {
      this.$api.$delete(`/api/stock/category/delete/${categoryCode}`)
        .then(({err}) => {
          resolve(!err);
        })
    })
  }
}
