<template>
  <div class="products">

    <!-- Поиск -->
    <v-card class="products__card" @keyup.enter="searchProducts()">
      <v-card-text>
        <v-text-field label="Поиск по названию" v-model="filter.query" outlined dense hide-details clearable/>
        <v-btn class="products__search-submit" dark small @click="searchProducts()">Поиск</v-btn>
      </v-card-text>
    </v-card>

    <v-pagination
      class="products__pagination"
      v-if="count"
      :value="page"
      total-visible="10"
      :length="count"
      @input="selectPage($event)"
    />

    <!-- Список -->
    <div class="products__result-list products__card">
      <product-item
        v-for="product in products" :key="product.id"
        :info="product"
      />
    </div>

    <v-pagination
      class="products__pagination"
      v-if="count"
      :value="page"
      total-visible="10"
      :length="count"
      @input="selectPage($event)"
    />

  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import ProductItem from "~/components/common/products/productItem";

export default {
  name: "index",
  components: {ProductItem},
  data: () => ({
    isLoading: true,

    page: 1,

    filter: {
      query: "", // Название
    },
  }),
  computed: {
    ...mapGetters({
      products: "products/getList",
      count: "products/getPageCount",
    }),
  },
  methods: {
    ...mapActions({
      fetchCategories: "categories/fetchCategories",
      _searchProducts: "products/searchProducts",
    }),

    // Поиск продуктов
    async searchProducts(page = 1) {
      this.isLoading = true;
      this.page = page;
      this.$router.replace({query: {...this.filter, page}});
      await this._searchProducts({ page: this.page, ...this.filter });
      this.isLoading = false;
    },

    // Выбор страницы
    selectPage(page) {
      this.$router.replace({query: {...this.$route.query, page}});
      this.searchProducts(page);
    },

    // Инициализировать данные поиска
    initSearchData() {
      if (this.$route.query.page) this.page = parseInt(this.$route.query.page);
      if (this.$route.query.query) this.filter.query = this.$route.query.query;
    },
  },
  mounted() {
    this.initSearchData();
    this.fetchCategories();
    this.searchProducts(this.page);
  }
}
</script>

<style lang="scss" scoped>
.products {

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
