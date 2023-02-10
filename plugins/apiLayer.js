import moment from "moment";
// Создание отлавливателя ошибок
const createCatcher = (store, $toast) => {
  return (error) => {
    // Коды допустимых ошибок
    if ([404].includes(error.response.status)) return;
    const errorResponse = error.response;
    if (!errorResponse) return;
    const message = errorResponse.data?.message;
    $toast.error(`${message} \n (${moment().format("DD.MM.yyyy hh:mm")})`);
  }
}

// Creating config
const createConfig = (conf = {}, store) => {
  let nextConfig = {...conf};
  if (!nextConfig.headers) nextConfig.headers = {};

  // console.log(store.getters["services/auth/getUsername"]);debugger
  // if (store.getters["services/auth/getUsername"]) nextConfig.headers.login = store.getters["services/auth/getUsername"]

  return nextConfig;
}

// GET
const createGet = (axios, store, toast) => {
  return function (url, config = {}) {
    const useConfig = createConfig(config, store);
    const catcher = createCatcher(store, toast);

    return new Promise((resolve, reject) => {
      axios.$get(url, useConfig)
        .then(resolve)
        .catch((err) => {catcher(err);resolve({ err: err.response })})
    });
  }
}

// POST
const createPost = (axios, store, toast) => {
  return function (url, body, config = {}) {
    const useConfig = createConfig(config, store);
    const catcher = createCatcher(store, toast);

    return new Promise((resolve, reject) => {
      axios.$post(url, body, useConfig)
        .then(resolve)
        .catch((err) => {catcher(err);resolve({ err: err.response })})
    });
  }
}

// PUT
const createPut = (axios, store, toast) => {
  return function (url, body, config = {}) {
    const useConfig = createConfig(config, store);
    const catcher = createCatcher(store, toast);

    return new Promise((resolve, reject) => {
      axios.$put(url, body, useConfig)
        .then(resolve)
        .catch((err) => {catcher(err);resolve({ err: err.response })})
    });
  }
}

// DELETE
const createDelete = (axios, store, toast) => {
  return function (url, config = {}) {
    const useConfig = createConfig(config, store);
    const catcher = createCatcher(store, toast);

    return new Promise((resolve, reject) => {
      axios.$delete(url, useConfig)
        .then(resolve)
        .catch((err) => {catcher(err);resolve({ err: err.response })})
    });
  }
}


const createApiWrapper = (axios, store, $toast) => ({
  $get: createGet(axios, store, $toast),
  $post: createPost(axios, store, $toast),
  $put: createPut(axios, store, $toast),
  $delete: createDelete(axios, store, $toast),
  cancelController: axios.CancelToken.source, // func
})

export default async function ({ $axios, store, $toast }, inject) {
  inject("api", createApiWrapper($axios, store, $toast));
}
