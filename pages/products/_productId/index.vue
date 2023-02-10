<template>
  <div class="product-info">

    <v-btn class=""><v-icon>mdi-arrow-left</v-icon>В продукты</v-btn>

    <div class="product-info__content">
      <div class="product-info__title">{{ info }}</div>
    </div>

  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "index",
  data: () => ({
    isLoading: true,
  }),
  computed: {
    ...mapGetters({
      info: "products/item/getInfo",
    }),

    // id продукта
    productId() {
      return this.$route.params.productId;
    }
  },
  methods: {
    ...mapActions({
      _fetchProductInfo: "products/item/fetchProductInfo",
    }),

    // Получить информацию о продукте
    async fetchProductInfo() {
      this.isLoading = true;
      await this._fetchProductInfo(this.productId);
      this.isLoading = false;
    },
  },
  mounted() {
    this.fetchProductInfo();
  }
}
</script>

<style lang="scss" scoped>
.product-info {
  padding: 16px;

}
</style>
