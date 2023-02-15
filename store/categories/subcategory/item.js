export const state = () => ({
  // Информация о подкатегории
  info: null,
})

export const getters = {
  // Инормация о подкатегории
  getInfo: state => state.info || {},
}

export const mutations = {
  set(state, [namespace, value]) {
    state[namespace] = value;
  }
}

export const actions = {

  // Запросить данные по 1 категории
  async fetchSubcategory({ commit }, {categoryCode, subcategoryCode}) {
    await this.$api.$get(`/api/stock/category/${categoryCode}/sub/get/${subcategoryCode}`)
      .then(({err, body}) => {
        if (!err) commit("set", ["info", body]);
      })
  },

  // Сохранить информацию по категории -> возвращает код категории
  addCategoryInfo({ commit }, {categoryCode, info}) {
    return new Promise(resolve => {
      this.$api.$post(`/api/stock/category/${categoryCode}/sub/add`, info)
        .then(({err, body}) => {
          if (!err) resolve(body);
          else resolve(null);
        })
    })
  },

  // Сохранить информацию по категории -> возвращает успешно ли
  updateCategoryInfo({ commit }, {categoryCode, info}) {
    return new Promise(resolve => {
      this.$api.$put(`/api/stock/category/${categoryCode}/sub/update/${info.code}`, info)
        .then(({err}) => {
          resolve(!err);
        })
    })
  },

  // Загрузить файл -> возвращает путь к файлу
  imageUpload({ commit }, {categoryCode, subcategoryCode, image}) {
    return new Promise(resolve => {
      this.$api.$put(`/api/stock/category/${categoryCode}/sub/upload/${subcategoryCode}`, {image})
        .then(({err, body}) => {
          if (!err) resolve(body);
          else resolve(null);
        })
    })
  }
}
