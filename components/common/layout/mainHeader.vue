<template>
  <v-app-bar class="main-header" app clipped-left>

    <v-toolbar-title><img class="main-header__logo" :src="require('@/assets/images/logo-white.svg')"></v-toolbar-title>

    <v-spacer/>

    <div class="main-header__user-info">
      <v-list-item two-line dark>
        <v-list-item-content>
          <v-list-item-title>Менеджер wkey</v-list-item-title>
          <v-list-item-subtitle>Базарбаев Абылай</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </div>

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
    display: block;
    height: 25px;
    margin: auto 0;
  }

  &__user-info {
    text-align: right;
  }
}
</style>
