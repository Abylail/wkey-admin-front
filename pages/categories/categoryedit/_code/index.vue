<template>
  <div class="category-edit">

    <v-btn small @click="$goBack('/categories')"><v-icon>mdi-arrow-left</v-icon>В категории</v-btn>

    <div class="category-edit__content">

      <div class="category-edit__title">Категория</div>

      <div :class="{'category-edit__double-column': !$isMobile}">
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

      <base-image-upload v-if="categoryCode" :value="imageUrl" @input="imageUpload($event)"/>

      <v-divider class="mt-2 mb-2"/>

      <v-btn v-if="categoryCode" color="red" small outlined @click="deleteHandle()">Удалить категорию</v-btn>

      <v-divider class="mt-4 mb-4"/>

      <div class="category-edit__subtitle" v-if="categoryCode">Подкатегории
        <v-btn color="blue" right small outlined @click="$router.push(`/categories/categoryedit/${categoryCode}/subcategoryedit`)">Добавить <v-icon>mdi-plus</v-icon></v-btn>
      </div>

      <div class="category-edit__list mt-4" v-if="categoryCode">
        <sub-category
          v-for="subcategory in subcategories" :key="subcategory.id"
          :info="subcategory"
          @go="$router.push(`/categories/categoryedit/${categoryCode}/subcategoryedit/${subcategory.code}`)"
        />
      </div>

    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import BaseImageUpload from "~/components/base/BaseImageUpload";
import SubCategory from "~/components/common/category/item";

export default {
  components: {SubCategory, BaseImageUpload},
  data: () => ({
    info: {},

    isLoading: true,
  }),
  computed: {
    ...mapGetters({
      _categoryInfo: "categories/item/getInfo",
    }),

    // Код категории
    categoryCode() {
      if (this.$route.params?.code === "new") return null;
      return this.$route.params?.code;
    },

    // Список подкатегорий
    subcategories() {
      return this.info?.sub_categories || [];
    },

    // Путь на картинку
    imageUrl() {
      return this.info?.image && (process.env.CDN_URL + this.info?.image);
    },
  },
  methods: {
    ...mapActions({
      _addCategoryInfo: "categories/item/addCategoryInfo",
      _updateCategoryInfo: "categories/item/updateCategoryInfo",
      _fetchCategoryInfo: "categories/item/fetchCategory",
      _imageUpload: "categories/item/imageUpload",
      _deleteCategory: "categories/item/deleteCategory",
    }),

    // Сохранить (кнопка)
    async saveInfoHandle() {
      this.isLoading = true;
      if (this.categoryCode) await this.updateCategoryInfo();
      else await this.addCategoryInfo();
      this.isLoading = false;
    },

    // Добавить новую категорию
    async addCategoryInfo() {
      const code = await this._addCategoryInfo(this.info);
      if (code) {
        this.$toast.success("Категория создана");
        this.$router.replace(`/categories/categoryedit/${code}`);
      }
      else this.$toast.error("Ошибка при создании");
    },

    // Обновить категорию
    async updateCategoryInfo() {
      const isSuccess = await this._updateCategoryInfo(this.info);
      if (isSuccess) this.$toast.success("Категория обновленна");
      else this.$toast.error("Ошибка при обновлении");
    },

    // Запросить категорию
    async fetchCategoryInfo() {
      this.isLoading = true;
      await this._fetchCategoryInfo(this.categoryCode);
      this.info = JSON.parse(JSON.stringify(this._categoryInfo));
      this.isLoading = false;
    },

    // Загрузка картинки
    async imageUpload(file) {
      this.isLoading = true;
      const imageUrl = await this._imageUpload({code: this.categoryCode, image: file});
      if (imageUrl) this.info.image = imageUrl;
      else this.$toast.error("Ошибка при загрузке картинки");
      this.isLoading = false;
    },

    // Удалить (кнопка)
    deleteHandle() {
      this.$confirm({
        title: 'Вы уверены что хотите удалить категорию?',
        message: 'Восстановить категорию будет невозможно',
        button: {yes: 'Удалить', no: 'Отмена'},
        callback: async confirm => {
          if (!confirm) return;
          const isSuccess = await this._deleteCategory(this.categoryCode);
          if (isSuccess) {
            this.$toast.success("Категория удаленна")
            this.$router.push("/categories");
          }
          else this.$toast.error("Ошибка при удалении")
        }
      })
    },

  },
  mounted() {
    if (this.categoryCode) this.fetchCategoryInfo();
  }
}
</script>

<style lang="scss" scoped>
.category-edit {
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

  &__list {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
