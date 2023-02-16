<template>
  <v-card class="category-item" :class="{'category-item--mobile': $isMobile}" link @click="clickHandle()">
    <div class="category-item__image" v-if="info.image" :style="{backgroundImage: `url(${imageUrl})`}"/>
    <div class="category-item__info">
      {{ info.title_ru || info.title_ru }}
    </div>
  </v-card>
</template>

<script>
export default {
  name: "item",
  props: {
    info: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    // Путь к картинке
    imageUrl() {
      return process.env.CDN_URL + this.info.image;
    }
  },
  methods: {
    // Перейти в редактирование категории
    clickHandle() {
      this.$emit("go");
      this.$emit("click");
    }
  }
}
</script>

<style lang="scss" scoped>
.category-item {
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

}
</style>
