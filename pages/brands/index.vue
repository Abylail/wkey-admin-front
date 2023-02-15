<template>
  <div class="brands">

    <!-- Поиск -->
    <v-card class="brands__card">
      <v-card-text>
        <v-text-field label="Поиск по названию" v-model="searchText" outlined dense hide-details clearable/>
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

    searchText: null,
  }),
  computed: {
    ...mapGetters({
      _brands: "brands/getList",
    }),

    brands() {
      if (!this.searchText) return this._brands;
      return this._brands.filter(({title}) => title.toLowerCase().includes(this.searchText.toLowerCase()));
    }
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
