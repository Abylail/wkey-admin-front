<template>
  <div class="promotion-edit">
    <v-btn small @click="$goBack('/promotions')"><v-icon>mdi-arrow-left</v-icon>В промоакции</v-btn>

    <div class="promotion-edit__content">
      <div class="promotion-edit__head">
        <span v-if="promotionCode">Редактирование промоакции</span>
        <span v-else>Создание промоакции</span>
        <div>
          <v-btn color="error" outlined small>Удалить</v-btn>
          <v-btn color="primary" small @click="saveHandle()">Сохранить</v-btn>
        </div>
      </div>

      <div :class="{'promotion-edit__double-column': !$isMobile}">

        <div class="promotion-edit__block">
          <h3 class="promotion-edit__subtitle">Русский</h3>
          <v-text-field
            label="Заголовок промоакции (рус)"
            v-model="promotionInfo.title_ru"
            outlined dense
          />
          <vue-editor v-model="promotionInfo.description_ru"/>
        </div>

        <div class="promotion-edit__block">
          <h3 class="promotion-edit__subtitle">Казахский</h3>
          <v-text-field
            label="Заголовок промоакции (каз)"
            v-model="promotionInfo.title_kz"
            outlined dense
          />
          <vue-editor v-model="promotionInfo.description_kz"/>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import { VueEditor } from "vue2-editor";

export default {
  name: "index",
  components: {VueEditor},
  data: () => ({
    // Информация по акции
    promotionInfo: {},

    isLoading: false,
  }),
  computed: {
    ...mapGetters({
      _promotionInfo: "promotions/single/getInfo",
    }),
    // Код промоакции
    promotionCode() {
      return this.$route.params.code;
    }
  },
  methods: {
    ...mapActions({
      _fetchPromotion: "promotions/single/fetchInfo",
      _updatePromotion: "promotions/single/updateInfo",
      _createPromotion: "promotions/single/createInfo",
    }),

    // Валидация
    validate() {
      return true;
    },

    // Запросить промоакцию
    async fetchPromotion() {
      this.isLoading = true;
      await this._fetchPromotion(this.promotionCode);
      this.promotionInfo = JSON.parse(JSON.stringify(this._promotionInfo));
      this.isLoading = false;
    },

    // Сохранить (кнопка)
    async saveHandle() {
      if (!this.validate()) return
      this.isLoading = true;
      if (this.promotionCode) await this._updatePromotion(this.promotionInfo);
      else await this._createPromotion(this.promotionInfo);
      await this.fetchPromotion();
      this.isLoading = false;
    }
  },
  mounted() {
    if (this.promotionCode) this.fetchPromotion();
  }
}
</script>

<style lang="scss" scoped>
.promotion-edit {
  padding: 16px;

  &__head {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 20px;
    font-size: 24px;
  }

  &__subtitle {
    margin: 10px 0;
  }

  &__content {
    margin-top: 32px;
  }

  &__double-column {
    display: grid;
    grid-column-gap: 16px;
    grid-template-columns: 1fr 1fr;
    max-width: 1000px;
  }

  ::v-deep {
    // Убираю ненужные функции
    .ql-image, .ql-video, .ql-clean {display: none}
  }
}
</style>
