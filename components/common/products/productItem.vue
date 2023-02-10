<template>
  <v-card class="product-item">

  </v-card>
</template>

<script>
export default {
  name: "productItem",
  props: {
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style lang="scss" scoped>
.product-item {

}
</style>
