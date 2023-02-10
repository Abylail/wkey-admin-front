<template>
  <v-list-item two-line :dark="dark">
    <v-list-item-content>
      <v-list-item-title>Менеджер wkey</v-list-item-title>
      <v-list-item-subtitle>Базарбаев Абылай</v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  name: "userCard",
  props: {
    dark: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>

</style>
