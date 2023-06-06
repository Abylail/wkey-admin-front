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
    await this.$api.$get(`/adminpanel/admin-api/stock/category/${categoryCode}/sub/get/${subcategoryCode}`)
      .then(({err, body}) => {
        if (!err) commit("set", ["info", body]);
      })
  },

  // Сохранить информацию по категории -> возвращает код категории
  addCategoryInfo({ commit }, {categoryCode, info}) {
    return new Promise(resolve => {
      this.$api.$post(`/adminpanel/admin-api/stock/category/${categoryCode}/sub/add`, info)
        .then(({err, body}) => {
          if (!err) resolve(body);
          else resolve(null);
        })
    })
  },

  // Сохранить информацию по категории -> возвращает успешно ли
  updateCategoryInfo({ commit }, {categoryCode, info}) {
    return new Promise(resolve => {
      this.$api.$put(`/adminpanel/admin-api/stock/category/${categoryCode}/sub/update/${info.code}`, info)
        .then(({err}) => {
          resolve(!err);
        })
    })
  },

  // Загрузить файл -> возвращает путь к файлу
  imageUpload({ commit }, {categoryCode, subcategoryCode, image}) {
    return new Promise(resolve => {
      this.$api.$put(`/adminpanel/admin-api/stock/category/${categoryCode}/sub/upload/${subcategoryCode}`, {image})
        .then(({err, body}) => {
          if (!err) resolve(body);
          else resolve(null);
        })
    })
  },

  // Удалить категорию -> возвращает успешно ли
  deleteSubcategory({}, {categoryCode, subcategoryCode}) {
    return new Promise(resolve => {
      this.$api.$delete(`/adminpanel/admin-api/stock/category/${categoryCode}/sub/delete/${subcategoryCode}`)
        .then(({err}) => {
          resolve(!err);
        })
    })
  },

  // Привязать продукты к подкатегории
  bindProducts({}, {categoryCode, subcategoryCode, productIds}) {
    return new Promise(resolve => {
      this.$api.$post(`/adminpanel/admin-api/stock/category/${categoryCode}/sub/bind/${subcategoryCode}`, {list: productIds})
        .then(({err}) => {
          resolve(!err);
        })
    })
  },

  // Отвязать продукты к подкатегории
  unbindProducts({}, {categoryCode, subcategoryCode, productId}) {
    return new Promise(resolve => {
      this.$api.$post(`/adminpanel/admin-api/stock/category/${categoryCode}/sub/unbind/${subcategoryCode}/product/${productId}`)
        .then(({err}) => {
          resolve(!err);
        })
    })
  },
}
