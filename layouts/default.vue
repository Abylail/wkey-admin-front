<template>
  <v-app dark>
    <main-header/>

    <main-navigation/>

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
}
</script>
