<template>
  <div class="sub-edit">

    <v-btn small @click="$goBack(`/categories/${categoryCode}`)"><v-icon>mdi-arrow-left</v-icon>В категорию</v-btn>

    <div class="sub-edit__content">

      <div class="sub-edit__title">Подкатегория</div>

      <div :class="{'sub-edit__double-column': !$isMobile}">
        <v-text-field
          v-model="info.title_ru"
          label="Название на русском"
          outlined dense
        />
        <v-text-field
          v-model="info.title_kz"
          label="Название на казахском"
          outlined dense
        />
      </div>

      <v-btn color="blue" dark @click="saveInfoHandle()">Сохранить информацию</v-btn>

      <v-divider class="mt-2 mb-2"/>

      <base-image-upload v-if="subcategoryCode" :value="imageUrl" @input="imageUpload($event)"/>

      <v-divider class="mt-2 mb-2"/>

      <v-btn v-if="categoryCode" color="red" small outlined @click="deleteHandle()">Удалить подкатегорию</v-btn>

      <v-divider class="mt-4 mb-4"/>

      <div class="sub-edit__subtitle" v-if="subcategoryCode">Продукты</div>

      <div class="sub-edit__list">

      </div>

    </div>
  </div>
</template>

<script>
import BaseImageUpload from "~/components/base/BaseImageUpload";
import {mapActions, mapGetters} from "vuex";
export default {
  components: {BaseImageUpload},
  data: () => ({
    info: {},

    isLoading: true,
  }),
  computed: {
    ...mapGetters({
      _subcategoryInfo: "categories/subcategory/item/getInfo",
    }),

    // Код категории
    categoryCode() {
      return this.$route.params.code;
    },

    // Код подкатегории
    subcategoryCode() {
      return this.$route.params.subcode;
    },

    // Путь на картинку
    imageUrl() {
      return this.info?.image && (process.env.CDN_URL + this.info?.image);
    },
  },
  methods: {
    ...mapActions({
      _addSubcategoryInfo: "categories/subcategory/item/addCategoryInfo",
      _updateSubcategoryInfo: "categories/subcategory/item/updateCategoryInfo",
      _fetchSubcategoryInfo: "categories/subcategory/item/fetchSubcategory",
      _imageUpload: "categories/subcategory/item/imageUpload",
      _deleteSubcategory: "categories/subcategory/item/deleteSubcategory",
    }),

    // Запросить категорию
    async fetchSubcategoryInfo() {
      this.isLoading = true;
      await this._fetchSubcategoryInfo({categoryCode: this.categoryCode, subcategoryCode: this.subcategoryCode});
      this.info = JSON.parse(JSON.stringify(this._subcategoryInfo));
      this.isLoading = false;
    },

    // Сохранить (кнопка)
    async saveInfoHandle() {
      this.isLoading = true;
      if (this.subcategoryCode) await this.updateSubcategoryInfo();
      else await this.addSubcategoryInfo();
      this.isLoading = false;
    },

    // Добавить новую категорию
    async addSubcategoryInfo() {
      const code = await this._addSubcategoryInfo({info: this.info, categoryCode: this.categoryCode});
      if (code) {
        this.$toast.success("Категория создана");
        this.$router.replace(`/categories/categoryedit/${this.categoryCode}/subcategoryedit/${code}`);
      }
      else this.$toast.error("Ошибка при создании");
    },

    // Обновить категорию
    async updateSubcategoryInfo() {
      const isSuccess = await this._updateSubcategoryInfo({categoryCode: this.categoryCode, info: this.info});
      if (isSuccess) this.$toast.success("Категория обновленна");
      else this.$toast.error("Ошибка при обновлении");
    },

    // Загрузка картинки
    async imageUpload(file) {
      this.isLoading = true;
      const imageUrl = await this._imageUpload({categoryCode: this.categoryCode, subcategoryCode: this.subcategoryCode, image: file});
      if (imageUrl) this.info.image = imageUrl;
      else this.$toast.error("Ошибка при загрузке картинки");
      this.isLoading = false;
    },

    // Удалить (кнопка)
    deleteHandle() {
      this.$confirm({
        title: 'Вы уверены что хотите удалить подкатегорию?',
        message: 'Восстановить подкатегорию будет невозможно',
        button: {yes: 'Удалить', no: 'Отмена'},
        callback: async confirm => {
          if (!confirm) return;
          const isSuccess = await this._deleteSubcategory({categoryCode: this.categoryCode, subcategoryCode: this.subcategoryCode});
          if (isSuccess) {
            this.$toast.success("Податегория удаленна")
            this.$router.push(`/categories/categoryedit/${this.categoryCode}`);
          }
          else this.$toast.error("Ошибка при удалении")
        }
      })
    },
  },
  mounted() {
    if (this.subcategoryCode) this.fetchSubcategoryInfo();
  }
}
</script>

<style lang="scss" scoped>
.sub-edit {
  padding: 16px;

  &__title {
    margin-bottom: 20px;
    font-size: 24px;
  }

  &__double-column {
    display: grid;
    grid-column-gap: 16px;
    grid-template-columns: 1fr 1fr;
    max-width: 1000px;
  }

  &__content {
    margin-top: 32px;
  }
}
</style>
