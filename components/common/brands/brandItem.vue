<template>
  <v-card class="brand-item" :class="[{'brand-item--mobile': $isMobile}]" link @click="goBrand()">
    <div class="brand-item__image" v-if="imageUrl" :style="{backgroundImage: `url(${imageUrl})`}"/>
    <div class="brand-item__info">
      <div class="brand-item__title">{{ info.title }}</div>
    </div>
  </v-card>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "brandItem",
  props: {
    info: {
      type: Object,
      default: () => ({}) // id, title, image
    }
  },
  computed: {
    imageUrl() {
      if (!this.info.image) return null;
      return process.env.CDN_URL + this.info.image;
    },
  },
  methods: {
    ...mapActions({
      bridgeInfo: "brands/item/bridgeInfo",
    }),

    goBrand() {
      this.bridgeInfo(this.info);
      this.$router.push(`/brands/${this.info.id}`);
    }
  }
}
</script>

<style lang="scss" scoped>
.brand-item {
  display: flex;
  flex-direction: column;
  padding: 8px;
  width: 150px;
  margin-right: 16px;
  margin-bottom: 16px;

  &__image {
    background-size: contain;
    background-position: center;
    width: 100%;
    min-height: 80px;
    border-radius: 5px;
  }

  &__title {
    padding: 4px;
    font-size: 14px;
    line-height: 16px;
    text-align: center;
  }
}
</style>
