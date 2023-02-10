<template>
  <v-list-item two-line :dark="dark">
    <v-list-item-content>
      <v-list-item-title>{{ userInfo.full_name }}</v-list-item-title>
      <v-list-item-subtitle>{{ userInfo.username }}</v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-action>
      <v-btn title="Выйти" icon :dark="dark" @click="logoutHandle()"><v-icon>mdi-logout</v-icon></v-btn>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "userCard",
  props: {
    dark: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters({
      userInfo: "auth/getUserInfo",
    })
  },
  methods: {
    ...mapActions({
      _logout: "auth/logout",
    }),

    // Выйти
    logoutHandle() {
      this._logout();
      this.$router.push("/auth/login");
    }
  }
}
</script>

<style scoped>

</style>
