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

      <v-btn color="blue" dark small @click="saveInfoHandle()">Сохранить описание</v-btn>

      <v-divider class="mt-4 mb-4"/>

      <base-image-upload :value="myImages" :max-count="5" @input="imageUpload($event)"/>

      <v-divider class="mt-4 mb-4"/>

      <div class="mb-2">Категории продукта</div>

      <v-chip-group :column="$isMobile">
        <v-chip
          v-for="(category, index) in info.categories" :key="index"
          close close-icon="mdi-delete"
          @click:close="deleteCategoryHandle(category)"
        >{{ category.category_name }} / {{ category.sub_category_name }}</v-chip>
      </v-chip-group>

      <select-category @select="addCategoryHandle($event)"/>

    </div>

  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import Detail from "~/components/common/details/detail";
import SelectCategory from "~/components/common/products/selectCategory";
import BaseImageUpload from "~/components/base/BaseImageUpload";

export default {
  name: "index",
  components: {BaseImageUpload, SelectCategory, Detail},
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
    },

    // Картинки
    myImages() {
      return (this.info.images || []).map(url => process.env.CDN_URL + url);
    }
  },
  methods: {
    ...mapActions({
      _fetchProductInfo: "products/item/fetchProductInfo",
      _saveProductInfo: "products/item/saveProductInfo",
      _addCategory: "categories/subcategory/item/bindProducts",
      _removeCategory: "categories/subcategory/item/unbindProducts",
      _imageUpload: "products/item/imageUpload",
    }),

    // Получить информацию о продукте
    async fetchProductInfo() {
      this.isLoading = true;
      await this._fetchProductInfo(this.productId);
      this.info = JSON.parse(JSON.stringify(this._info))
      this.isLoading = false;
    },

    // Валидация информации
    infoValidate() {
      if (!this.info.description_ru) {
        this.$toast.warning("Введите описание на русском");
        return false;
      }

      if (!this.info.description_kz) {
        this.$toast.warning("Введите описание на казахском");
        return false;
      }

      return true;
    },

    // Добавить категорию (кнопка)
    async addCategoryHandle({ categoryCode, subcategoryCode }) {
      this.isLoading = true;
      const isSuccess = await this._addCategory({categoryCode, subcategoryCode, productIds: [this.productId]});
      if (!isSuccess) this.$toast.error("Ошибка при добавлении категории")
      else {
        this.$toast.success("Категория добавленна");
        await this.fetchProductInfo();
      }
      this.isLoading = false;
    },

    // Убрать категорию (кнопка)
    async deleteCategoryHandle({category_code, sub_category_code}) {
      this.$confirm({
          title: 'Вы уверены что хотите удалить категорию у продукта?',
          button: {yes: 'Удалить', no: 'Отмена'},
          callback: async confirm => {
            if (!confirm) return;
            this.isLoading = true;
            const isSuccess = await this._removeCategory({
              categoryCode: category_code,
              subcategoryCode: sub_category_code,
              productId: this.productId
            });
            if (!isSuccess) this.$toast.error("Ошибка при удалении категории");
            else await this.fetchProductInfo();
            this.isLoading = false;
          }
      })
    },

    // Сохранить изменяемую информацию
    async saveInfoHandle() {
      if (!this.infoValidate()) return;
      this.isLoading = true;
      await this._saveProductInfo({info: this.info, productId: this.productId});
      this.isLoading = false;
    },

    // Загрузить фотку
    async imageUpload({name, buffer, position}) {
      this.isLoading = true;
      await this._imageUpload({productId: this.productId, name, buffer, position});
      await this.fetchProductInfo();
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
