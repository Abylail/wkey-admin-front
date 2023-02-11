<template>
  <div class="product-info">

    <v-btn small @click="$goBack('/products')"><v-icon>mdi-arrow-left</v-icon>В продукты</v-btn>

    <div class="product-info__content">

      <div class="product-info__detail">
        <div class="product-info__detail-title">Название:</div>
        <div>{{ info.title }}</div>
      </div>

      <div class="product-info__columns">

        <div class="product-info__detail">
          <div class="product-info__detail-title">Цена:</div>
          <div>{{ info.price }}</div>
        </div>

        <div class="product-info__detail">
          <div class="product-info__detail-title">Артикул:</div>
          <div>{{ info.vendor_code }}</div>
        </div>

      </div>

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

  &__content {
    margin-top: 10px;
  }

  &__detail {
    margin-top: 10px;
  }

  &__detail-title {
    color: #575757;
    font-size: 14px;
  }

  &__columns {

     & > * {
       display: inline-block;
       margin-right: 10px;
     }
  }

}
</style>
