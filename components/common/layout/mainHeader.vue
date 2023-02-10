<template>
  <v-app-bar class="main-header" app clipped-left>

    <v-toolbar-title><img class="main-header__logo" :src="require('@/assets/images/logo-white.svg')"></v-toolbar-title>

    <v-spacer/>


  </v-app-bar>
</template>

<script>
export default {
  name: "mainHeader"
}
</script>

<style lang="scss" scoped>
.main-header {
  background-color: $color--purple-light !important;
  box-shadow: none !important;

  &__logo {
    height: 25px;
    margin: auto 0;
  }
}
</style>
