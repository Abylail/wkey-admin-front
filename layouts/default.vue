<template>
  <v-app dark>
    <main-header :show-nav.sync="showNav"/>

    <main-navigation :show-nav.sync="showNav"/>

    <v-main app>
      <Nuxt/>
    </v-main>

  </v-app>
</template>

<script>
import MainHeader from "~/components/common/layout/mainHeader.vue";
import MainNavigation from "~/components/common/layout/mainNavigation.vue";

export default {
  name: 'DefaultLayout',
  middleware: "auth",
  components: {MainNavigation, MainHeader},
  data: () => ({
    // Показать навигацию
    showNav: false,
  }),
}
</script>
