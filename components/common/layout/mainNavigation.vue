<template>
  <v-navigation-drawer app permanent clipped>
    <v-list nav dense>

      <v-list-item v-for="item in routes" :key="item.route" link :to="item.route">
        <v-list-item-icon v-if="item.icon"><v-icon>{{ item.icon }}</v-icon></v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "mainNavigation",
  data: () => ({
    routes: [
      { title: "Продукты", description: "" , icon: "",  route: "/products" },
      { title: "Клиенты", description: "" , icon: "",  route: "/clients" },
    ]
  })
}
</script>

<style scoped>

</style>
