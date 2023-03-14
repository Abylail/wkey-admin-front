<template>
  <div class="promotions">

    <v-card class="promotions__head">
      <v-card-title>
        <span>Промоакции</span>
        <v-spacer/>
        <v-btn color="primary" outlined small @click="createHandle()">Создать +</v-btn>
      </v-card-title>
    </v-card>

    <div class="promotions__list">
      <promotion-item
        v-for="promotion in promotions" :key="promotion.id"
        :info="promotion"
        @click="goPromotion(promotion)"
      />
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import PromotionItem from "@/components/common/promotions/promotionItem";

export default {
  name: "index",
  components: {PromotionItem},
  data: () => ({
    isLoading: false,
  }),
  computed: {
    ...mapGetters({
      promotions: "promotions/list/getList",
    })
  },
  methods: {
    ...mapActions({
      _fetchPromotions: "promotions/list/fetchList",
    }),

    // Запросить список промо
    async fetchPromotions() {
      this.isLoading = true;
      await this._fetchPromotions();
      this.isLoading = false;
    },

    // Перейти в промоакцию
    goPromotion({ code }) {
      this.$router.push(`/promotions/edit/${code}`);
    },

    // Создать промоакцию
    createHandle() {
      this.$router.push(`/promotions/edit`);
    }
  },
  mounted() {
    this.fetchPromotions();
  }
}
</script>

<style lang="scss" scoped>
.promotions {
  width: calc(100% - 32px);
  margin: 16px;

  &__list {
    display: flex;
    flex-wrap: wrap;
    margin-top: 16px;
  }

}
</style>
