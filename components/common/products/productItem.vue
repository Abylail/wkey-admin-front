<template>
  <v-card class="product-item" :class="[{'product-item--mobile': $isMobile}, {'product-item--empty': !info.count}]" link @click="goProduct()">
    <div class="product-item__image"/>
    <div class="product-item__info">
      <div class="product-item__title">{{ info.title }}</div>
      <div class="product-item__subtitle">{{ info.category_name }}</div>
      <div class="product-item__price-count">
        <span class="product-item__count">{{ info.count }}шт</span>
        <span class="product-item__price" v-if="info.price">{{ info.price }}тг</span>
      </div>
    </div>
  </v-card>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "productItem",
  props: {
    info: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    ...mapActions({
      bridgeInfo: "products/item/bridgeInfo",
    }),

    // Перейти в продукт
    goProduct() {
      this.bridgeInfo(this.info);
      this.$router.push(`/products/${this.info.id}`);
    }
  }
}
</script>

<style lang="scss" scoped>
.product-item {
  display: flex;
  flex-direction: row;
  padding: 8px;
  width: 100%;
  max-width: 300px;
  margin-right: 16px;
  margin-bottom: 16px;

  &--mobile {
    max-width: none;
    margin-right: 0;
  }

  &--empty {
    background: #dadada;
  }

  &__image {
    $image-size: 60px;
    background: #c4c4c4;
    height: $image-size;
    width: $image-size;
    min-width: $image-size;
    margin-right: 8px;
    border-radius: 5px;
  }

  &__title {
    font-size: 14px;
    line-height: 16px;
  }

  &__subtitle {
    font-size: 12px;
    line-height: 14px;
    color: gray;
  }

  &__price-count {
    margin-top: 5px;
    font-size: 12px;
    line-height: 14px;
  }


}
</style>
