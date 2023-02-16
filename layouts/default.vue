<template>
  <v-app dark>
    <main-header :show-nav.sync="showNav"/>

    <main-navigation :show-nav.sync="showNav"/>

    <v-main app>
      <Nuxt/>
    </v-main>

    <vue-confirm-dialog/>

  </v-app>
</template>

<script>
import MainHeader from "~/components/common/layout/mainHeader.vue";
import MainNavigation from "~/components/common/layout/mainNavigation.vue";

import {default as VueConfirmDialog} from "vue-confirm-dialog/src/vue-confirm-dialog";

export default {
  name: 'DefaultLayout',
  middleware: "auth",
  components: {MainNavigation, MainHeader, VueConfirmDialog},
  data: () => ({
    // Показать навигацию
    showNav: false,
  }),
}
</script>
