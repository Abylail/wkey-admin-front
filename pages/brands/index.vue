<template>
  <div class="brands">

    <!-- Поиск -->
    <v-card class="brands__card">
      <v-card-text>
        <v-text-field label="Поиск по названию" outlined dense hide-details/>
        <v-btn class="brands__search-submit" dark small>Поиск</v-btn>
      </v-card-text>
    </v-card>

    <div class="brands__result-list brands__card">
      <brand-item
        v-for="brand in brands" :key="brand.id"
        :info="brand"
      />
    </div>

  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import BrandItem from "~/components/common/brands/brandItem";

export default {
  name: "index",
  components: {BrandItem},
  data: () => ({
    isLoading: true,
  }),
  computed: {
    ...mapGetters({
      brands: "brands/getList",
    })
  },
  methods: {
    ...mapActions({
      _fetchBrands: "brands/fetchList",
    }),

    // Запросить список брендов
    async fetchBrands() {
      this.isLoading = true;
      await this._fetchBrands();
      this.isLoading = false;
    }
  },
  mounted() {
    this.fetchBrands();
  }
}
</script>

<style lang="scss" scoped>
.brands {

  &__card {
    width: calc(100% - 32px);
    margin: 16px;
  }

  &__search-submit {
    margin-top: 8px;
    background-color: $color_-purple-dark !important;
  }

  &__result-list {
    display: flex;
    flex-wrap: wrap;
  }

}
</style>
