export const state = () => ({
  // Информация пользователя
  userInfo: null,

})

export const getters = {
  // Информация пользователя
  getUserInfo: state => state.userInfo || {},

  // Роль пользователя
  getUserRole: state => state.userInfo?.role || null,

  // Токен пользователя
  getUserToken: state => state.userInfo?.token || null,

  // Авторизован ли пользователь
  isAuth: state => !!state.userInfo,
}

export const mutations = {
  set(state, [namespace, value]) {
    state[namespace] = value;
  }
}

export const actions = {

  // Вход через username, password (возвращает авторизован ли пользователь)
  login({ commit }, {username, password}) {
    return new Promise(resolve => {
      this.$api.$post("/admin-api/auth/login/credentials", {username, password})
        .then(({err, body}) => {
          if (!err) {
            commit("set", ["userInfo", body]);
            this.$cookies.set("token", body.token, {path: "/"});
          }
          resolve(!err);
        })
    })
  },

  // Вход через токен (возвращает авторизован ли пользователь)
  tokenLogin({ commit, state, getters, dispatch }, token = getters.getUserToken) {
    return new Promise(resolve => {
      if (getters.isAuth) resolve(true);
      const myToken = token || this.$cookies.get("token");
      if (!myToken) return resolve(false);
      this.$api.$post("/admin-api/auth/login/token", {token: myToken})
        .then(({err, body}) => {
          if (err) dispatch("logout");
          if (!err) {
            commit("set", ["userInfo", body]);
            this.$cookies.set("token", body.token, {path: "/"});
          }
          resolve(!err);
        })
    })
  },

  // Выйти
  logout({ commit }) {
    commit("set", ["userInfo", null]);
    this.$cookies.remove("token");
  }

}
