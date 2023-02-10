<template>
  <v-app-bar class="main-header" app clipped-left>

    <v-app-bar-nav-icon dark v-if="$isMobile" @click="showNavHandle()"/>

    <v-toolbar-title><img class="main-header__logo" :src="require('@/assets/images/logo-white.svg')"></v-toolbar-title>

    <v-spacer/>

    <div class="main-header__user-info">
      <user-card v-if="!$isMobile" dark/>
    </div>

  </v-app-bar>
</template>

<script>
import UserCard from "~/components/common/layout/userCard.vue";

export default {
  name: "mainHeader",
  components: {UserCard},
  props: {

    // Показать ? (только для телефона)
    showNav: {
      type: Boolean,
      default: false
    }
  },
  methods: {

    // Показать навигацию
    showNavHandle() {
      this.$emit("update:showNav", !this.showNav);
    }
  }
}
</script>

<style lang="scss" scoped>
.main-header {
  background-color: $color--purple-light !important;
  box-shadow: none !important;

  &__logo {
    display: block;
    height: 20px;
    margin: auto 0;
  }

  &__user-info {
    text-align: right;
  }
}
</style>
