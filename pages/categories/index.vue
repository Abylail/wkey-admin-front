<template>
  <div class="categories">

    <!-- Поиск -->
    <v-card class="categories__card">
      <v-card-text>
        <v-text-field label="Поиск по названию" v-model="searchText" outlined dense hide-details clearable/>
        <v-btn class="categories__add-button" color="blue" right small outlined @click="$router.push('/categories/categoryedit/new')">Добавить <v-icon>mdi-plus</v-icon></v-btn>
      </v-card-text>
    </v-card>

    <!-- Список категорий (результат) -->
    <div class="categories__result-list categories__card">
       <category-item
         v-for="category in categoryList" :key="category.id"
         :info="category"
         @go="$router.push(`/categories/categoryedit/${category.code}`)"
       />
    </div>

    </div>
</template>

<script>
import CategoryItem from "~/components/common/category/item";
import {mapActions, mapGetters} from "vuex";
export default {
  name: "index",
  components: {CategoryItem},
  data: () => ({
    searchText: null,

    isLoading: true,
  }),
  computed: {
    ...mapGetters({
      _categoryList: "categories/getList",
    }),

    // Список категорий (фильтрованный поиском)
    categoryList() {
      if (!this.searchText) return this._categoryList;
      return this._categoryList.filter(category => category.title_ru.toLowerCase().includes(this.searchText.toLowerCase()));
    }
  },
  methods: {
    ...mapActions({
      _fetchCategories: "categories/fetchCategories",
    }),

    // Запросить список категорий
    async fetchCategories() {
      this.isLoading = true;
      await this._fetchCategories();
      this.isLoading = false;
    },
  },
  mounted() {
    this.fetchCategories();
  }
}
</script>

<style lang="scss" scoped>
.categories {

  &__card {
    width: calc(100% - 32px);
    margin: 16px;
  }

  &__add-button {
    margin-top: 8px;
  }

  &__result-list {
    display: flex;
    flex-wrap: wrap;
  }

}
</style>
