export const state = () => ({
  // Информация пользователя
  userInfo: {},

})

export const getters = {
  // Информация пользователя
  getUserInfo: state => state.userInfo || {},

  // Роль пользователя
  getUserRole: state => state.userInfo?.role || null,

  // Авторизован ли пользователь
  isAuth: state => !!state.userInfo,
}

export const mutations = {
  set(state, [namespace, value]) {
    state[namespace] = value;
  }
}

export const actions = {

  // Вход через username, password
  login({ commit }, {username, password}) {
    return new Promise(resolve => {
      commit("set", ["userInfo", {}]);
      resolve(true);
    })
  },

  // Вход через токен
  tokenLogin({ commit, state }, token) {

  }

}
