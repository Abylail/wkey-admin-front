export default async function ({ store, redirect, route }) {
  await store.dispatch("auth/tokenLogin");
  if (!store.getters["auth/isAuth"]) {
    redirect(`/auth/login?redirect=${route.fullPath}`);
  }
}
