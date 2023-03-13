<template>
  <v-card class="promotion-item" :class="{'promotion-item--mobile': $isMobile}" link @click="clickHandle()">
    <div class="promotion-item__image" :style="{backgroundImage: `url(${imageUrl})`}"></div>
    <div class="promotion-item__info">
      <div class="promotion-item__title">{{ info.title_ru || info.title_kz }}</div>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "promotionItem",
  props: {
    info: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    // Ссылка на картинку
    imageUrl() {
      return process.env.CDN_URL + (this.info.image_ru || this.info.image_kz)
    }
  },
  methods: {
    // Перейти в редактирование
    clickHandle() {
      this.$emit("click");
    }
  }
}
</script>

<style lang="scss" scoped>
.promotion-item {
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

  &__image {
    $image-size: 60px;
    background: $color--gray-light;
    background-size: contain;
    height: $image-size;
    width: $image-size;
    min-width: $image-size;
    margin-right: 8px;
    border-radius: 5px;
  }

  &__description {
    color: $color--gray;
    font-size: 14px;
    line-height: 16px;
  }

}
</style>
