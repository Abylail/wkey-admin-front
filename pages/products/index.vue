<template>
  <div class="products">

    <v-card class="products__card">
      <v-card-text>
        <v-text-field label="Поиск по названию" outlined dense hide-details/>
        <v-btn class="products__search-submit" dark>Поиск</v-btn>
      </v-card-text>
    </v-card>

    <div class="products__result products__card">

    </div>

  </div>
</template>

<script>
export default {
  name: "index"
}
</script>

<style lang="scss" scoped>
.products {

  &__card {
    width: calc(100% - 32px);
    margin: 16px;
  }

  &__search-submit {
    margin-top: 16px;
    background-color: $color_-purple-dark !important;
  }

}
</style>
