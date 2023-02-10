<template>
  <div class="login-page">

    <v-card class="login-page__card" dark @keyup.enter="submitHandle()">
      <v-card-title>Вход</v-card-title>

      <v-card-text>
        <v-text-field
          label="Логин"
          v-model="form.username"
          outlined dense filled
        />
        <v-text-field
          label="Пароль"
          v-model="form.password"
          type="password"
          outlined dense filled
        />

        <v-btn class="login-page__submit" :disabled="!canSubmit" :loading="isLoading" block @click="submitHandle()">Войти</v-btn>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "login",
  layout: "empty",
  data: () => ({
    isLoading: false,

    form: {
      username: null,
      password: null,
    }
  }),
  computed: {
    // Можно ли пробовать войти
    canSubmit() {
      return this.form.username && this.form.password;
    }
  },
  methods: {
    ...mapActions({
      _submit: "auth/login",
    }),

    // Войти
    async submitHandle() {
      if (!this.canSubmit) return;
      this.isLoading = true;
      const isSuccess = await this._submit(this.form);
      if (isSuccess) this.$router.push(this.$route.query.redirect || "/")
      this.isLoading = false;
    }
  }
}
</script>

<style lang="scss" scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;

  &__card {
    margin: auto;
    padding: 20px;
    width: 90%;
    max-width: 350px;
    background: url("~assets/images/backgroud-dark.svg") !important;
  }

  &__submit {
    background-color: $color--purple-dark !important;
  }

}
</style>
