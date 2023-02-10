export const state = () => ({
  // Список клиентов
  list: [],
})

export const getters = {
  // Список клиентов
  getList: state => state.list,
}

export const mutations = {
  set(state, [namespace, value]) {
    state[namespace] = value;
  }
}

export const actions = {

  // Поиск по продуктам
  searchClients({ commit }) {

  }
}
