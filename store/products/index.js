export const state = () => ({
  // Список продуктов
  list: [],
})

export const getters = {
  // Список продуктов
  getList: state => state.list,
}

export const mutations = {
  set(state, [namespace, value]) {
    state[namespace] = value;
  }
}

export const actions = {

  // Поиск по продуктам
  searchProducts({ commit }) {

  }
}
