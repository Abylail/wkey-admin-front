<template>
  <div class="select-category">
    <v-btn color="blue" outlined small @click="showSelect = true">Добавить категорию</v-btn>

    <v-dialog v-model="showSelect" width="800">

      <!-- Выбор категории -->
      <v-card v-if="!selectedCategory">
        <v-card-title class="">Выбор категории</v-card-title>
        <v-card-text>
          <v-text-field label="Поиск категории" v-model="searchCategoryText" outlined dense/>
          <div class="select-category__list">
            <item
              v-for="category in categoryList" :key="category.id"
              :info="category"
              @click="selectCategoryHandle(category)"
            />
          </div>
        </v-card-text>
      </v-card>

      <!-- Выбор подкатегории -->
      <v-card v-else>
        <v-card-title class="">Выбор подкатегории ({{ selectedCategory.title_ru }})</v-card-title>
        <v-card-text>
          <v-text-field label="Поиск подкатегории" v-model="searchSubcategoryText" outlined dense/>
          <div class="select-category__list">
            <item
              v-for="subcategory in subcategoryList" :key="subcategory.id"
              :info="subcategory"
              @click="selectSubcategoryHandle(subcategory)"
            />
          </div>

          <div>
            <v-btn class="mb-2 mr-2" outlined small @click="backHandle()">Назад к категориям</v-btn>
            <v-btn class="mb-2" v-if="selectedSubcategory" color="blue" small dark @click="selectHandle()">Сохранить в "{{ selectedSubcategory.title_ru }}"</v-btn>
          </div>
        </v-card-text>
      </v-card>

    </v-dialog>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import Item from "~/components/common/category/item";

export default {
  name: "selectCategory",
  components: {Item},
  data: () => ({
    showSelect: false,

    // Поисковый текст
    searchCategoryText: "",

    // Выбранная категория
    selectedCategory: null,

    // Поисковый текст
    searchSubcategoryText: "",

    // Выбранная категория
    selectedSubcategory: null,
  }),
  computed: {
    ...mapGetters({
      _categoryList: "categories/getList",
      _categoryInfo: "categories/item/getInfo",
    }),

    // Список категорий (фильтрованный поиском)
    categoryList() {
      if (!this.searchText) return this._categoryList;
      return this._categoryList.filter(category => category.title_ru.toLowerCase().includes(this.searchCategoryText.toLowerCase()));
    },

    // Список подкатегорий
    subcategoryList() {
      return (this._categoryInfo.sub_categories || []).filter(subcategory => subcategory.title_ru?.toLowerCase().includes(this.searchSubcategoryText.toLowerCase()));
    }
  },
  watch: {
    showSelect(open) {
      if (open) this.onOpen()
    }
  },
  methods: {
    ...mapActions({
      _fetchCategories: "categories/fetchCategories",
      _fetchCategoryInfo: "categories/item/fetchCategory",
    }),

    // На откртии
    onOpen() {
      this.selectedCategory = null;
      if (!this._categoryList.length) this._fetchCategories();
    },

    // Выбранная категория
    selectCategoryHandle(category) {
      this.selectedCategory = category;
      this._fetchCategoryInfo(category.code);
    },

    // Выбрать подкатегорию
    selectSubcategoryHandle(subcategory) {
      this.selectedSubcategory = subcategory;
    },

    // Назад (кнопка)
    backHandle() {
      this.selectedCategory = null;
      this.selectedSubcategory = null;
    },

    // Выбрать (кнопка)
    selectHandle() {
      this.$emit("select", {categoryCode: this.selectedCategory.code, subcategoryCode: this.selectedSubcategory.code});
      this.showSelect = false;
    }
  }
}
</script>

<style lang="scss" scoped>
.select-category {

  &__list {
    display: flex;
    flex-wrap: wrap;
    max-height: 50vh;
  }

}
</style>
