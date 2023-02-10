<template>
  <div class="clients">

    <v-card class="clients__card">
      <v-card-text>
        <v-text-field label="Поиск по номеру" outlined dense hide-details/>
        <v-btn class="clients__search-submit" dark>Поиск</v-btn>
      </v-card-text>
    </v-card>

  </div>
</template>

<script>
export default {
  name: "index"
}
</script>

<style lang="scss" scoped>
.clients {

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
