<template>
  <div class="promotion-edit" :class="{'loading-mode': isLoading}">
    <v-btn small @click="$goBack('/promotions')"><v-icon>mdi-arrow-left</v-icon>В промоакции</v-btn>

    <div class="promotion-edit__content">
      <div class="promotion-edit__head">
        <span v-if="promotionCode">Редактирование промоакции</span>
        <span v-else>Создание промоакции</span>
        <div>
          <v-btn v-if="promotionCode" color="error" outlined small @click="deleteHandle()">Удалить</v-btn>
          <v-btn color="primary" small @click="saveHandle()">Сохранить</v-btn>
        </div>
      </div>

      <div :class="{'promotion-edit__double-column': !$isMobile}">

        <!-- Русский -->
        <div class="promotion-edit__block">
          <h3 class="promotion-edit__subtitle">Русский</h3>
          <v-text-field
            label="Заголовок промоакции (рус)"
            v-model="promotionInfo.title_ru"
            outlined dense
          />
          <vue-editor v-model="promotionInfo.description_ru"/>
          <image-upload
            label="Картинка (рус)"
            :url="promotionInfo.image_ru"
            @upload="uploadImage({lang: 'ru', image: $event})"
          />
        </div>

        <!-- Казахский -->
        <div class="promotion-edit__block">
          <h3 class="promotion-edit__subtitle">Казахский</h3>
          <v-text-field
            label="Заголовок промоакции (каз)"
            v-model="promotionInfo.title_kz"
            outlined dense
          />
          <vue-editor v-model="promotionInfo.description_kz"/>
          <image-upload
            label="Картинка (каз)"
            :url="promotionInfo.image_kz"
            @upload="uploadImage({lang: 'kz', image: $event})"
          />
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import { VueEditor } from "vue2-editor";
import ImageUpload from "@/components/common/promotions/imageUpload";

export default {
  name: "index",
  components: {ImageUpload, VueEditor},
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
      _uploadImage: "promotions/single/upload",
      _createPromotion: "promotions/single/createInfo",
      _deletePromotion: "promotions/single/delete",
    }),

    // Валидация
    validate() {
      if (!this.promotionInfo.title_ru) {
        this.$toast.error("Введите заголовок на русском");
        return false;
      }

      if (!this.promotionInfo.title_kz) {
        this.$toast.error("Введите заголовок на казахском");
        return false;
      }

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

      if (this.promotionCode) {
        await this._updatePromotion(this.promotionInfo);
        await this.fetchPromotion();
      }
      else {
        const code = await this._createPromotion(this.promotionInfo);
        if (code) this.$router.replace(`/promotions/edit/${code}`);
      }

      this.isLoading = false;
    },

    // Удалить (кнопка)
    async deleteHandle() {
      this.$confirm({
        title: 'Вы уверены что хотите удалить промоакцию?',
        message: 'Восстановить промоакцию будет невозможно',
        button: {yes: 'Удалить', no: 'Отмена'},
        callback: async confirm => {
          if (!confirm) return;
          this.isLoading = true;
          const isSuccess = await this._deletePromotion(this.promotionCode);
          if (isSuccess) {
            this.$toast.success("Промоакция удалена");
            this.$router.push("/promotions");
          }
          this.isLoading = false;
        }
      })
    },

    // Залить фото
    async uploadImage({lang, image}) {
      this.isLoading = true;
      await this._uploadImage({code: this.promotionCode, lang, image});
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
    max-width: 1000px;
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
