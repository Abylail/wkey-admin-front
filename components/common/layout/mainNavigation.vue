<template>
  <v-navigation-drawer :value="showNav" app :permanent="!$isMobile" width="200" clipped @input="setShowNav($event)">
    <v-list nav dense>

      <user-card v-if="$isMobile"/>
      <v-divider v-if="$isMobile" class="mb-3"/>

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
import UserCard from "~/components/common/layout/userCard.vue";

export default {
  name: "mainNavigation",
  components: {UserCard},
  props: {

    // Показать ? (только для телефона)
    showNav: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    routes: [
      { title: "Продукты", description: "" , icon: "",  route: "/products" },
      { title: "Клиенты", description: "" , icon: "",  route: "/clients" },
    ]
  }),
  methods: {
    // Задать показывать ли
    setShowNav(show) {
      this.$emit("update:showNav", show);
    }
  }
}
</script>

<style scoped>

</style>
