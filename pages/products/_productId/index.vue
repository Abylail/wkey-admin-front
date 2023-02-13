<template>
  <div class="product-info">

    <v-btn small @click="$goBack('/products')"><v-icon>mdi-arrow-left</v-icon>В продукты</v-btn>

    <div class="product-info__content">

      <detail title="Название" block>{{ info.title }}</detail>

      <detail title="Бренд" block>{{ info.brand_title }}</detail>

      <!-- Поля в ряд -->
      <div class="product-info__columns">
        <detail title="Цена">{{ info.price }}тг</detail>
        <detail title="Артикул">{{ info.vendor_code }}</detail>
        <detail title="Колличетсво">{{ info.count }}</detail>
      </div>

      <v-divider class="mt-4 mb-4"/>

      <div :class="{'product-info__double-column': !$isMobile}">
        <v-textarea
          v-model="info.description_ru"
          label="Описание на русском"
          rows="2"
          outlined dense no-resize auto-grow
        />
        <v-textarea
          v-model="info.description_kz"
          label="Описание на казахском"
          rows="2"
          outlined dense no-resize auto-grow
        />
      </div>

    </div>

  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import Detail from "~/components/common/details/detail";

export default {
  name: "index",
  components: {Detail},
  data: () => ({
    isLoading: true,

    info: {},
  }),
  computed: {
    ...mapGetters({
      _info: "products/item/getInfo",
    }),

    // id продукта
    productId() {
      return parseInt(this.$route.params.productId);
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
      this.info = JSON.parse(JSON.stringify(this._info))
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

  &__columns {

     & > * {
       display: inline-block;
       margin-right: 10px;
     }
  }

  &__double-column {
    display: grid;
    grid-column-gap: 16px;
    grid-template-columns: 1fr 1fr;
    max-width: 1000px;
  }

}
</style>
