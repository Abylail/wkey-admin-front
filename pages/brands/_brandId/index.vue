<template>
  <div class="brand-info">

    <v-btn small @click="$goBack('/brands')"><v-icon>mdi-arrow-left</v-icon>В бренды</v-btn>

    <div class="brand-info__content">
      <detail title="Название">{{ info.title }}</detail>
      <base-image-upload :value="imageUrl" @input="inputFile($event)"/>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import Detail from "~/components/common/details/detail";
import BaseImageUpload from "~/components/base/BaseImageUpload";

export default {
  name: "index",
  components: {BaseImageUpload, Detail},
  data: () => ({
    isLoading: true,

    info: {},
  }),
  computed: {
    ...mapGetters({
      _info: "brands/item/getInfo",
    }),

    // Ссылка на картинку
    imageUrl() {
      if (!this.info.image) return null;
      return process.env.CDN_URL + this.info.image;
    },

    // id бренда
    brandId() {
      return parseInt(this.$route.params.brandId);
    },

  },
  methods: {
    ...mapActions({
      _fetchInfo: "brands/item/fetchBrandInfo",
      _uploadImage: "brands/item/uploadImage",
    }),

    // Заросить инфо бренда
    async fetchInfo(hard = false) {
      this.isLoading = true;
      await this._fetchInfo({brandId: this.brandId, hard});
      this.info = JSON.parse(JSON.stringify(this._info));
      this.isLoading = false;
    },

    // Ввод файла
    async inputFile(file) {
      this.isLoading = true;
      await this._uploadImage({brandId: this.brandId, file});
      await this.fetchInfo(true);
      this.isLoading = false;
    }
  },
  mounted() {
    this.fetchInfo(false);
  }
}
</script>

<style lang="scss" scoped>
.brand-info {
  padding: 16px;

}
</style>
